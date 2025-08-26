
const cartButtons = document.getElementsByClassName('cart-btn');
let totalPrice = 0;
let discountPrice = 0;
let finalPrice = 0;
let couponApplied = false;
let discountPercentage = 0;



for (let cartButton of cartButtons) {
    cartButton.addEventListener('click', function () {
        const productImage = cartButton.parentNode.childNodes[1].childNodes[1].src;
        const productName = cartButton.parentNode.childNodes[5].innerText;
        const productPrice = cartButton.parentNode.childNodes[7].childNodes[0].innerText;

        const priceValue = Number(productPrice);

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
        </div>`;

        cartParentDiv.appendChild(newCartItem);


        // update total Price
        totalPrice += priceValue;

        updatePrices();
    })
}


// apply Coupon

document.getElementById('coupon-btn').addEventListener('click', function () {
    const validCouponCode = document.getElementById('coupon-code').innerText;
    const couponCodeInput = document.getElementById('coupon-code-input').value;

    if (validCouponCode === couponCodeInput) {
        discountPercentage = Number(document.getElementById('discount-percentage').innerText);
        couponApplied = true;

        updatePrices();
    }

    else {
        alert('Invalid Coupon Code')
    }
})


// document.getElementById('coupon-btn').addEventListener('click', function () {
//     const validCouponCode = document.getElementById('coupon-code').innerText;
//     const couponCodeInput = document.getElementById('coupon-code-input').value;
//     const discountPercentage = Number(document.getElementById('discount-percentage').innerText);

//     if (validCouponCode === couponCodeInput) {
//         discountPrice = totalPrice * (discountPercentage / 100);
//         finalPrice = totalPrice - discountPrice;

//         document.getElementById('discount').innerText = discountPrice.toFixed(2);


//         document.getElementById('final-price').innerText = finalPrice.toFixed(2);
//     }

//     else {
//         alert('Invalid Coupon Code')
//     }

//     console.log(couponCodeInput)
//     console.log(discountPrice)
// })


// function to update the price


function updatePrices() {
    if (couponApplied) {
        discountPrice = totalPrice * (discountPercentage / 100);
        finalPrice = totalPrice - discountPrice;
    }

    else {
        discountPrice = 0;
        finalPrice = totalPrice
    }

    document.getElementById('total-price').innerText = totalPrice.toFixed(2);
    document.getElementById('total-discount').innerText = discountPrice.toFixed(2);
    document.getElementById('final-price').innerText = finalPrice.toFixed(2);
}

