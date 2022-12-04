import prisma from '../lib/prisma';
import { TypeType, TopicType } from '../lib/types'
import { Page } from '../components/index';
import { ThemeContext } from './_app';
import { useContext } from 'react';
import { ThreeView } from '../views/three/three.view';

type Props = {
	topics: TopicType[];
	type: TypeType;
}

const Type = (props: Props) => {
	const { type, topics } = { ...props };
	const { theme } = useContext(ThemeContext);

	return (
    <ThreeView theme={theme} topics={topics} type={type}/>
	);
};

export async function getStaticProps() {
	const moviesType = await prisma.type.findUnique({
		where: {
			slug: 'movies'
		}
	})
	const moviesTopics = await prisma.topic.findMany({
		where: {
			typeId: moviesType.id
		}
	});
	await prisma.$disconnect();

	return { 
		props: {
      type: moviesType,
			topics: moviesTopics,
		}
	}
}

export default Type
