class Account {
  private amount: number
  private commision: number

  constructor(amount: number, commision: number) {
    this.amount = amount
    this.commision = commision
  }

  set setAmount(amount: number) {
    if (amount < 0) amount = 0
    this.amount = amount
  }

  get total() {
    return this.amount + this.commision
  }
}

const account = new Account(100, 10)
account.setAmount = -200
console.log(account.total) // 210