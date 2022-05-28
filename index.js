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
  } else {
    navItems.style.display = "flex";
  }
};

class Ripple {
  constructor(e) {
    this.e = e;
    this.button = this.e.currentTarget;
    this.button.dim = this.button.getBoundingClientRect();

    this.circle = document.createElement("span");
    this.diameter = Math.max(this.button.clientWidth, this.button.clientHeight);
    this.radius = this.diameter / 2;

    this.x = `${this.e.clientX - this.button.dim.left - this.radius}px`;
    this.y = `${this.e.clientY - this.button.dim.top - this.radius}px`;

    if (e.clientX === 0 && e.clientY === 0) {
      this.x = `${this.button.dim.width / 2 - this.radius}px`;
      this.y = `${this.button.dim.height / 2 - this.radius}px`;
    }

    this.circle.style.width = this.circle.style.height = `${this.diameter}px`;
    this.circle.style.left = this.x;
    this.circle.style.top = this.y;
    this.circle.classList.add("_ripple");

    this._ripple = this.button.querySelector("._ripple");

    if (this._ripple) {
      this._ripple.remove();
    }

    this.button.appendChild(this.circle);
  }
}

let buttons = document.querySelectorAll(".ripple");

buttons.forEach((button) => {
  button.addEventListener("mousedown", (e) => {
    new Ripple(e);
  });
});
