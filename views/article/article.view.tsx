import { ArrowForwardRounded } from '@material-ui/icons';

import { ArticleType, TopicType, TypeType } from '../../lib/types';
import { Article  } from '../../components';
			
export type ArticleViewProps = {
  article: ArticleType;
  articles: ArticleType[];
  topic: TopicType;
  type: TypeType;
}

export const ArticleView = (props: ArticleViewProps) => {
	const { article, articles, topic, type } = { ...props };
  
  return (
    <main className={'container-lg'}>
      <div className={'layout-column layout-gt-xs-row pt-gt-sm-128 pt-32 pb-128'}>
        <section className={'flex-order-1 flex-order-gt-xs-0 flex p-16 p-gt-sm-32'}>
          <header>
            <h1 className={'strong mb-8'}>{article.title}</h1>
            <h2 className={'h6 mb-16'}>{topic.name}</h2>
            <h3 className={'p text-capitalize mb-32 text-primary-500'}>{type.name}</h3>
            <p className={'lh-3 h6 mb-32'}>{article.description}</p>
            {article.details && article.details.length > 0 ? (
              <>
                <h4 className={'bold h6 mb-16'}>Product details</h4>
                <ul className={'lh-3 h6'}>
                  {article.details.split(';').map(detail => (
                    <li key={detail}>{detail}</li>
                  ))}
                </ul>
              </>
            ) : null}
          </header>
          <main>
            
          </main>
        </section>
        <section className={'flex-order-0 flex-order-gt-xs-1 flex-none p-16 p-gt-sm-32 layout-column layout-align-start-stretch layout-align-gt-xs-start-start'}>
          <div className={'layout-align-start-stretch layout-column'}>
            <Article className={'mb-32'} disabled={true} article={article} topic={topic} type={type} />
            <a
              href={article.trackingUrl}
              target={'_blank'}
              rel={'sponsored'}
              className={'text-left btn btn-outlined btn-md btn-primary layout-row layout-align-start-center'}
            >
              <span className={'flex'}>See on <b>Amazon</b></span>
              <ArrowForwardRounded style={{ fontSize: 20 }}/>
            </a>
          </div>
        </section>
      </div>

      <footer className={'py-64 layout-column layout-align-center-center border-top border-primary-200'}>
        <h4 className={'p-32 bold text-center'}>Other cool articles you may like</h4>
        <main className={'layout-row layout-wrap'}>
          {articles.slice(0,3).map(article => (
            <div key={article.id} className={'fade-in-bottom speed-5 cascade p-16 width-100 layout-row layout-align-center-center flex-33 flex-xs-100 flex-sm-50'}>
              <Article article={article} topic={topic} type={type}/>
            </div>
          ))}
        </main>
      </footer>
    </main>
  )
}