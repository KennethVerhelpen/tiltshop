import { TopicType, TypeType } from '../../lib/types';
import { Topic, Header } from '../../components';
import * as S from './type.view.styles';
			
export type TypeViewProps = {
	topics: TopicType[];
	type: TypeType;
}

export const TypeView = (props: TypeViewProps) => {
	const { topics, type } = { ...props };
  
  return (
		<div className={'bg-neutral-900 width-100'}>
			<Header theme={'dark'} className={'pt-128 pb-64'} category={type.name}/>
			<main className={'container-lg pb-128 layout-column'}>
				<div className={'layout-row layout-wrap layout-align-center-center'}>
					{topics.map((topic, index) => {
						return (
							<div key={topic.id} className={'fade-in-bottom speed-5 cascade p-8 width-100 layout-row layout-align-center-center flex-33 flex-xs-100 flex-sm-50'}>
								<Topic className={'flex layout-column layout-align-center-center shadow-5'} topic={topic} type={type} index={index} />
							</div>
						)
					})}
				</div>
			</main>
		</div>
  )
}