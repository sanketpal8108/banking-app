class Transactions{
    constructor(date, selfID,senderID,type,amount ,currentBalance ){
        this.date = date
        this.selfID = selfID
        this.senderID = senderID
        this.type = type
        this.amount = amount
        this.currentBalance = currentBalance
    }
    static newTransaction(date, selfID,senderID,type,amount ,currentBalance){
        try {
            if(type != 'Credit' && type != 'Debit'){
                throw new Error('Invalid transaction type')
            }
            return new Transactions(date,selfID,senderID,type,amount,currentBalance)
        } catch (error) {
            console.log(error.message);
        }
    }
}

module.exports = Transactions