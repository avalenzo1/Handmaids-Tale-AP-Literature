let nav = document.querySelector("#nav");
let coordinates = document.querySelector("#coordinates");
let navToggle = document.querySelector(".nav-toggle");
let navItems = document.querySelector(".nav-items");
let hamburgerIcon = document.querySelector(".hamburger-icon");

navToggle.addEventListener("click", function (e) {
  if (navItems.style.display === "none") {
    navItems.style.display = "flex";
    hamburgerIcon.classList.add("active");
  } else {
    navItems.style.display = "none";
    hamburgerIcon.classList.remove("active");
  }

  nav.style.top = 0 + "px";
});

window.onscroll = function (e) {
  this.dim = nav.getBoundingClientRect();

  nav.style.top = this.dim.top - (this.scrollY - this.oldScroll) + "px";

  if (this.oldScroll > this.scrollY) {
    if (this.dim.top >= 0) {
      nav.style.top = 0 + "px";
    }
  } else {
    if (this.dim.top <= -this.dim.height) {
      nav.style.top = -this.dim.height + "px";
    }
  }

  this.oldScroll = this.scrollY;
};

window.onresize = function (e) {
  let w = document.body.clientWidth;

  if (w <= 600) {
    nav.style.top = 0 + "px";
  }
};

// ripple effects
    let ripple = (e) => {
        const button = e.currentTarget;
        button.dim = button.getBoundingClientRect();
        const circle = document.createElement("span");
        const diameter = Math.max(button.clientWidth, button.clientHeight);
        const radius = diameter / 2;

        let x = `${e.clientX - button.dim.left - radius}px`;
        let y = `${e.clientY - button.dim.top - radius}px`;

        if (e.clientX === 0 && e.clientY === 0) {
            x = `${button.dim.width / 2 - radius}px`;
            y = `${button.dim.height / 2 - radius}px`;
        }

        circle.style.width = circle.style.height = `${diameter}px`;
        circle.style.left = x;
        circle.style.top = y;
        circle.classList.add("_ripple");

        console.log(button)  
      
        const _ripple = button.querySelector("._ripple");
      
        console.log(_ripple)  

        if (_ripple) {
            _ripple.remove();
        }

        button.appendChild(circle);
    };

    let buttons = document.querySelectorAll(".ripple");

    buttons.forEach((button) => {
        button.addEventListener("click", ripple);
    });