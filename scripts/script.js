
const cartButtons = document.getElementsByClassName('cart-btn');



for (let cartButton of cartButtons) {
    cartButton.addEventListener('click', function () {
        const productImage = cartButton.parentNode.childNodes[1].childNodes[1].src;
        const productName = cartButton.parentNode.childNodes[5].innerText;
        const productPrice = cartButton.parentNode.childNodes[7].childNodes[0].innerText;

        // parent node
        const cartParentDiv = document.getElementById('cart-parent-div');

        // create new div
        const newCartItem = document.createElement('div');

        // new div elemet
        newCartItem.innerHTML = `<div class="flex bg-[#1111110d] px-4 py-2.5 justify-between items-center rounded-lg mt-2.5 border border-gray-300">
        <img class="w-14" src=${productImage} alt="">
        <div class="flex flex-col">
            <h3 class="text-[20px] font-bold">${productName}</h3>
            <p class="text-[20px] font-bold opacity-50">${productPrice} TK</p>
        </div>
        </div>`

        cartParentDiv.appendChild(newCartItem);

        // const totalPrice = 


    })
}




