
const cartButtons = document.getElementsByClassName('cart-btn');
let totalPrice = 0;
let discountPrice = 0;
let finalPrice = 0;
let couponApplied = false;
let discountPercentage = 0;

const cartParentDiv = document.getElementById('cart-parent-div');

let elementsOfCartParenDiv = 0;



for (let cartButton of cartButtons) {
    cartButton.addEventListener('click', function () {
        const productImage = cartButton.parentNode.childNodes[1].childNodes[1].src;
        const productName = cartButton.parentNode.childNodes[5].innerText;
        const productPrice = cartButton.parentNode.childNodes[7].childNodes[0].innerText;

        const priceValue = Number(productPrice);

        // check if item already exists in cart
        let existingItem = Array.from(cartParentDiv.children).find(item => {
            return item.querySelector("h3").innerText === productName;
        });

        if (existingItem) {
            // item already exists → increase quantity
            let qtyBadge = existingItem.querySelector(".qty-badge");
            let qty = Number(qtyBadge.innerText);
            qtyBadge.innerText = qty + 1;
        }

        else {
            // create new div
            const newCartItem = document.createElement('div');

            // new div element with quantity badge
            newCartItem.innerHTML = `
            <div class="relative flex bg-[#1111110d] px-4 py-2.5 justify-between items-center rounded-lg mt-2.5 border border-gray-300">
                <img class="w-14" src=${productImage} alt="">
                <div class="flex flex-col">
                    <h3 class="text-[20px] font-bold">${productName}</h3>
                    <p class="text-[20px] font-bold opacity-50">${productPrice} TK</p>
                </div>
                <!-- quantity badge -->
                <span class="qty-badge absolute top-0 right-0 bg-red-500 text-white text-xs font-bold px-2 py-0.5 rounded-full">1</span>
            </div>`;

            cartParentDiv.appendChild(newCartItem);
        }


        // update total Price
        totalPrice += priceValue;

        updatePrices();

        // alert message
        alertFunction(`<div class="alert alert-success">
        <svg xmlns="http://www.w3.org/2000/svg" class="h-6 w-6 shrink-0 stroke-current" fill="none" viewBox="0 0 24 24">
        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
        </svg>
        <span class = 'font-bold'>Your product has been added to cart!</span>
        </div>`)


        elementsOfCartParenDiv = cartParentDiv.childElementCount;
        console.log(elementsOfCartParenDiv)
        function btnHideShow(id) {
            document.getElementById(id).classList.remove('hidden');
        }

        if (elementsOfCartParenDiv === 1) {
            btnHideShow('all-Clear-btn')
        }

    })
}


// apply Coupon

document.getElementById('coupon-btn').addEventListener('click', function () {
    const validCouponCode = document.getElementById('coupon-code').innerText;
    const couponCodeInput = document.getElementById('coupon-code-input').value;

    if (validCouponCode === couponCodeInput && finalPrice >= 200 && couponApplied == false) {
        discountPercentage = Number(document.getElementById('discount-percentage').innerText);
        couponApplied = true;

        updatePrices();


        alertFunction(`<div class="alert alert-success">
            <svg xmlns="http://www.w3.org/2000/svg" class="h-6 w-6 shrink-0 stroke-current" fill="none" viewBox="0 0 24 24">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
            </svg>
            <span class = 'font-bold'>Discount Added Successfully</span>
            </div>`
        )

    }

    else if (validCouponCode === couponCodeInput && finalPrice < 200) {
        alertFunction(`<div role="alert" class="alert alert-error">
            <svg xmlns="http://www.w3.org/2000/svg" class="h-6 w-6 shrink-0 stroke-current" fill="none" viewBox="0 0 24 24">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M10 14l2-2m0 0l2-2m-2 2l-2-2m2 2l2 2m7-2a9 9 0 11-18 0 9 9 0 0118 0z" />
            </svg>
            <span class = "font-bold">Total Price Must be 200TK or More to Enable Coupon!</span>
            </div>`
        )
    }

    else if (couponApplied = true) {
        alertFunction(`<div role="alert" class="alert alert-error">
            <svg xmlns="http://www.w3.org/2000/svg" class="h-6 w-6 shrink-0 stroke-current" fill="none" viewBox="0 0 24 24">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M10 14l2-2m0 0l2-2m-2 2l-2-2m2 2l2 2m7-2a9 9 0 11-18 0 9 9 0 0118 0z" />
            </svg>
            <span class = "font-bold">Discount Already added</span>
            </div>`
        )
    }

    else {
        alertFunction(`<div role="alert" class="alert alert-error">
        <svg xmlns="http://www.w3.org/2000/svg" class="h-6 w-6 shrink-0 stroke-current" fill="none" viewBox="0 0 24 24">
        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M10 14l2-2m0 0l2-2m-2 2l-2-2m2 2l2 2m7-2a9 9 0 11-18 0 9 9 0 0118 0z" />
        </svg>
        <span class = "font-bold">Error! Invalid Coupon Code.</span>
        </div>`
        )
    }
})



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



// alert message function

function alertFunction(alertInnerHTML) {
    const alertBox = document.createElement('div');
    alertBox.setAttribute('role', 'alert');
    const alertContainer = document.getElementById('alert-container');

    alertBox.innerHTML = alertInnerHTML;

    alertContainer.appendChild(alertBox);

    setTimeout(() => {
        alertBox.remove();
    }, 3000);
}

// clear Button Function


document.getElementById('all-Clear-btn').addEventListener('click', function () {
    cartParentDiv.innerHTML = '';
})
