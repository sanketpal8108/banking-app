//const { minimumBalance } = require("./Customer")
const Transactions = require("./Transactions")

class Accounts{
    static id =0 
    static minimumBalance =1000
    constructor(bank){
        this.id = Accounts.id++
        this.balance = Accounts.minimumBalance
        this.bank = bank
        this.passbook = []
    }
    static newAccount(bankID){
        if(typeof bankID != 'number'){
            throw new Error('Invalid bank Id')
        }
        return new Accounts(bankID)
        
    }
    withdrawMoney(amount){
        if((this.balance - amount) < Accounts.minimumBalance){
            throw new Error('Insufficient Balance For Withdrawl')
        }
        this.balance -= amount
        let newTransaction = Transactions.newTransaction(new Date().toJSON(),this.id,-1,'Debit',amount,this.balance)
        this.passbook.push(newTransaction)
    }
    depositMoney(amount,senderID){
        this.balance += amount
        let newTransaction = Transactions.newTransaction(new Date().toJSON(),this.id,senderID,'Credit',amount,this.balance)
        this.passbook.push(newTransaction)
    }
    
    getPassbook(){
        return this.passbook
    }

}

module.exports = Accounts