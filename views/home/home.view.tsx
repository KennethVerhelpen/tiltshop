import { ReactNode } from 'react';

import { TopicType } from '../../lib/types';
import { Header, SearchContainer, Topic } from '../../components';
			
export type HomeViewProps = {
  searchClient: ReactNode;
  indexName: string;
} 

type HitComponentProps = {
  hit: TopicType;
};

const HitComponent = (props: HitComponentProps) => {
	const { hit } = { ...props };

  return (
		<Topic key={hit.id} className={'fade-in-bottom speed-5 cascade flex layout-column layout-align-center-center'} topic={hit}/>
  );
}

export const HomeView = (props: HomeViewProps) => {
	const { searchClient, indexName  } = { ...props };
  
  return (
    <>
      <Header	theme={'dark'} rotation={true}/>
			<SearchContainer
				indexName={indexName}
				searchClient={searchClient}
				hitComponent={HitComponent}
				hitsPerPage={51}
				filters={false}
			/>
    </>
  )
}