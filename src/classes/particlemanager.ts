import p5 from "p5";
import Particle from "./particle";

export default class ParticleManager {
	public particles: Particle[];
	public radius: number;
	public color: p5.Color;
	public context: p5;

	constructor(context: p5, radius: number, color: p5.Color) {
		this.context = context;
		this.particles = [];
		this.radius = radius;
		this.color = color;
	}

	addParticle(p: Particle) {
		p.mass = this.context.random(1, 5);
		this.particles.push(p);
	}

	draw() {
		let prevParticle: Particle | null = null;
		for (const pt of this.particles) {
			pt.draw(this.radius);
			this.context.strokeWeight(this.radius);
			this.context.fill(this.color);
			this.context.stroke(this.color);
			if (prevParticle)
				this.context.line(
					prevParticle.position.x,
					prevParticle.position.y,
					pt.position.x,
					pt.position.y
				);
			prevParticle = pt;
		}
	}

	release() {
		for (const pt of this.particles) {
			this.context.fill(this.color);
			pt.draw(this.radius);
			pt.applyForce(new p5.Vector(0, 0.5));
		}
	}

	freeMemory() {
		this.particles = this.particles.filter(
			(pt) => pt.position.y < this.context.height
		);
	}
}
