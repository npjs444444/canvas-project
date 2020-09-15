const c = document.querySelector(".cvs");
const ctx = c.getContext("2d");

c.width = window.innerWidth;
c.height = window.innerHeight;

ctx.fillStyle = "white";
ctx.fillRect(0, 0, c.width, c.height);

const ball = {};
var index = 0;

class Balls {
  constructor(x, y) {
    this.x = x;
    this.y = y;
    this.yv = Math.random() - 0.5;
    this.xv = Math.random() - 0.5;
    this.radi = 20 + Math.random() * 100;
    this.gravity = 1;
    this.color = `hsl(${Math.floor(Math.random() * 100)},100%,50%)`;
    index++;
    this.id = index;
    ball[this.id] = this;
    this.maxAge = 200 + Math.random() * 500;
  }

  draw() {
    this.maxAge--;
    ctx.beginPath();
    ctx.fillStyle = this.color;
    ctx.arc(this.x, this.y, this.radi, 0, Math.PI * 2, false);
    ctx.fill();
  }
  velocity() {
    if (this.maxAge <= 0) {
      delete ball[this.id];
    }
    this.x + this.xv;
    this.y += this.yv;
    this.xv += 0.1;
    this.yv += 0.2;
  }
}

c.addEventListener("click", (e) => {
  new Balls(e.clientX, e.clientY);
});

function animate() {
  ctx.fillStyle = "rgba(0,0,0.1)";
  ctx.fillRect(0, 0, c.width, c.height);
  requestAnimationFrame(animate);
  for (var i in ball) {
    ball[i].draw();
    ball[i].velocity();
  }
}

animate();
