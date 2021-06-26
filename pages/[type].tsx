import prisma from "../lib/prisma";
import { Page, Topic, Header } from "../components/index";
import { TypeType, TopicType } from "../lib/types/types"
import styled from "@emotion/styled";

const Grid = styled.main`
	@media only screen and (max-width: 959px) and (max-width: 959px) {
		max-width: 44rem; 
	}
`

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
			<Header category={type.name}/>
			<Grid className="container-lg p-0 layout-column">
				<div className="layout-row layout-wrap layout-align-center-center">
					{topics.map((topic, index) => {
						return (
							<div key={topic.id} className="fade-in-bottom speed-5 cascade p-16 width-100 layout-row layout-align-center-center flex-33 flex-xs-100 flex-sm-50">
								<Topic className="flex layout-column layout-align-center-center" topic={topic} type={type} index={index} />
							</div>
						)
					})}
				</div>
			</Grid>
		</Page>
	);
};

export async function getStaticPaths() {
	const types = await prisma.type.findMany();
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

	return { 
		props: {
			types: types,
			type: currentType,
			topics: currentTopics,
		}
	}
}

export default Type
