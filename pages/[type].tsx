import prisma from '../lib/prisma';
import { TypeType, TopicType, ThemeType } from '../lib/types'
import { Page } from '../components/index';
import { TypeView } from '../views/type/type.view';
import { ThemeContext } from './_app';
import { useContext } from 'react';

type Props = {
	types: TypeType[];
	topics: TopicType[];
	type: TypeType;
}

const Type = (props: Props) => {
	const { types, type, topics } = { ...props };
	const { theme } = useContext(ThemeContext);

	return (
		<Page
			title={`Best items for ${type.name} lovers`}
			description={`Discover the best hand-picked items of ${new Date().getFullYear()} sorted out just for ${type.name} lovers.`}
			activePage={type.slug}
			types={types}
			theme={theme}
		>
			<TypeView theme={theme} topics={topics} type={type}/>
		</Page>
	);
};

export async function getStaticPaths() {
	const types = await prisma.type.findMany();
	await prisma.$disconnect();

	await prisma.$disconnect();

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
	await prisma.$disconnect();

	await prisma.$disconnect();

	return { 
		props: {
			types: types,
			type: currentType,
			topics: currentTopics,
		}
	}
}

export default Type
