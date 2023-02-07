import { menuData } from "./data.js"

const orderForm = document.getElementById("order-form")
let orderData = []
let orderHtml = ""


//event listeners

document.addEventListener("click", function(e) {
  if (e.target.dataset.add) {
    handleAddClick(e.target.dataset.add)
  }
  else if (e.target.id === "order-btn") {
    handleOrderClick()
  }
  else if (e.target.id === "clear-btn") {
    clearOrder()
  }
})

orderForm.addEventListener("submit", function(e) {
  e.preventDefault()
  handlePayClick()
})

//functions

//pushes selected food to order array
function handleAddClick(foodId) {
  orderData.push(menuData[foodId])
  renderOrderSummary()
}

//shows credit card info modal
function handleOrderClick() {
  document.getElementById("pay-modal").classList.toggle("hidden")
}

//stores form data, clears form inputs, renders thank you message
function handlePayClick() {
  document.getElementById("pay-modal").classList.toggle("hidden")
  document.getElementsByClassName("form-input").value = ""
  const orderFormData = new FormData(orderForm)

  orderHtml = `
  <p>Thanks, ${orderFormData.get("name")}! We're preparing your order now.</p>
  <button id="clear-btn" class="order-btn">Place another order</button>
  `
  document.getElementById("order").innerHTML = orderHtml
}

//render ordered foods
function renderOrderSummary() {
  let totalPrice = 0
  orderHtml = `
  <p class="order-header">Your order</p>
  `

  orderData.forEach(function(orderItem) {
    orderHtml += `
    <div class="order-item">
      <p class="order-item-name">${orderItem.name}</p>
      <p class="order-item-price">$${orderItem.price}</p>
    </div>
    `
    totalPrice += orderItem.price
  })
  orderHtml += `
  <div class="order-total">
    <p>Total:</p>
    <p class="order-total-price">$${totalPrice}</p>
  </div>
  <button id="order-btn" class="order-btn">Place order</button>
  `
  document.getElementById("order").innerHTML = orderHtml
}

//render menu items
function render() {
  let menuHtml = ""

  menuData.forEach(function(menuItem) {
    menuHtml += `
    <div class="menu-item">
      <div class="menu-item-info">
        <p class="menu-item-emoji">${menuItem.emoji}</p>
      </div>
      <div class="menu-item-details">
        <p class="menu-item-name">${menuItem.name}</p>
        <p class="menu-item-ingredients">${menuItem.ingredients.join(", ")}</p>
        <p class="menu-item-price">$${menuItem.price}</p>
      </div>
      <div class="menu-item-actions">
        <button id="menu-item-add" class="menu-item-add" data-add="${menuItem.id}">+</button>
      </div>
    </div>
    `
  })
  document.getElementById("menu").innerHTML = menuHtml
}

//clear order and begin another
function clearOrder() {
  orderHtml = ""
  orderData = []
  document.getElementById("order").innerHTML = orderHtml
}

render()