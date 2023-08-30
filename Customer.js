const Accounts = require("./Accounts")
const Bank = require("./Bank")

class Customer{
    static customerID = 0
    static allCustomer =[]
    
    // static minimumBalance =1000
    constructor(firstName,lastName ,isadmin){
        this.id = Customer.customerID++
        this.firstName  = firstName
        this.lastName = lastName
        this.isadmin = isadmin
        this.totalBalance 
        this.accounts= []
        //this.accounts = new Accounts()
        // this.balance = balance
    }
    static newAdmin(firstName,lastName){
        try {
            if(typeof firstName != 'string'){
                throw new Error ('Invalid FirstName')
            }
            if(typeof lastName != 'string'){
                throw new Error ('Invalid LastName')
            }
            
            return new Customer(firstName,lastName,true)

        } catch (error) {
            console.log(error.message);
        }
    }
    //CRUD on Customer
    newCustomer(firstName,lastName){
        try {
            if(typeof firstName != 'string'){
                throw new Error ('Invalid FirstName')
            }
            if(typeof lastName != 'string'){
                throw new Error ('Invalid LastName')
            }
            if(!this.isadmin){
                throw new Error('Not an Admin')
            }
            
            let newcustomer = new Customer(firstName,lastName,false)
            Customer.allCustomer.push(newcustomer)
            return newcustomer
        } catch (error) {
            console.log(error.message);
        }
    }
    getAllCustomer(){
        try {
            if(!this.isadmin){
                throw new Error('Not an Admin')
            }
            return Customer.allCustomer
        } catch (error) {
            console.log(error.message);
        }
    }
    static #findCustomer(customerID){
        for (let index = 0; index < Customer.allCustomer.length; index++) {
            if(Customer.allCustomer[index].id == customerID){
                return[Customer.allCustomer[index] , index]
            }
            
        }
        return [null,-1]
    }
    #updateFirstName(newValue){
        if(typeof newValue != 'string'){
            throw new Error ('Invalid Value')
        }
        this.firstName=newValue
    }
    #updateLastName(newValue){
        if(typeof newValue != 'string'){
            throw new Error ('Invalid Value')
        }
        this.lastName=newValue
    }
    updateCustomer(customerID,parameter,newValue){
        try {
            if(!this.isadmin){
                throw new Error('Not an Admin')
            }
            let[customer,indexOfCustomer] = Customer.#findCustomer(customerID)
            if(customer==null){
                throw new Error('Customer Not Found')
            }
            switch(parameter){
                case 'firstName' :
                    customer.#updateFirstName(newValue)
                    break
                case 'lastName' :
                    customer.#updateLastName(newValue)
                    break
                default:
                    throw new Error('Invalid Parameter')
            }
        } catch (error) {
            console.log(error.message);
        }
    }
    deleteCustomer(customerID){
        try {
            if(!this.isadmin){
                throw new Error('Not an Admin')
            }
            let[customer,indexOfCustomer] = Customer.#findCustomer(customerID)
            if(customer==null){
                throw new Error('Customer Not Found')
            }
            Customer.allCustomer.splice(indexOfCustomer,1)
        } catch (error) {
            console.log(error.message);
        }
    }

    //CRUD on Banks
    createBank(name){
        try {
            if(!this.isadmin){
                throw new Error('Not an Admin')
            }
            let newBank = Bank.newBank(name)
            return newBank
        } catch (error) {
            console.log(error.message);
        }
    }
    getAllBank(){
        try {
            if(!this.isadmin){
                throw new Error('Not an Admin')
            }
            return Bank.getAllBank()
        } catch (error) {
            console.log(error.message);
        }
    }
    updateBank(bankID,parameter, newValue){
        try {
            if(!this.isadmin){
                throw new Error('Not an Admin')
            }
            Bank.updateBank(bankID,parameter,newValue)
        } catch (error) {
            console.log(error.message);
        }
    }
    deleteBank(bankID){
        try {
            if(!this.isadmin){
                throw new Error('Not an Admin')
            }
            Bank.deleteBank(bankID)
        } catch (error) {
            console.log(error.message);
        }
    }

    //Operations on Account
    createAccount(bankID){
        try {
            if(this.isadmin){
                throw new Error('Admin Cannot create Account')
            }
            let newAccount = Accounts.newAccount(bankID)
            this.accounts.push(newAccount)
            Bank.updateAllAccounts(bankID,newAccount)
            this.#updateTotalBalance()
            return newAccount

        } catch (error) {
            console.log(error.message);
        }
    }
    getAllAccounts(){
        try {
            if(this.isadmin){
                throw new Error('Admin Cannot Access')
            }
            return this.accounts
        } catch (error) {
            console.log(error.message);
        }
    }
    getTotalBalance(){
        try {
            if(this.isadmin){
                throw new Error('Admin Cannot Access Total Balance')
            }
            return this.totalBalance
        } catch (error) {
            console.log(error.message);
        }
    }
    #findAccount(accountID){
        if(typeof accountID != 'number'){
            throw new Error('Invalid Account Id')
        }
        for (let index = 0; index < this.accounts.length; index++) {
            if(this.accounts[index].id == accountID){
                return [this.accounts[index],index]
            }
            
        }
        return [null,-1]
    }
    #updateTotalBalance(){
        // let[foundAccount, indexOfFoundAccount] = this.#findAccount(id)
        this.totalBalance = 0
        for (let index = 0; index < this.accounts.length; index++) {
            this.totalBalance += this.accounts[index].balance
            
            
        }
    }
    transferMoney(fromAccountID,toCustomerID,customerAccountID,amount){
        try {
            if(this.isadmin){
                throw new Error('Admin Cannot transfer Money')
            }
            let [foundSenderAccount ,indexOfSenderAccount] = this.#findAccount(fromAccountID)
            if(foundSenderAccount == null){
                throw new Error('Sender Account Not Found')
            }

            let[receiverCustomer,indexOfCustomer] = Customer.#findCustomer(toCustomerID)
            if(receiverCustomer==null){
                throw new Error('Customer Not Found')
            }

            let [foundReceiverAccount ,indexOfReceiverAccount] = receiverCustomer.#findAccount(customerAccountID)
            if(foundReceiverAccount == null){
                throw new Error('Receiver Account Not Found')
            }
            foundSenderAccount.withdrawMoney(amount)
            foundReceiverAccount.depositMoney(amount)
            this.#updateTotalBalance()
            receiverCustomer.#updateTotalBalance()
        } catch (error) {
            console.log(error.message);
        }
    }
    selfTransferMoney(fromAccountID,toAccountID,amount){
        try {
            if(this.isadmin){
                throw new Error('Admin Cannot transfer Money')
            }
            let [foundSenderAccount ,indexOfSenderAccount] = this.#findAccount(fromAccountID)
            if(foundSenderAccount == null){
                throw new Error('Sender Account Not Found')
            }
            let [foundReceiverAccount ,indexOfReceiverAccount] = this.#findAccount(toAccountID)
            if(foundReceiverAccount == null){
                throw new Error('Receiver Account Not Found')
            }
            foundSenderAccount.withdrawMoney(amount)
            foundReceiverAccount.depositMoney(amount)
            this.#updateTotalBalance()

        } catch (error) {
            
        }
    }
    depositMoney(toAccountID,amount){
        try {
            if(this.isadmin){
                throw new Error('Admin Cannot transfer Money')
            }
            let [foundAccount,indexOfFoundAccount] = this.#findAccount(toAccountID)
            if(foundAccount == null){
                throw new Error('Account Not Found')
            }
            foundAccount.depositMoney(amount)
            this.#updateTotalBalance()
        } catch (error) {
            console.log(error.message);
        }
    }
    withdrawMoney(toAccountID,amount){
        try {
            if(this.isadmin){
                throw new Error('Admin Cannot transfer Money')
            }
            let [foundAccount,indexOfFoundAccount] = this.#findAccount(toAccountID)
            if(foundAccount == null){
                throw new Error('Account Not Found')
            }
            foundAccount.withdrawMoney(amount)
            this.#updateTotalBalance()
        } catch (error) {
            console.log(error.message);
        }
    }
    getPassbook(accountID){
        try {
            if(this.isadmin){
                throw new Error('Admin Cannot See Passbook')
            }
            let [foundAccount,indexOfFoundAccount] = this.#findAccount(accountID)
            if(foundAccount == null){
                throw new Error('Account Not Found')
            }
            return foundAccount.getPassbook()
        } catch (error) {
            console.log(error.message);
        }
    }
    


}
module.exports = Customer