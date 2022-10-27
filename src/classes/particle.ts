import p5 from "p5";

type ColorParam =
	| p5.Color
	| string
	| number
	| [number, number, number]
	| [number, number, number, number];

export default class Particle {
	public position: p5.Vector;
	public velocity: p5.Vector;
	public acceleration: p5.Vector;
	public mass: number;
	public context: p5;

	constructor(
		context: p5,
		x: number,
		y: number,
		mass = 1,
		velocity = new p5.Vector(0, 0, 0),
		acceleration = new p5.Vector(0, 0, 0)
	) {
		this.context = context;
		this.position = new p5.Vector(x, y);
		this.mass = mass;
		this.velocity = velocity;
		this.acceleration = acceleration;
	}

	calculatePosition() {
		this.velocity.add(this.acceleration);
		this.position.add(this.velocity);
		this.acceleration.setMag(0);
	}

	draw(radius: number) {
		this.calculatePosition();
		this.context.noStroke();
		this.context.circle(this.position.x, this.position.y, radius);
	}

	applyForce(forceVector: p5.Vector) {
		this.acceleration.add(forceVector.copy().div(this.mass));
	}
}
