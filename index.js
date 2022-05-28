let nav = document.querySelector("#nav");
let coordinates = document.querySelector("#coordinates");
let navToggle = document.querySelector(".nav-toggle");
let navItems = document.querySelector(".nav-items");
let hamburgerIcon = document.querySelector(".hamburger-icon");

navToggle.addEventListener('click', function(e) {
    if (navItems.style.display === 'none') {
		navItems.style.display = 'flex';
        hamburgerIcon.classList.add("active");
    } else {
		navItems.style.display = 'none';
        hamburgerIcon.classList.remove("active");
    }
    
    nav.style.top = 0 + 'px';
});

window.onscroll = function(e) {
    this.dim = nav.getBoundingClientRect();

    nav.style.top = this.dim.top - (this.scrollY - this.oldScroll) + 'px';

    if (this.oldScroll > this.scrollY) {
        if (this.dim.top >= 0) {
            nav.style.top = 0 + 'px';
        }
    } else {
        if (this.dim.top <= -this.dim.height) {
            nav.style.top = -this.dim.height + 'px';
        }
    }

    this.oldScroll = this.scrollY;
};

window.onresize = function(e) {
	    
    let w = document.body.clientWidth;
    
    if (w <= 600) {
    	nav.style.top = 0 + 'px';
    }
};

// ripple effects

let buttons = document.querySelectorAll(".ripple");

let _ripple = (event) => {
    const button = event.currentTarget;

    const circle = document.createElement("span");
    const diameter = Math.max(button.clientWidth, button.clientHeight);
    const radius = diameter / 2;

    circle.style.width = circle.style.height = `${diameter}px`;
    circle.style.left = `${event.clientX - button.offsetLeft - radius}px`;
    circle.style.top = `${event.clientY - button.offsetTop - radius}px`;
    circle.classList.add("_ripple");

    const ripple = button.getElementsByClassName("_ripple")[0];

    if (ripple) {
        ripple.remove();
    }

    button.appendChild(circle);
};

buttons.forEach((button) => {
    button.addEventListener("click", _ripple);
});