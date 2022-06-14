import { useState, useEffect } from 'react';

import { createMarkup } from '../../lib/utils';
import { TopicType, ArticleType, TypeType, ThemeType } from '../../lib/types';
import { Header, Article } from '../../components';
import * as S from './topic.view.styles';
			
export type TopicViewProps = {
  topic: TopicType;
  articles: ArticleType[];
  type: TypeType;
  theme: ThemeType;
}

export const TopicView = (props: TopicViewProps) => {
	const { topic, theme, articles, type } = { ...props };
  const [ isExpanded, setIsExpanded ] = useState<boolean>(false);
  const [ description, setDescription ] = useState<ArticleType['description'] | any>(undefined);

  const toggleExpanded = () => {
    setIsExpanded(!isExpanded);
  }

  useEffect(() => {
    if (topic.htmlDescription.length > 1500 && !isExpanded) {
      setDescription(createMarkup(`${topic.htmlDescription.slice(0,1500)}...`))
    } else {
      setDescription(createMarkup(topic.htmlDescription))
    }
  }, [topic])
  
  return (
    <>
      <Header
        align={'left'}
        theme={theme}
        animated={false}
        className={'pt-128 pb-64 container-lg px-24'}
        title={topic.name}
        topic={topic.name}
      />
      <S.Grid className={'container-lg layout-column'}>
        {topic.htmlDescription && topic.htmlDescription.length &&
          <section className="px-8 pb-64">
            <S.Description theme={theme} className={'text-primary-500 blocktext text-left'}>
              <div dangerouslySetInnerHTML={description}></div>
              { topic.htmlDescription.length > 1500 &&
                <>
                  {' '}
                  <a onClick={() => toggleExpanded()} aria-label={'Description expand'} className={'cursor-pointer underline'}>
                    { isExpanded
                      ? <span>Show less</span>
                      : <span>Read more</span>
                    }
                  </a>
                </>
              }
            </S.Description>
          </section>
        }
        { articles && articles.length > 0
          ? <div className={'layout-row layout-wrap layout-align-center-center mb-128'}>
              { articles.map((article: ArticleType, index: number) => (
                  <div key={article.id} className={'fade-in-bottom speed-5 cascade p-8 width-100 layout-row layout-align-center-center flex-33 flex-xs-100 flex-sm-50'}>
                    <Article theme={theme} index={index} article={article} topic={topic} type={type}/>
                  </div>
              ))}
            </div>
          : <>
              <div className={'fade-in-bottom speed-9 layout-align-center-center layout-column text-center pt-128 px-32'}>
                <p className={'bold'}>No articles yet.</p>
                <p className={'small'}>We are currently working on collecting the best items for {topic.name}.</p>
              </div>
              <S.Placeholder className={'layout-row layout-wrap layout-align-center-center hide-xs mb-128'}>
                {Array.from(Array(3), (number: number, index: number) => (
                  <div key={index} className={'fade-in-bottom speed-5 cascade p-8 width-100 layout-row layout-align-center-center flex-33 flex-xs-100 flex-sm-50'}>
                    <S.ArticleShape className={'rounded-xl flex'}/>
                  </div>
                ))}
              </S.Placeholder>
            </>
        }
      </S.Grid>
    </>
  )
}