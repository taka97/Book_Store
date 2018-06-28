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
      storedItem = { id: id, item: item, qty: 0, price: 0 }
      this.items.push(storedItem)
    }

    if (storedItem.qty >= storedItem.item.one.currentTotalQuantity) {
      return
    }
    storedItem.qty++
    storedItem.price = storedItem.item.one.currentPrice * storedItem.qty
    this.totalQty++
    this.totalPrice += storedItem.item.one.currentPrice
  }

  this.sub = function (item, id) {
    var storedItem
    for (let i = 0; i < this.items.length; i++) {
      if (this.items[i].id === id) {
        storedItem = this.items[i]
        break
      }
    }
    if (!storedItem) {
      return
    }
    storedItem.qty--
    storedItem.price = storedItem.item.one.currentPrice * storedItem.qty
    this.totalQty--
    this.totalPrice -= storedItem.item.one.currentPrice
  }

  this.remove = function (item, id) {
    var storedItem, index
    for (let i = 0; i < this.items.length; i++) {
      if (this.items[i].id === id) {
        storedItem = this.items[i]
        index = i
        break
      }
    }
    if (!storedItem) {
      return
    }
    this.totalQty -= storedItem.qty
    this.totalPrice -= storedItem.price
    this.items.splice(index, 1)
  }

  this.update = function (item, id, quantity) {
    var storedItem
    for (let i = 0; i < this.items.length; i++) {
      if (this.items[i].id === id) {
        storedItem = this.items[i]
        break
      }
    }
    if (!storedItem) {
      storedItem = { id: id, item: item, qty: 0, price: 0 }
      this.items.push(storedItem)
    }

    if (quantity >= storedItem.item.one.currentTotalQuantity) {
      quantity = storedItem.item.one.currentTotalQuantity
    }
    let diff = quantity - storedItem.qty
    storedItem.qty = quantity
    storedItem.price = storedItem.item.one.currentPrice * storedItem.qty
    this.totalQty += diff
    this.totalPrice += storedItem.item.one.currentPrice * diff
  }

  this.generateArray = function () {
    var arr = []
    for (let index = 0; index < this.items.length; index++) {
      arr.push(this.items[index])
    }

    return arr
  }
}
