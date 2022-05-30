let nav = document.querySelector("#nav");
let coordinates = document.querySelector("#coordinates");
let navToggle = document.querySelector(".nav-toggle");
let navItems = document.querySelector(".nav-items");
let hamburgerIcon = document.querySelector(".hamburger-icon");

let on;

if (navigator.userAgentData.mobile) {
  on = {
    down: "touchstart",
    up: "touchend",
    move: "touchmove",
    enter: "touchenter",
    leave: "touchleave",
  };
} else {
  on = {
    down: "mousedown",
    up: "mouseup",
    move: "mousemove",
    enter: "mouseenter",
    leave: "mouseleave",
  };
}

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

    this.button.addEventListener(on.down, (e) => {
      this.rippleEnter(e);
    });

    this.button.addEventListener(on.up, (e) => {
      this.rippleLeave(e);
    });

    this.button.addEventListener(on.leave, (e) => {
      this.rippleLeave(e);
    });
  }

  rippleEnter(e) {
    this.getRipplesNotLeave();
    
    this.clientX = (e.clientX) ? e.clientX : e.touches[0].clientX;
    this.clientY = (e.clientY) ? e.clientY : e.touches[0].clientY;

    this.dim = this.calcDim();
    this.circle = document.createElement("span");
    this.diameter = Math.max(this.button.clientWidth, this.button.clientHeight);
    this.radius = this.diameter / 2;

    this.x = `${this.clientX - this.dim.left.toFixed(0) - this.radius}px`;
    this.y = `${this.clientY - this.dim.top.toFixed(0) - this.radius}px`;
    this.centerX = `${this.dim.width / 2}px`;
    this.centerY = `${this.dim.height / 2}px`;

    if (this.clientX === 0 && this.clientY === 0) {
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
    this.getRipplesNotLeave();
    this.removeRipples();
  }

  getRipplesNotLeave() {
    let ripples = this.button.querySelectorAll(
      "._ripple--enter:not(._ripple--leave)"
    );
    ripples.forEach((ripple) => {
      ripple.classList.add("_ripple--leave");
    });
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

// Light ☀ / Dark 🌙 Mode Function

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

      if (stylesheet) {
        stylesheet.remove();
      }
    }
  }

  setScheme(getScheme());

  let colorSchemeInput = document.getElementById("colorSchemeInput");
  let colorSchemeButton = document.getElementById("colorSchemeButton");
  let icon = colorSchemeButton.querySelector(".fa-solid");

  if (getScheme() === "dark") {
    colorSchemeInput.checked = true;
  }

  if (colorSchemeInput.checked) {
    icon.classList.add("fa-sun");
  } else {
    icon.classList.add("fa-moon");
  }

  colorSchemeButton.addEventListener("click", function () {
    if (colorSchemeInput.checked) {
      icon.classList.add("fa-moon");
      icon.classList.remove("fa-sun");
      setScheme("light");
    } else {
      icon.classList.remove("fa-moon");
      icon.classList.add("fa-sun");
      setScheme("dark");
    }
  });

  return {
    getScheme,
    setScheme,
  };
})();

new TypeIt(".heading-main", { 
    lifeLike: false, 
    speed: 0 
})
	.type("S")
	.pause(220)
	.type("e")
	.pause(170)
	.type("l")
	.pause(112)
	.type("e")
	.pause(194)
	.type("c")
	.pause(257)
	.type("t")
	.pause(226)
	.type(" ")
	.pause(182)
	.type("a")
	.pause(419)
	.type("n")
	.pause(182)
	.type(" ")
	.pause(144)
	.type("A")
	.pause(209)
	.type("r")
	.pause(264)
	.type("t")
	.pause(94)
	.type("i")
	.pause(232)
	.type("f")
	.pause(105)
	.type("a")
	.pause(110)
	.type("c")
	.pause(292)
	.type("t")
	.go();