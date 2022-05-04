if (document.readyState =='loading') {
    document.addEventListener('DOMContentLoaded', ready)
} else {
    ready()
}

function ready() {
    var removeCartItemButtons = document.getElementsByClassName('btn-danger')
    for (var i = 0; i < removeCartItemButtons.length; i ++) {
        var button = removeCartItemButtons[i]
        button.addEventListener('click', removeCartItem)
    }

    var quantityInputs = document.getElementsByClassName('cart-quantity-input')
    for (var i = 0; i < quantityInputs.length; i++) {
        var input = quantityInputs[i]
        input.addEventListener('chance', quantityChanged)
    }

    var addToCartButtons = document.getElementsByClassName('shop-item-button')
    for (var i = 0; i < addToCartButtons.length; i ++) {
        var button = addToCartButtons[i]
        button.addEventListener('click', addToCartClicked)
    }

    document.getElementsByClassName('btn-purchase')[0].addEventListener('click', purchaseClicked)

}

function purchaseClicked() {
    alert('Der Plan wurde zusammengestellt.')
    var cartItems = document.getElementsByClassName('cart-items')[0]
    while (cartItems.hasChildNodes()) {
        cartItems.remoceChild(cartItems.firstChild)
    }
    updateCartTotal()
}

function removeCartItem(event) {
    var buttonClicked = event.target
    buttonClicked.parentElement.parentElement.remove()
    updateCartTotal()
}

function quantityChanged(event) {
    var input = event.target
    if (isNaN(input.value) || input.value <= 0) {
        input.value = 1
    }
    updateCartTotal()
}

function addToCartClicked(event) {
    var button = event.target
    var shopItem = button.parentElement.parentElement
    var title = shopItem.getElementsByClassName('shop-item-title')[0].innerText
    var imageSrc = shopItem.getElementsByClassName('shop-item-image')[0].src
    addItemToCart(title, imageSrc)
    updateCartTotal()
}

function addItemToCart(title, imageSrc) {
    var cartRow = document.createElement('div')
    cartRow.classList.add('cart-row')
    var cartItems = document.getElementsByClassName('cart-items')[0]
    var cartItemNames = cartItems.getElementsByClassName('cart-item-title')
    for (var i = 0; i < cartItemNames.length; i++) {
        if (cartItemNames[i].innerText == title) {
        alert('Die Übung wurde bereits hinzugefügt.')
        return
        }
    } 
    var cartRowContents = `
        <div class="cart-item cart-column">
            <img class="cart-item-image" src="${imageSrc}" width="100" height="100">
            <span class="cart-item-title"> ${title} </span>
        </div>
                    
        <div class="cart-quantity cart-column">
            <input class="cart-quantity-input" type="number" value="1">
            <button class="btn btn-danger" type="button">ENTFERNEN</button>
        </div>`
    cartRow.innerHTML = cartRowContents
    cartItems.append(cartRow)
    cartRow.getElementsByClassName('btn-danger')[0].addEventListener('click', removeCartItem)
}

function updateCartTotal() {
    var cartItemContainer = document.getElementsByClassName('cart-items') [0]
    var cartRows = cartItemContainer.getElementsByClassName('cart-row')
    var total = 0
    for (var i = 0; i < cartRows.length; i ++) {
        var cartRow = cartRows[i]
        var quantityElement = cartRow.getElementsByClassName('cart-quantity-input')[0]
        var quantity = quantityElement.value
        
        total = total + quantity
    }
    document.getElementsByClassName('cart-total-quantity')[0].value = total
}


/*
/* DROPDOWN CART 


const addButton = document.getElementsByClassName("shop-item-button");

addButton.addEventListener("click", enterEvent);

function enterEvent(evt) {

    createNewItemEntry();
}

function createNewItemEntry(event){
    const itemModal = document.getElementsByClassName('modal');
    const title = itemModal.getElementsByClassName('titel')[0].innterHTML;
    const image = itemModal.getElementsByClassName('shop-item-image')[0].src;
    addToCart(title, image);
}

function addToCart(title, image){
    const itemwrapper = document.createElement("div");
    itemwrapper.classList.add("itemwrapper");
    const cartItems = document.getElementsByClassName("cart-items")[0];
    const cartItemNames = cartItems.getElementsByClassName("cart-item-titel");
    for (var i = 0; i < cartItemNames.length; i++) {

    }

    let cartRowContents = 
    ` <div class="cart-item cart-column">
        <img class="cart-item-image" src="${imageSrc}" width="100" height="100">
        <span class="cart-item-title">${title}</span>
        </div>

        <div class="cart-quantity cart-column">
        <input class="cart-quantity-input" type="number" value="1" min="0">
        <button class="btn btn-danger" type="button">ENTFERNEN</button>
        </div> `;
    
    itemwrapper.innerHTML = cartRowContents;
    cartItems.append(itemwrapper);
}
 */