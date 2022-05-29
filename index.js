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
  constructor(button) {
    this.button = button;
    this.rippleFadeDelay = 600;

    button.addEventListener("mousedown", (e) => {
      this.rippleEnter(e);
    });

    button.addEventListener("mouseup", (e) => {
      this.rippleLeave(e);
    });

    button.addEventListener("mouseleave", (e) => {
      this.rippleLeave(e);
    });
  }

  rippleEnter(e) {
    this.dim = this.calcDim();
    this.circle = document.createElement("span");
    this.diameter = Math.max(this.button.clientWidth, this.button.clientHeight);
    this.radius = this.diameter / 2;

    this.x = `${e.clientX - this.dim.left.toFixed(0) - this.radius}px`;
    this.y = `${e.clientY - this.dim.top.toFixed(0) - this.radius}px`;
    this.centerX = `${this.dim.width / 2}px`;
    this.centerY = `${this.dim.height / 2}px`;

    if (e.clientX === 0 && e.clientY === 0) {
      this.x = `${this.dim.width / 2 - this.radius}px`;
      this.y = `${this.dim.height / 2 - this.radius}px`;
    }

    this.circle.style.width = this.circle.style.height = `${this.diameter}px`;
    this.circle.style.left = this.x;
    this.circle.style.top = this.y;
    this.circle.classList.add("_ripple--enter");
    this.button.appendChild(this.circle);
  }

  rippleLeave(e) {
    let ripples = this.button.querySelectorAll(
      "._ripple--enter:not(._ripple--leave)"
    );
    ripples.forEach((ripple) => {
      ripple.classList.add("_ripple--leave");
    });

    this.removeRipples();
  }

  calcDim() {
    return this.button.getBoundingClientRect();
  }

  removeRipples() {
    let ripples = this.button.querySelectorAll("._ripple--leave");

    ripples.forEach((ripple) => {
      ripple.addEventListener("animationend", function () {
        ripple.remove();
      });
    });
  }
}

let buttons = document.querySelectorAll(".ripple");

buttons.forEach((button) => {
  new Ripple(button);
});

// checks for dark mode

let Scheme = (function () {
  function getScheme() {
    if (["light", "dark"].indexOf(localStorage.getItem("theme-mode")) > -1) {
      return localStorage.getItem("theme-mode");
    } else {
      if (window.matchMedia) {
        if (window.matchMedia("(prefers-color-scheme: dark)").matches) {
          return "dark";
        }

        if (window.matchMedia("(prefers-color-scheme: light)").matches) {
          return "light";
        }
      } else {
        return "light";
      }
    }
  }

  function setScheme(color) {
    localStorage.setItem("theme-mode", color);

    if (getScheme() === "dark") {
      let stylesheet = document.createElement("link");
      stylesheet.setAttribute("href", "dark.css");
      stylesheet.setAttribute("type", "text/css");
      stylesheet.setAttribute("id", "dark-mode");
      stylesheet.setAttribute("rel", "stylesheet");
      document.head.append(stylesheet);
    }

    if (getScheme() === "light") {
      let stylesheet = document.getElementById("dark-mode");
      
      console.log(stylesheet)

      if (stylesheet) {
        stylesheet.remove();
      }
    }
  }

  setScheme(getScheme());

  let colorSchemeInput = document.getElementById("colorSchemeInput");
  let colorSchemeButton = document.getElementById("colorSchemeButton");
  let icon = colorSchemeButton.querySelector(".fa-solid");
  
  if (colorSchemeInput.checked) {
    icon.classList.add("fa-moon");
  } else {
    icon.classList.add("fa-sun");
  }

  colorSchemeButton.addEventListener("click", function () {
    if (colorSchemeInput.checked) {
      icon.classList.add("fa-sun");
      icon.classList.remove("fa-moon");
      setScheme("light");
    } else {
      icon.classList.remove("fa-sun");
      icon.classList.add("fa-moon");
      setScheme("dark");
    }
  });

  return {
    getScheme,
    setScheme,
  };
})();
