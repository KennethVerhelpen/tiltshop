import { Page, Header } from "../components";
import { types, topics, articles } from "../lib/data";
import styled from "@emotion/styled";

const Grid = styled.main`
	@media only screen and (max-width: 959px) and (max-width: 959px) {
		max-width: 44rem; 
	}
`

const Blog = () => {

	return (
		<Page
			activePage={"browse"}
			menu={false}
		>
			<Header
				title="Recent reviews"
				subtitle="Get access to our reviews about the latest products related to cinema, series and video games"
			/>
		</Page>
	);
};

export default Blog
