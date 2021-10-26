import { ReactNode } from 'react';

import { TopicType } from '../../lib/types';
import { Header, Topic } from '../../components';

import * as S from './new-home.view.styles';

export type NewHomeViewProps = {
  topics: TopicType[];
}

export const NewHomeView = (props: NewHomeViewProps) => {
	const { topics  } = { ...props };

  return (
    <>
      {/* <Header	theme={'dark'} rotation={true}/> */}
			<S.Fading className={'p-0 layout-column layout-align-start-center overflow-hidden'}>
				<div className={'layout-row layout-wrap layout-align-center-center'}>
					{topics.map((topic, index) => {
						return (
							<div key={topic.id} className={'fade-in-bottom speed-5 cascade p-8 layout-row layout-align-center-center'}>
								<Topic className={'flex layout-column layout-align-center-center'} topic={topic} index={index} />
							</div>
						)
					})}
				</div>
			</S.Fading>
    </>
  )
}