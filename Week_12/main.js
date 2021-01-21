import {Component, createElement} from "./framework.js";

class Carousel extends Component {
	constructor() {
		super();
		this.attributes = Object.create(null);
	}
	setAttribute(name, value) {
		this.attributes[name] = value;
	}
	render(){
		this.root = document.createElement("div");
		this.root.classList.add("carousel");
		for(let record of this.attributes.src) {
			let child = document.createElement("div");
			child.style.backgroundImage = `url('${record}')`;
			this.root.appendChild(child);
		}

		let position = 0;

		this.root.addEventListener("mousedown", event => {
			let children = this.root.children;
			let startX = event.clientX;

			let move = event => {
				let x = event.clientX - startX;

				let current = position - ((x - x % 280)/ 280);

				for(let offset of [-1, 0, 1]) {
					let pos = current + offset;
					pos = (pos + children.length) % children.length;

					children[pos].style.transition = "none";
					children[pos].style.transform = `translateX(${ - pos * 280 + offset * 280 + x % 280}px)`;
				}
			}

			let up = event => {
				let x = event.clientX - startX;

				position = position - Math.round(x / 280);

				for(let offset of [0, - Math.sign(Math.round(x / 280) - x + 140 * Math.sign(x))]) {
					let pos = position + offset;
					pos = (pos + children.length) % children.length;

					children[pos].style.transition = "none";
					children[pos].style.transform = `translateX(${ - pos * 280 + offset * 280 }px)`;
				}
				document.removeEventListener("mousemove", move);
				document.removeEventListener("mouseup", up);
			}

			document.addEventListener("mousemove", move);
			document.addEventListener("mouseup", up);


		});

		

		// let currentIndex = 0;
		// setInterval(() => {
		// 	let children = this.root.children;

		// 	let nextIndex = (currentIndex + 1) % children.length;

		// 	let current = children[currentIndex];
		// 	let next = children[nextIndex];

		// 	next.style.transition = "none";
		// 	next.style.transform = `translateX(${100 - nextIndex * 100}%)`;

		// 	setTimeout(() => {
		// 		next.style.transition = "";
		// 		current.style.transform = `translateX(${-100 - currentIndex * 100}%)`;
		// 		next.style.transform = `translateX(${- nextIndex * 100}%)`;

		// 		currentIndex = nextIndex;
		// 	}, 16);

		// }, 3000);


		return this.root;
	}
	mountTo(parent) {
		parent.appendChild(this.render());
	}
}

let d = [
	"https://bkimg.cdn.bcebos.com/pic/dcc451da81cb39db8be2c0d6db160924ab18300b?x-bce-process=image/resize,m_lfit,w_220,h_220,limit_1",
	"https://bkimg.cdn.bcebos.com/pic/6159252dd42a283482b9918b50b5c9ea15cebf17?x-bce-process=image/resize,m_lfit,w_220,h_220,limit_1",
	"https://bkimg.cdn.bcebos.com/pic/91ef76c6a7efce1b6d306f4aa451f3deb48f6513?x-bce-process=image/resize,m_lfit,w_220,h_220,limit_1",
	"https://bkimg.cdn.bcebos.com/pic/caef76094b36acaff789317c77d98d1000e99cc1?x-bce-process=image/resize,m_lfit,w_220,h_220,limit_1"
];

let a = <Carousel src={d}/>

a.mountTo(document.body);