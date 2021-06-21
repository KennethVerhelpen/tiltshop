import { Page } from "../../components/index";
import { posts } from "../../lib/seeds";
import { PostType } from "../../lib/types/types";

type Props = {
  post: PostType;
}

export const Post = (props: Props) => {
  const { post } = { ...props };

	return (
		<>
			<Page
				menu={false}
				title={`${post.title} - TiltShop`}
				description={post.intro}
				history={`/blog`}
			>
				<main className="container-lg layout-column">
					<span>{post.id}</span>
					<span>{post.slug}</span>
					<span>{post.title}</span>
					<span>{post.intro}</span>
					<span>{post.views}</span>
					<span>{post.likes}</span>
					<span>{post.type}</span>
					<span>{post.topic}</span>
					<span>{post.date}</span>
					<span>{post.time}</span>
				</main>
			</Page>
		</>
	);
};

export async function getStaticPaths() {
  const paths = posts.map(post => {

    return {	
      params: {
        post: post.slug.toString(),
      }
	  }
  })

  return {
		paths,
		fallback: false,
  }
};

export async function getStaticProps({
  params: {
		post: postSlug,
	}}) {

	const currentPost = posts.find(post => post.slug === postSlug);

  return {
    props: {
			post: currentPost,
    }
  }
}

export default Post;