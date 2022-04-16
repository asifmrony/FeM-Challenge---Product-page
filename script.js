/*TO-DO 1: show/hide cart dropdown when 
  - user clicks on cart icon
  - user clicks on profile image   
*/
const cartIcon = document.querySelector(".cart");
const profileImg = document.querySelector(".profile-image");

cartIcon.addEventListener('click', toggleDropdown);
profileImg.addEventListener('click', toggleDropdown);

function toggleDropdown() {
    document.getElementById('dropdown').classList.toggle("show");
}

/* 
TO-DO 2: hide dropdown when user clicks outside cart icon and profile image[Abandoned]
*/
/*window.onclick = function(event) {
    //if event user doesn't click on cart and profile image
    if ((!event.target.matches('.cart')) || (!event.target.matches('.profile-image'))) {
        var dropdowns = document.getElementsByClassName("dropdown-content");
        console.log(dropdowns[0].classList);
        // var i;
        // for (i = 0; i < dropdowns.length; i++) {
        //   var openDropdown = dropdowns[i];
        //   if (openDropdown.classList.contains('show')) {
        //     openDropdown.classList.remove('show');
        //   }
        // }
      }
}*/

/*
TO-DO 3: WHEN user clicks on thumbnail image respective image will show on large image
*/

const imageTop = document.querySelector(".pdd__image-top img");
const imageBottom = document.querySelector(".pdd__image-bottom");

for(let i = 1; i <= 4; i++) {
    const newImage = document.createElement("img");
    newImage.setAttribute("src", `images/image-product-${i}-thumbnail.jpg`)
    const overlay = document.createElement("div");
    overlay.setAttribute('class', 'overlay');
    overlay.appendChild(newImage);
    if(i === 1) {
        overlay.classList.add('active');
    }
    overlay.addEventListener('click', function(){
        //removes active class from overlay and add it to which overlay has been clicked  
        const allOvrlays = imageBottom.querySelectorAll(".overlay");
        for(let j = 0; j < allOvrlays.length; j++) {
            allOvrlays[j].classList.remove("active");
        }
        this.classList.add("active");
        imageTop.setAttribute('src', `images/image-product-${i}.jpg`);
    })
    imageBottom.appendChild(overlay);
}

/*
TO-DO 3: WHEN user increment or decrement quantity value 
    - plus button increase the value
    - minus button decrease the value
*/
const plusBtn = document.querySelector('.plus-btn');
const minusBtn = document.querySelector('.minus-btn');
let counterValue = document.querySelector('.pd-count-value');

plusBtn.addEventListener('click', function(){
    counterValue.textContent = (Number(counterValue.textContent) + 1).toString();
})

minusBtn.addEventListener('click', function(){
    if(counterValue.textContent > 1) {
        counterValue.textContent = (Number(counterValue.textContent) - 1).toString();
    }
})

/*
TO-DO 3: WHEN user press "add to cart" 
    - increment the orange cart counter
    - item(with product name, price & quantity) will be added in cart dropdown
*/
const addToCartBtn = document.querySelector('.add-to-cart-btn');
const ddCartBody = document.querySelector('.dd-cart__body');
const productName = document.querySelector('.pdd__details-name').textContent;
const productPrice = document.querySelector('.actual-price').textContent;
const productImage = imageTop.getAttribute('src');
const cartDiv = document.querySelector('.cart');
const cartImageChild = cartDiv.querySelector('img');
let cartPdCounter = 1;
console.log("product name " + productName + ", product price " + productImage);

addToCartBtn.addEventListener('click', function(){
    console.log("Start cart product counter: " + cartPdCounter);

    //create checkout div
    let checkoutDiv = document.createElement('div');
    checkoutDiv.setAttribute('class', 'dd-pd-checkout');
    checkoutDiv.innerHTML = `<button type="button" class="checkout-btn">Checkout</button>`; 
    //create product div to dom over the fly
    ddCartBody.classList.remove('is-empty');
    ddCartBody.classList.add('have-product');
    
    let productDiv = document.createElement('div');
    productDiv.setAttribute('class', 'dd-pd');
    productDiv.innerHTML = `<div class="dd-pd-image">
        <img src="${productImage}" alt="">
        </div>
        <div class="dd-pd-details">
        <h5 class="dd-pd-name">${productName}</h5>
        <p>
            <span class="dd-pd-price">${productPrice}</span>
            <span class="multiple-sign">+</span>
            <span class="dd-pd-count">${counterValue.textContent}</span>
            <span class="dd-price-total">$${parseFloat(productPrice.slice(1)) * parseInt(counterValue.textContent)}</span>
        </p>
        </div>
        <div class="dd-pd-delete">
        <svg width="14" height="16" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink"><defs><path d="M0 2.625V1.75C0 1.334.334 1 .75 1h3.5l.294-.584A.741.741 0 0 1 5.213 0h3.571a.75.75 0 0 1 .672.416L9.75 1h3.5c.416 0 .75.334.75.75v.875a.376.376 0 0 1-.375.375H.375A.376.376 0 0 1 0 2.625Zm13 1.75V14.5a1.5 1.5 0 0 1-1.5 1.5h-9A1.5 1.5 0 0 1 1 14.5V4.375C1 4.169 1.169 4 1.375 4h11.25c.206 0 .375.169.375.375ZM4.5 6.5c0-.275-.225-.5-.5-.5s-.5.225-.5.5v7c0 .275.225.5.5.5s.5-.225.5-.5v-7Zm3 0c0-.275-.225-.5-.5-.5s-.5.225-.5.5v7c0 .275.225.5.5.5s.5-.225.5-.5v-7Zm3 0c0-.275-.225-.5-.5-.5s-.5.225-.5.5v7c0 .275.225.5.5.5s.5-.225.5-.5v-7Z" id="a"/></defs><use fill="#C3CAD9" fill-rule="nonzero" xlink:href="#a"/></svg>
        </div>`;
    //Create Cart counter Span Element 
    let spanElement = document.createElement('span');
    spanElement.setAttribute('class', 'cart__count');
    // spanElement.textContent = cartPdCounter;
    if(ddCartBody.childElementCount === 0) {
        //insert into product body container before checkout
        ddCartBody.innerHTML = '';
        ddCartBody.appendChild(checkoutDiv);
        ddCartBody.insertBefore(productDiv, checkoutDiv);
        cartDiv.insertBefore(spanElement, cartImageChild);
    } else {
        //insert productDiv before existing product lists and increment cart value
        // const ddPd = document.querySelector('.dd-pd');
        // ddCartBody.insertBefore(productDiv, ddPd);
        // cartPdCounter++;

        //update cart dropdowns product quantity and accumulated price on every add to cart clicks
        const pdCount = document.querySelector('.dd-pd-count');
        const pdPrice = document.querySelector('.dd-price-total');
        let updatedAmount = counterValue.textContent;
        pdCount.textContent = updatedAmount;
        let updatedPrice = parseFloat(productPrice.slice(1)) * updatedAmount;
        pdPrice.textContent = '$' + updatedPrice;
    }
    document.querySelector('.cart__count').textContent = cartPdCounter;
    /*
    TO-DO 3: WHEN user press "Product delete button" in cart checkout 
    */
    const pdDeleteBtn = ddCartBody.querySelector('.dd-pd .dd-pd-delete');
    pdDeleteBtn.addEventListener('click', function() {
        this.parentElement.remove();
        cartPdCounter--;
        console.log(cartPdCounter);
        // document.querySelector('.cart__count').textContent = cartPdCounter;
        if(cartPdCounter === 0) {
            cartPdCounter = 1;
            let pdCheckout = document.querySelector('.dd-pd-checkout');
            pdCheckout.remove();
            ddCartBody.classList.remove('have-product');
            ddCartBody.classList.add('is-empty');
            ddCartBody.innerHTML = "Your cart is empty";
            document.querySelector('.cart__count').remove();
        }
    })
    console.log("End cart product counter: " + cartPdCounter);
    counterValue.textContent = 1;
})

/*
TO-DO 4: Open a lightbox gallery by clicking on the large product image 
*/
const lighboxOn = document.querySelector('.lightbox-on');
const lighboxOff = document.querySelector('.lightbox-off');

lighboxOn.addEventListener('click', function(){
    document.querySelector('.modal').style.display = 'block';
})

lighboxOff.addEventListener('click', function(){
    document.querySelector('.modal').style.display = 'none';
})

// SlideIndex Count variable
let slideIndex = 1;
showSlides(slideIndex)

// change slides
// document.querySelector('.prev').onClick = plusSlides(-1);
// document.querySelector('.next').onClick = plusSlides(1);
document.querySelector('.prev').addEventListener('click', function(){
    plusSlides(-1);
})

document.querySelector('.next').addEventListener('click', function(){
    plusSlides(1);
})

function plusSlides(n) {
    showSlides(slideIndex += n);
}

function currentSlide(n) {
    showSlides(slideIndex = n);
}

function showSlides(n) {
    let slides = document.getElementsByClassName('mySlides');
    let dots = document.getElementsByClassName('lightbox-overlay');
    let i;
    if(n > slides.length) {
        slideIndex = 1;
    }
    if(n < 1) {
        slideIndex = slides.length;
    }
    for(i=0; i<slides.length; i++) {
        slides[i].style.display = 'none';
    }
    for(i=0; i<dots.length; i++) {
        dots[i].className = dots[i].className.replace(" active", "");
    }
    slides[slideIndex-1].style.display = 'block';
    dots[slideIndex-1].className += " active";
    console.log(dots);
}

// let slides = document.getElementsByClassName('mySlides');
// console.log(slides);

// TO-DO: Show and hide Navigation on button click on Mobile devices
const hamburger = document.querySelector('.nav__hamburger');
const closeButton = document.querySelector('.nav__close-mobile');
const navigationBar = document.querySelector('.nav__navigation-bar');

hamburger.addEventListener('click', function(){
    navigationBar.style.display = 'block';
})

closeButton.addEventListener('click', function(){
    navigationBar.style.display = 'none';
})