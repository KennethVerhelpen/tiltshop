import { MovieTwoTone, TvTwoTone, SportsEsportsTwoTone }from "@material-ui/icons";

const media = [
	{
		type: "All"
	},{
		type: "Movies",
		icon: <MovieTwoTone style={{ fontSize: 16 }}/>,
		items: [
			{
				id: 1,
				name: "Stranger Things",
				imgSrc: "/images/vhs/stranger-things.jpg",
				imgAlt: "Stranger Things",
			},{
				id: 2,
				name: "Back to the Future",
				imgSrc: "/images/vhs/back-to-the-future.jpg",
				imgAlt: "Back to the Future",
			},{
				id: 3,
				name: "Batman",
				imgSrc: "/images/vhs/batman.jpg",
				imgAlt: "Batman",
			},{
				id: 4,
				name: "The Lord of the Rings",
				imgSrc: "/images/vhs/lord-of-the-rings.jpg",
				imgAlt: "The Lord of the Rings",
			},{
				id: 5,
				name: "Star Wars",
				imgSrc: "/images/vhs/star-wars.jpg",
				imgAlt: "Star Wars",
			},{
				id: 6,
				name: "Alien",
				imgSrc: "/images/vhs/alien.jpg",
				imgAlt: "Alien",
			},{
				id: 7,
				name: "Harry Potter",
				imgSrc: "/images/vhs/harry-potter.jpg",
				imgAlt: "Harry Potter",
			}, {
				id: 8,
				name: "Iron Man",
				imgSrc: "/images/vhs/iron-man.jpg",
				imgAlt: "Iron Man",
			}
		]
	},{
		type: "Tv Shows",
		icon: <TvTwoTone style={{ fontSize: 16 }}/>,
		items: [
			{
				id: 1,
				name: "Stranger Things",
				imgSrc: "/images/vhs/stranger-things.jpg",
				imgAlt: "Stranger Things",
			},{
				id: 2,
				name: "Back to the Future",
				imgSrc: "/images/vhs/back-to-the-future.jpg",
				imgAlt: "Back to the Future",
			}
		]
	},{
		type: "Video Games",
		icon: <SportsEsportsTwoTone style={{ fontSize: 16 }}/>,
		items: [
			{
				id: 1,
				name: "Stranger Things",
				imgSrc: "/images/vhs/stranger-things.jpg",
				imgAlt: "Stranger Things",
			},{
				id: 2,
				name: "Back to the Future",
				imgSrc: "/images/vhs/back-to-the-future.jpg",
				imgAlt: "Back to the Future",
			}
		]
	}
];

export default media;
