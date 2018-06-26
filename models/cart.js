module.exports = function Cart (oldCart) {
  this.items = oldCart.items || []
  this.totalQty = oldCart.totalQty || 0
  this.totalPrice = oldCart.totalPrice || 0

  this.add = function (item, id) {
    var storedItem
    for (let i = 0; i < this.items.length; i++) {
      if (this.items[i].id === id) {
        storedItem = this.items[i]
        break
      }
    }
    if (!storedItem) {
      storedItem = {id: id, item: item, qty: 0, price: 0}
      this.items.push(storedItem)
    }
    storedItem.qty++
    storedItem.price = storedItem.item.currentPrice * storedItem.qty
    this.totalQty++
    this.totalPrice += storedItem.item.currentPrice
  }

  this.generateArray = function () {
    var arr = []
    for (let index = 0; index < this.items.length; index++) {
      arr.push(this.items[index])
    }

    return arr
  }
}
