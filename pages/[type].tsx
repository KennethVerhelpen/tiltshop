import prisma from '../lib/prisma';
import { TypeType, TopicType } from '../lib/types'
import { Page } from '../components/index';
import { TypeView } from '../views/type/type.view';

type Props = {
	types: TypeType[];
	topics: TopicType[];
	type: TypeType;
}

const Type = (props: Props) => {
	const { types, type, topics } = { ...props };

	return (
		<Page 
			title={`Best items for ${type.name} lovers`}
			description={`Discover the best hand-picked items of ${new Date().getFullYear()} sorted out just for ${type.name} lovers.`}
			activePage={type.slug}
			types={types}
		>
			<TypeView topics={topics} type={type}/>
		</Page>
	);
};

export async function getStaticPaths() {
	const types = await prisma.type.findMany();

	const paths = types.map(type => ({
		params: {
			type: type.slug.toString(),
		}
	}));

	return {
		paths,
		fallback: false
	}
};

export async function getStaticProps({
	params: { type: typeSlug }
}) {

	const types = await prisma.type.findMany();
	const currentType = await prisma.type.findUnique({
		where: {
			slug: typeSlug
		}
	})
	const currentTopics = await prisma.topic.findMany({
		where: {
			typeId: currentType.id
		}
	});

	return { 
		props: {
			types: types,
			type: currentType,
			topics: currentTopics,
		}
	}
}

export default Type
