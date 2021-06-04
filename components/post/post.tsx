import React from "react";
import clsx from "clsx";
import { PostType} from "../../lib/types/types";
import { Shape, ImageWrapper } from "./post.styles";
import Link from "next/link";
import Image from "next/image";
import { FavoriteTwoTone, RemoveRedEyeTwoTone } from "@material-ui/icons";

type PostProps = {
	className?: string;
	post: PostType;
}


export const Post: React.FC<PostProps> = (props) => {
	const { className, post } = props;

	return (
			<Link href={`blog/${post.slug}`}>
				<Shape className={clsx(className, "layout-column rounded-xl border shadow-2 cursor-pointer")}>
					<header className="p-8">
						<ImageWrapper className="relative height-100 width-100">
							<Image
								className="rounded-lg"
								src="/images/backgrounds/mobile-background.jpg"
								layout="fill"
								quality="100"
								objectFit="cover"
								objectPosition="center"
								priority={true}
								loading={"eager"}
								alt={"image"}
							/>
						</ImageWrapper>
					</header>
					<main className="p-32">
						<h3 className="strong h2 mb-8">{post.title}</h3>
						<span className="small layout-row mb-32 text-secondary-500">
							<span>{post.time} min. read</span>
							&nbsp;|&nbsp;
							<span>{post.date}</span> 
						</span>
						<p className="lh-2">{`${post.intro.slice(0,160)}...`}</p>
						<a className="underline">Read more</a>
					</main>
					<footer className="px-32 pb-16 layout-row layout-align-space-between-center">
						<div className="layout-row layout-align-center-center">
							<FavoriteTwoTone style={{ fontSize: 14 }} className="mr-4"/>
							<span className="small">{post.views}</span>
						</div>
						<div className="layout-row layout-align-center-center">
							<RemoveRedEyeTwoTone style={{ fontSize: 14 }} className="mr-4"/>
							<span className="small">{post.likes}</span>
						</div>
					</footer>
				</Shape>
			</Link>
	);
}