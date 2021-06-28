import { Page } from '../../components';
import markdownToHtml from '../../lib/markdownToHtml'
import { getPostBySlug, getAllPosts } from '../../lib/posts';
import { PostType } from '../../lib/types/types';
import Image from "next/image";

type Props = {
	post: PostType;
}

export const Post = (props: Props) => {
  const { post } = { ...props };

	return (
		<Page
				menu={false}
				image={post.ogImage.url}
				title={`${post.title} - Tiltshop`}
				description={post.date}
				history={`/blog`}
			>
			<main className="container-lg">
				<div className="layout-column">
					<Image
						quality="100"
						width={'100%'}
						height={'300px'}
						objectFit="cover"
						objectPosition="center"
						priority={true}
						loading={"eager"}
						alt={post.title}
						src={post.coverImage}
						className="rounded-lg shadow-2 overflow-hidden"
					/>
					<h1 className="bold mb-8">{post.title}</h1>
					<span className="mb-16">{post.date}</span>
					<span className="mb-64">{post.author.name}</span>
					<div dangerouslySetInnerHTML={{__html: post.content}}/>
				</div>
			</main>
		</Page>
	);
};

export async function getStaticProps({
	params: { post: postSlug}
}) {

	const currentPost = getPostBySlug(postSlug, [
		'title',
		'date',
		'slug',
		'author',
		'content',
		'ogImage',
		'coverImage'
	]) as PostType;

	currentPost['content'] = await markdownToHtml(currentPost.content || '');
	currentPost['date'] = new Intl.DateTimeFormat("en-US", {
		year: "numeric",
		month: "long",
		day: "2-digit"
	}).format(new Date(currentPost.date));
	currentPost['time'] = Math.round(currentPost.content.length/200);

	return {
		props: {
			post: currentPost,
		},
	}
}

export async function getStaticPaths() {
	const posts = getAllPosts(['slug']);
	
  const paths = posts.map((post: PostType) => {
    return {	
      params: {
        post: post.slug,
      }
	  }
  })

  return {
		paths,
		fallback: false,
  }
};


export default Post;