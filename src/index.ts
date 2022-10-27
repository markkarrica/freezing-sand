import p5 from "p5";
import Particle from "./classes/particle";
import ParticleManager from "./classes/particlemanager";

export const sketch = (p: p5) => {
	const releasedPtManagers: ParticleManager[] = [];
	let activeManager = new ParticleManager(p, 5, p.color("#000"));
	p.setup = () => {
		p.createCanvas(500, 500);
	};
	p.draw = () => {
		p.background("#FFF");
		releasedPtManagers.forEach((p) => p.release());
		activeManager.draw();
	};
	p.mouseDragged = () => {
		activeManager.addParticle(new Particle(p, p.mouseX, p.mouseY));
	};
	p.mouseReleased = () => {
		releasedPtManagers.push(activeManager);
		activeManager = new ParticleManager(p, 5, p.color("#000"));
	};
};

new p5(sketch);
