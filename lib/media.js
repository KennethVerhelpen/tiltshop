import { MovieTwoTone, TvTwoTone, SportsEsportsTwoTone }from "@material-ui/icons";

const media = [
	{
		id: 1,
		type: "Movies",
		slug: "movies",
		// icon: <MovieTwoTone style={{ fontSize: 16 }}/>,
		items: [
			{
				id: 1,
				slug: "stranger-things",
				name: "Stranger Things",
				imgSrc: "/images/vhs/stranger-things.jpg",
				imgAlt: "Stranger Things",
			},{
				id: 2,
				slug: "back-to-the-future",
				name: "Back to the Future",
				imgSrc: "/images/vhs/back-to-the-future.jpg",
				imgAlt: "Back to the Future",
			},{
				id: 3,
				slug: "batman",
				name: "Batman",
				imgSrc: "/images/vhs/batman.jpg",
				imgAlt: "Batman",
			},{
				id: 4,
				slug: "the-lord-of-the-rings",
				name: "The Lord of the Rings",
				imgSrc: "/images/vhs/lord-of-the-rings.jpg",
				imgAlt: "The Lord of the Rings",
			},{
				id: 5,
				slug: "star-wars",
				name: "Star Wars",
				imgSrc: "/images/vhs/star-wars.jpg",
				imgAlt: "Star Wars",
			},{
				id: 6,
				slug: "Alien",
				name: "Alien",
				imgSrc: "/images/vhs/alien.jpg",
				imgAlt: "Alien",
			},{
				id: 7,
				slug: "harry-potter",
				name: "Harry Potter",
				imgSrc: "/images/vhs/harry-potter.jpg",
				imgAlt: "Harry Potter",
			}, {
				id: 8,
				slug: "iron-man",
				name: "Iron Man",
				imgSrc: "/images/vhs/iron-man.jpg",
				imgAlt: "Iron Man",
			},{
				id: 9,
				slug: "hunger-games",
				name: "Hunger Games",
				imgSrc: "/images/vhs/hunger-games.jpg",
				imgAlt: "Hunger Games",
			},{
				id: 10,
				slug: "ghostbusters",
				name: "Ghostbusters",
				imgSrc: "/images/vhs/ghostbusters.jpg",
				imgAlt: "Ghostbusters",
			},{
				id: 11,
				slug: "drive",
				name: "Drive",
				imgSrc: "/images/vhs/drive.jpg",
				imgAlt: "Drive",
			}
		]
	},{
		id: 2,
		type: "Tv Shows",
		slug: "tv-shows",
		// icon: <TvTwoTone style={{ fontSize: 16 }}/>,
		items: [
			{
				id: 1,
				slug: "stranger-things",
				name: "Stranger Things",
				imgSrc: "/images/vhs/stranger-things.jpg",
				imgAlt: "Stranger Things",
			},{
				id: 2,
				slug: "back-to-the-future",
				name: "Back to the Future",
				imgSrc: "/images/vhs/back-to-the-future.jpg",
				imgAlt: "Back to the Future",
			}
		]
	},{
		id: 3,
		type: "Video Games",
		slug: "video-games",
		// icon: <SportsEsportsTwoTone style={{ fontSize: 16 }}/>,
		items: [
			{
				id: 1,
				slug: "stranger-things",
				name: "Stranger Things",
				imgSrc: "/images/vhs/stranger-things.jpg",
				imgAlt: "Stranger Things",
			},{
				id: 2,
				slug: "stranger-things",
				name: "Stranger Things",
				imgSrc: "/images/vhs/back-to-the-future.jpg",
				imgAlt: "Back to the Future",
			}
		]
	}
];

export default media;
