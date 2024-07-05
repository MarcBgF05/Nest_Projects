class Sale {
  protected amount: number

  constructor(amount: number) {
    this.amount = amount
  }

  getTotal(): number {
    return this.amount
  }
}

class SaleWithTaxes extends Sale {
  private tax: number
  constructor(tax: number, amount: number) {
    super(amount)

    this.tax = tax
  }

  override getTotal(): number {
    return this.tax + super.getTotal()
  }
}

let sale: Sale = new Sale(19)
console.log(sale.getTotal()) // 100

let saleWithTax = new SaleWithTaxes(10, 191)
const res2 = saleWithTax.getTotal()
console.log(res2) // 29
