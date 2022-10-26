import p5 from "p5";

export const sketch = (p: p5) => {
	let prevX: number | undefined = undefined;
	let prevY: number | undefined = undefined;
	let pressing = false;
	p.setup = () => {
		p.createCanvas(500, 500);
		p.background("#FFF");
		p.stroke("#000");
	};
	p.draw = () => {
		pressing = false;
		if (p.mouseIsPressed) {
			pressing = true;
			if (typeof prevX === "undefined" || typeof prevY === "undefined") {
				p.point(p.mouseX, p.mouseY);
				prevX = p.mouseX;
				prevY = p.mouseY;
			} else {
				p.line(prevX, prevY, p.mouseX, p.mouseY);
				prevX = p.mouseX;
				prevY = p.mouseY;
			}
		}
		if (!pressing) {
			prevX = undefined;
			prevY = undefined;
		}
	};
};

new p5(sketch);
