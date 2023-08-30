class Bank{
    static id = 0
    static allBank = []
    constructor(name,abbrevieation){
        this.id=Bank.id ++
        this.name = name
        this.abbrevieation = abbrevieation
        this.accounts= []
    }
    static newBank(name){
        try {
            if(typeof name != 'string'){
                throw new Error('Invalid Bank Name')
            }
            
            
            let tempName 
            tempName = name.split(' ').map(word => word.charAt(0)).join('')
            let bank =new Bank(name,tempName)
            Bank.allBank.push(bank)
            return bank
        } catch (error) {
            console.log(error.message);
        }
    }
    static getAllBank(){
        
        return Bank.allBank
    }
    static #findBank(bankID){
        for (let index = 0; index < Bank.allBank.length; index++) {
            if(Bank.allBank[index].id == bankID){
                return [Bank.allBank[index], index]
            }
            
        }
        return[null,-1]
    }
    #updateBankName(newValue){
        if(typeof newValue != 'string'){
            throw new Error('Invalid New Value')
        }
        this.name = newValue
        this.abbrevieation = newValue.split(' ').map(word => word.charAt(0)).join('')
    }
    static updateBank(bankID,parameter,newValue){
        if(typeof bankID != 'number'){
            throw new Error('Invalid ID')
        }
        let [foundBank , indexOfFoundBank] = Bank.#findBank(bankID)
        if(foundBank == null){
            throw new Error('Bank Not Found')
        }
        switch(parameter){
            case 'name':
                foundBank.#updateBankName(newValue)
                break
            default:
                throw new Error('Invalid Parameter')
        }
    }
    static deleteBank(bankID){
        if(typeof bankID != 'number'){
            throw new Error('Invalid ID')
        }
        let [foundBank , indexOfFoundBank] = Bank.#findBank(bankID)
        if(foundBank == null){
            throw new Error('Bank Not Found')
        }
        Bank.allBank.splice(indexOfFoundBank,1)
    }
    static updateAllAccounts(bankID,newAccount){
        if(typeof bankID != 'number'){
            throw new Error('Invalid ID')
        }
        let [foundBank , indexOfFoundBank] = Bank.#findBank(bankID)
        if(foundBank == null){
            throw new Error('Bank Not Found')
        }
        foundBank.accounts.push(newAccount)
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
}

module.exports = Bank 