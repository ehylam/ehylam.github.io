class Particle {
	constructor() {
		// Each object will contain a randomised value
		this.x = random(0, width);
		this.y = random(0, height);
		this.r = random(1, 3);
		this.xSpeed = random(-1, 1);
		this.ySpeed = random(-1, 1);
		this.color = random(0, 255);
		this.red = Math.floor(Math.random() * 256);
		this.green = Math.floor(Math.random() * 256);
		this.blue = Math.floor(Math.random() * 256);
	}

	createParticle() {
		noStroke();
		// Each particle/object will have a randow colour.
		fill('rgba(' + this.red + ',' + this.green + ',' + this.blue + ',0.5)');
		circle(this.x, this.y, this.r);
	}

	moveParticle() {
		// If the particle's X positon is less than zero or
		// greater than the window width then it will reverse/bouncy away from the boundary.
		if (this.x < 0 || this.x > width) {
			this.xSpeed *= -1;
		}
		if (this.y < 0 || this.y > height) {
			this.ySpeed *= -1;
		}
		// With the newly updated speed,
		// It will update the x and y values
		this.x += this.xSpeed;
		this.y += this.ySpeed;
	}

	joinParticles(particles) {
		particles.forEach((element) => {
			let dis = dist(this.x, this.y, element.x, element.y);
			if (dis < 100) {
				stroke('rgba(' + this.red + ',' + this.green + ',' + this.blue + ',0.5)');
				line(this.x, this.y, element.x, element.y);
			}
		});
	}
}

let particles = [];
let xspacing = 16;
let w;
let theta = 0.0;
let amplitude = 75.0;
let period = 500.0;
let dx;
let yvalues;
let randomColor = Math.floor(Math.random() * 155 + 100);
let randomDx = Math.floor(Math.random() * 500);
// Cool cursor mouse values;
let mX;
let mY;
let s1, s2;
let gravity = 9.8;
let mass = 2.0;
let x = 0;
let y = 0;

function windowResized() {
	let size = min(windowWidth, windowHeight) * 0.96;
	size = floor(size);
	resizeCanvas(windowWidth, windowHeight);
	draw();
}

function setup() {
	createCanvas(windowWidth, windowHeight);
	strokeWeight(1);
	for (let i = 0; i < width / 10; i++) {
		particles.push(new Particle());
		frameRate(30);
	}
	w = width + 16;
	dx = TWO_PI / period * xspacing + randomDx;
	yvalues = new Array(floor(w / xspacing));

	// r = height * 0.02;
	// oTheta = 0;
	// oTheta_vel = 0;
	// oTheta_acc = 0.0001;
	// Cool cursor!
	s1 = new Spring2D(0.0, width / 2, mass, gravity);
	s2 = new Spring2D(0.0, width / 2, mass, gravity);
}

function draw() {
	background('#0f0f0f');
	// calcWave();
	// renderWaves();
	// line(mouseX, mouseY, pmouseX, pmouseY);
	for (let i = 0; i < particles.length; i++) {
		particles[i].createParticle();
		particles[i].moveParticle();
		particles[i].joinParticles(particles.slice(i));
	}
	line(mouseX, mouseY, pmouseX, pmouseY);
	// translate(pmouseX, pmouseY);
	// ellipseMode(CENTER);
	// let oX = r * cos(oTheta);
	// let oY = r * sin(oTheta);
	// ellipse(oX, oY, 32, 32);

	// oTheta_vel += oTheta_acc;
	// oTheta += oTheta_vel;

	// mX = lerp(mX, mouseX, 0.05);
	// mY = lerp(mY, mouseY, 0.05);
	// ellipse(mX, mY, 22, 22);
	// Cool cursor
	s1.update(s1.x, mouseY);
	s1.display(mouseX, mouseY);
	s2.update(windowWidth, s1.y);
	s2.display(mouseX, mouseY);
	x = lerp(x, mouseX, 0.15);
	y = lerp(y, mouseY, 0.15);

	fill(randomColor);
	stroke(randomColor);
	ellipse(x, y, 44, 44);
}

function calcWave() {
	theta += 0.02;
	let x = theta;
	for (let i = 0; i < yvalues.length; i++) {
		yvalues[i] = sin(x) * amplitude;
		x += dx;
	}
}

function renderWaves() {
	noStroke();
	let d = map(mouseX, 0, width, 1, 3);
	for (let x = 0; x < yvalues.length; x++) {
		fill('rgba(' + this.red + ',' + this.green + ',' + this.blue + ',0.5)');
		ellipse(x * xspacing, height / 2 + yvalues[x], d, d);
	}
}
// Cool Cursor
function Spring2D(xpos, ypos, m, g) {
	this.x = xpos;
	this.y = ypos;
	this.vx = 0;
	this.vy = 0;
	this.mass = m;
	this.gravity = g;
	this.radius = 30;
	this.stiffness = 0.2;
	this.damping = 0.7;

	this.update = function(targetX, targetY) {
		let forceX = (targetX - this.x) * this.stiffness;
		let ax = forceX / this.mass;
		this.vx = this.damping * (this.vx + ax);
		this.x += this.vx;
		let forceY = (targetY - this.y) * this.stiffness;
		let ay = forceY / this.mass;
		this.vy = this.damping * (this.vy + ay);
		this.y += this.vy;
	};

	this.display = function(nx, ny) {
		noStroke();
		ellipse(this.x, this.y, this.radius * 2, this.radius * 2);
		stroke(255);
		line(this.x, this.y, nx, ny);
	};
}

$(document).ready(function() {
	setTimeout(() => {
		const parent = document.querySelector('#container');
		const child = document.querySelector('.p5Canvas');
		console.log(child);
		parent.appendChild(child);
	}, 150);
});
