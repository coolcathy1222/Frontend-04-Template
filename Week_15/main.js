import {createElement, Component} from "./framework.js";
import {Carousel} from "./Carousel.js";
import {Button} from "./Button.js";
import {List} from "./List.js";
// import {Timeline, Animation} from "./animation.js";

let d = [
	{
		img: "https://bkimg.cdn.bcebos.com/pic/dcc451da81cb39db8be2c0d6db160924ab18300b?x-bce-process=image/resize,m_lfit,w_220,h_220,limit_1",
		url: "https://time.geekbang.org",
		title: "1"
	},
	{
		img: "https://bkimg.cdn.bcebos.com/pic/6159252dd42a283482b9918b50b5c9ea15cebf17?x-bce-process=image/resize,m_lfit,w_220,h_220,limit_1",
		url: "https://time.geekbang.org",
		title: "2"
	},
	{
		img: "https://bkimg.cdn.bcebos.com/pic/91ef76c6a7efce1b6d306f4aa451f3deb48f6513?x-bce-process=image/resize,m_lfit,w_220,h_220,limit_1",
		url: "https://time.geekbang.org",
		title: "3"
	},
	{
		img: "https://bkimg.cdn.bcebos.com/pic/caef76094b36acaff789317c77d98d1000e99cc1?x-bce-process=image/resize,m_lfit,w_220,h_220,limit_1",
		url: "https://time.geekbang.org",
		title: "4"
	}
];

// let a = <Carousel src={d} 
// 	onChange={event => console.log(event.detail.position)}
// 	onClick={event => window.location.href = event.detail.data.url}
// />


let a = <List data={d}>
{
	(record) =>
		<div>
			<img src={record.img} />
			<a href={record.url}>{record.title}</a>
		</div>
}
</List>
a.mountTo(document.body);
