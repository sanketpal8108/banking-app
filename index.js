const Bank = require("./Bank");
const Customer = require("./Customer");

let a1 = Customer.newAdmin('sanket','pal')
let u1 = a1.newCustomer('shreyash','C')
let u2 = a1.newCustomer('Rahul','K')
console.log(a1.getAllCustomer());
let b1 = a1.createBank('Bank Of India')
let b2 = a1.createBank('State Bank Of India')
console.log(a1.getAllBank());
let acc1 = u1.createAccount(0)
let acc2 = u1.createAccount(0)
let acc3 = u1.createAccount(1)
let acc4 = u2.createAccount(0)
let acc5 = u2.createAccount(1)
console.log(acc1,acc2,acc3);
console.log(u1.getAllAccounts());
console.log(u2.getAllAccounts());
console.log(u1.getTotalBalance());
console.log(u2.getTotalBalance());
u1.depositMoney(2,1000)
console.log(u1.getTotalBalance());
u1.transferMoney(2,2,4,100)
console.log("--------------------------------");
console.log(u2.getPassbook(4));
u2.withdrawMoney(4,100)
console.log(u1.getTotalBalance());
console.log(u2.getTotalBalance());
console.log(u1.getPassbook(2));
console.log(u1.getAllAccounts());
u1.selfTransferMoney(2,0,500)
console.log(u1.getPassbook(2));
console.log("--------------------------------");
console.log(u1.getPassbook(0));
console.log(b1.getAllAccounts());
                