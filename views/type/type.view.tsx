import { ThemeType, TopicType, TypeType } from '../../lib/types';
import { Topic, Header } from '../../components';
import clsx from 'clsx';
			
export type TypeViewProps = {
	topics: TopicType[];
	type: TypeType;
	theme: ThemeType;
}

export const TypeView = (props: TypeViewProps) => {
	const { topics, type, theme } = { ...props };
  
  return (
		<div className={'width-100'}>
			<Header theme={theme} className={'container-xl pt-128 pb-64'} type={type.name}/>
			<main className={'container-lg pb-128 layout-column'}>
				<div className={'layout-row layout-wrap layout-align-center-center'}>
					{topics.map((topic, index) => {
						return (
							<div key={topic.id} className={'p-8 layout-row layout-align-center-center flex-33 flex-xs-100 flex-sm-50'}>
								<Topic className={'layout-column layout-align-center-center shadow-5 rounded-xl overflow-hidden'} topic={topic} type={type} index={index} />
							</div>
						)
					})}
				</div>
			</main>
		</div>
  )
}