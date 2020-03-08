class Particle {
	constructor() {
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
		fill('rgba(' + this.red + ',' + this.green + ',' + this.blue + ',0.5)');
		circle(this.x, this.y, this.r);
	}

	moveParticle() {
		if (this.x < 0 || this.x > width) {
			this.xSpeed *= -1;
		}
		if (this.y < 0 || this.y > height) {
			this.ySpeed *= -1;
		}

		this.x += this.xSpeed;
		this.y += this.ySpeed;
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

function windowResized() {
	let size = min(windowWidth, windowHeight) * 0.96;
	size = floor(size);
	resizeCanvas(windowWidth, windowHeight);
	noiseSeed(random(100));
	draw();
}

function setup() {
	createCanvas(windowWidth, windowHeight);
	strokeWeight(8);
	for (let i = 0; i < width / 10; i++) {
		particles.push(new Particle());
		frameRate(26);
	}
	w = width + 16;
	dx = TWO_PI / period * xspacing + randomDx;
	yvalues = new Array(floor(w / xspacing));
}

function draw() {
	background('#0f0f0f');
	calcWave();
	renderWaves();
	for (let i = 0; i < particles.length; i++) {
		particles[i].createParticle();
		particles[i].moveParticle();
	}
	line(mouseX, mouseY, pmouseX, pmouseY);
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
	for (let x = 0; x < yvalues.length; x++) {
		fill(randomColor);
		ellipse(x * xspacing, height / 2 + yvalues[x], 2, 2);
	}
}
