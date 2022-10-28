import p5 from "p5";
import Particle from "./classes/particle";
import ParticleManager from "./classes/particlemanager";

export const sketch = (p: p5) => {
	const colorChanger = document.getElementById("Color") as HTMLInputElement;
	let color = colorChanger.value;
	colorChanger.addEventListener("input", () => {
		color = colorChanger.value;
		activeManager = new ParticleManager(p, 5, p.color(color));
	});
	const releasedPtManagers: ParticleManager[] = [];
	let activeManager = new ParticleManager(p, 5, p.color(color));
	p.setup = () => {
		p.createCanvas(window.innerWidth, window.innerHeight);
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
		activeManager = new ParticleManager(p, 5, p.color(color));
	};
	p.windowResized = () => {
		p.resizeCanvas(window.innerWidth, window.innerHeight);
	};
};

new p5(sketch);
