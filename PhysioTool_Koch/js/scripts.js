// Pop-Up Details-Button
const openModalButtons = document.querySelectorAll('[data-modal-target]')
const closeModalButtons = document.querySelectorAll('[data-close-button]')
const overlay = document.getElementById('overlay')

openModalButtons.forEach(button => {
  button.addEventListener('click', () => {
    const modal = document.querySelector(button.dataset.modalTarget)
    openModal(modal)
  })
})

overlay.addEventListener('click', () => {
  const modals = document.querySelectorAll('.modal.active')
  modals.forEach(modal => {
    closeModal(modal)
  })
})

closeModalButtons.forEach(button => {
  button.addEventListener('click', () => {
    const modal = button.closest('.modal')
    closeModal(modal)
  })
})

function openModal(modal) {
  if (modal == null) return
  modal.classList.add('active')
  overlay.classList.add('active')
}

function closeModal(modal) {
  if (modal == null) return
  modal.classList.remove('active')
  overlay.classList.remove('active')
}


// Checkout

if (document.readyState =='loading') {
  document.addEventListener('DOMContentLoaded', ready)
} else {
  ready()
}

function ready() {
  const addToCartButtons = document.getElementsByClassName('shop-item-button')
  for (let i = 0; i < addToCartButtons.length; i ++) {
      const button = addToCartButtons[i]
      button.addEventListener('click', addToCartClicked)
  }


  const removeCartItemButtons = document.getElementsByClassName('btn-danger')
  for (let i = 0; i < removeCartItemButtons.length; i ++) {
      const button = removeCartItemButtons[i]
      button.addEventListener('click', removeCartItem)
  }

  
  document.getElementsByClassName('btn-purchase')[0].addEventListener('click', purchaseClicked)
}

function purchaseClicked() {
  alert('Der Plan wurde zusammengestellt.')
  const cartItems = document.getElementsByClassName('cart-items')[0]
  while (cartItems.hasChildNodes()) {
      cartItems.removeChild(cartItems.firstChild)
  }
  
}

function removeCartItem(event) {
  const buttonClicked = event.target
  buttonClicked.parentElement.parentElement.remove()
  
}


function addToCartClicked(event) {
  const button = event.target
  const shopItem = button.parentElement.parentElement
  const title = shopItem.getElementsByClassName('shop-item-title')[0].innerText
  const imageSrc = shopItem.getElementsByClassName('shop-item-image')[0].src
  let series = document.querySelector("#series").value;
  let repetition = document.querySelector("#repetition").value;
  let dauer = document.querySelector("#dauer").value;
  let comment = document.querySelector("#comment").value;
  addItemToCart(title, imageSrc, series, repetition, dauer, comment)
  
}

function addItemToCart(title, imageSrc, series, repetition, dauer, comment) {
  const cartRow = document.createElement('div')
  cartRow.classList.add('cart-row')
  const cartItems = document.getElementsByClassName('cart-items')[0]
  const cartItemNames = cartItems.getElementsByClassName('cart-item-title')
  for (let i = 0; i < cartItemNames.length; i++) {
      if (cartItemNames[i].innerText == title) {
      alert('Die Übung wurde bereits hinzugefügt.')
      return
      }
  } 
  const cartRowContents = `
      <div class="cart-item cart-column">
          <img class="cart-item-image" src="${imageSrc}" width="100" height="100">
          <span class="cart-item-title"> ${title} </span>
      </div>
                  
      <div class="cart-quantity cart-column">
            <input type="number" id="series" placeholder ="Serie" min="0">
            <input type="number" id="repetition" placeholder ="Wdh." min="0">
            <input type="number" id="dauer" placeholder ="Dauer" min="0">
            <input type="text" id="comment" placeholder ="Kommentar...">
            <button class="btn btn-danger" type="button">ENTFERNEN</button>
          </div>`
  cartRow.innerHTML = cartRowContents
  cartItems.append(cartRow)
  cartRow.getElementsByClassName('btn-danger')[0].addEventListener('click', removeCartItem)
}

