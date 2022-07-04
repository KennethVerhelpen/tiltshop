import { ArrowForwardRounded, FavoriteBorderOutlined } from '@mui/icons-material';

import { ArticleType, ThemeType, TopicType, TypeType } from '../../lib/types';
import { Article  } from '../../components';
import * as S from './article.styles';
import clsx from 'clsx';
			
export type ArticleViewProps = {
  article: ArticleType;
  articles: ArticleType[];
  topic: TopicType;
  type: TypeType;
  theme: ThemeType;
}

export const ArticleView = (props: ArticleViewProps) => {
	const { article, articles, topic, type, theme } = { ...props };

  const updateLikes = async (article: ArticleType) => {
    const response = await fetch('/api/likes', {
      method : 'POST',
      body: JSON.stringify(article)
    });
    if (!response.ok) {
      throw new Error(response.statusText);
    }
    return await response.json();
	};

  return (
    <main className={'container-lg'}>
      <div className={'layout-column layout-gt-xs-row pt-gt-sm-128 pt-32 pb-64'}>
        <section className={'flex-order-1 flex-order-gt-xs-0 flex p-16 p-gt-sm-32'}>
          <header className={'layout-column layout-align-start-start'}>
            <S.Title className={clsx({'text-primary-100' : theme === 'dark'}, 'strong mb-32')}>{article.title}</S.Title>
            <div className={'layout-row mb-32'}>
              <h2 className={clsx(theme === 'dark' ? 'bg-primary-700 text-primary-300' : 'bg-primary-300 text-primary-600', 'display-inline-block small text-capitalize p-8 rounded-sm mr-8')}>{topic.name}</h2>
              <h3 className={clsx(theme === 'dark' ? 'bg-primary-700 text-primary-300' : 'bg-primary-300 text-primary-600', 'display-inline-block small text-capitalize p-8 rounded-sm')}>{type.name}</h3>
              <div className={clsx(theme === 'dark' ? 'bg-primary-700 text-primary-300' : 'bg-primary-300 text-primary-600', 'display-inline-block small text-capitalize p-8 rounded-sm')}>
                <span>Likes: {article.likes}</span>
                <button className="btn-reset" onClick={() => updateLikes(article)}>
                  <FavoriteBorderOutlined style={{ fontSize: 14}}/>
                </button>
              </div>
            </div>
            <p className={clsx(theme === 'dark' ? ' text-primary-400' : 'text-primary-500', 'lh-3 h6 mb-32')}>{article.description}</p>
            {article.details && article.details.length > 0 ? (
              <>
                <h4 className={clsx(theme === 'dark' ? 'text-primary-300' : 'text-primary-700', 'bold h6 mb-16')}>Product details</h4>
                <ul className={clsx(theme === 'dark' ? ' text-primary-400' : 'text-primary-500', 'lh-3 h6')}>
                  {article.details.split(';').map(detail => (
                    <li key={detail}>{detail}</li>
                  ))}
                </ul>
              </>
            ) : null}
          </header>
        </section>
        <section className={'flex-order-0 flex-order-gt-xs-1 flex-none p-16 p-gt-sm-32 layout-column layout-align-start-stretch layout-align-gt-xs-start-start'}>
          <div className={'layout-align-start-stretch layout-column'}>
            <Article className={'mb-32'} theme={theme} disabled={true} article={article} topic={topic} type={type} />
            <a
              href={article.trackingUrl}
              target={'_blank'}
              rel={'sponsored'}
              className={clsx(theme === 'dark' ? 'bg-primary-100 text-primary-900' : 'bg-primary-900 text-primary-100', 'text-left border px-16 py-16 rounded-lg layout-row layout-align-start-center')}
            >
              <span className={'flex'}>See on <b>Amazon</b></span>
              <ArrowForwardRounded className={clsx(theme === 'dark' ? 'text-primary-500' : 'text-primary-500')} style={{ fontSize: 20 }}/>
            </a>
          </div>
        </section>
      </div>

      <footer className={clsx(theme === 'dark' ? 'border-primary-800' : 'border-primary-300', 'pt-64 pb-128 layout-column layout-align-center-center border-top')}>
        <h4 className={clsx(theme === 'dark' ? 'text-primary-300' : 'text-primary-900', 'p-32 bold text-center h3')}>Other cool products that you may like</h4>
        <main className={'layout-row layout-wrap'}>
          {articles.slice(0,3).map(article => (
            <div key={article.id} className={'p-16 width-100 layout-row layout-align-center-center flex-33 flex-xs-100 flex-sm-50'}>
              <Article theme={theme} article={article} topic={topic} type={type}/>
            </div>
          ))}
        </main>
      </footer>
    </main>
  )
}