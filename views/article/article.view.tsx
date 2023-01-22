import { ArrowForwardRounded, ThumbUpAltTwoTone } from '@mui/icons-material';

import { ArticleType, ThemeType, TopicType, TypeType } from '../../lib/types';
import { Article  } from '../../components';
import * as S from './article.styles';
import clsx from 'clsx';
import { createRef, useEffect, useState } from 'react';

export type ArticleViewProps = {
  article: ArticleType;
  articles: ArticleType[];
  topic: TopicType;
  type: TypeType;
  theme: ThemeType;
}

export const ArticleView = (props: ArticleViewProps) => {
	const { article, articles, topic, type, theme } = { ...props };
  const [likes, setLikes] = useState<number>(article.likes);
  const [charCount, setCharCount] = useState<number>(0);

  const title = createRef<HTMLHeadingElement>();
  const formatter = Intl.NumberFormat('en', { notation: 'compact' });

  useEffect(() => {
    if (title.current) {
      setCharCount(title.current.innerText.length);
    }
  }, [title])

  const updateLikes = async (article: ArticleType) => {
    setLikes(likes + 1);
    try {
      await fetch('/api/likes', {
        method: 'PATCH',
        headers: { 
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(article),
      });
    } catch (error) {
      throw new Error("Something went wrong");
    }
  };

  return (
    <main className={'container-lg'}>
      <div className={'layout-column layout-gt-xs-row pt-gt-sm-128 pt-32 pb-64'}>
        <section className={'flex-order-1 flex-order-gt-xs-0 flex p-16 p-gt-sm-32'}>
          <header className={'layout-column layout-align-start-start'}>
            <S.Title ref={title} className={clsx({'text-primary-100' : theme === 'dark'}, 'text-break-word strong mb-32')} charCount={charCount}>{article.title}</S.Title>
            <div className={'layout-row mb-32'}>
              <h2 className={clsx(theme === 'dark' ? 'bg-primary-700 text-primary-300' : 'bg-primary-300 text-primary-600', 'layout-row layout-align-center-center small text-capitalize p-8 rounded-sm mr-8')}>{topic.name}</h2>
              <h3 className={clsx(theme === 'dark' ? 'bg-primary-700 text-primary-300' : 'bg-primary-300 text-primary-600', 'layout-row layout-align-center-center small text-capitalize p-8 rounded-sm mr-8')}>{type.name}</h3>
              <button
                className={clsx(
                  theme === 'dark' ? 'bg-primary-700 text-primary-300' : 'bg-primary-300 text-primary-600',
                  'btn-reset layout-row layout-align-center-center small p-8 rounded-sm'
                )}
                onClick={() => {updateLikes(article)}}
              >
                <span className="mr-8"><strong>{formatter.format(likes)}</strong> likes</span>
                <ThumbUpAltTwoTone style={{ fontSize: 14}}/>
              </button>
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
          <div className={'layout-align-start-center layout-column'}>
            <Article className={'mb-32'} theme={theme} disabled={true} article={article} topic={topic} type={type} />
            {/* eslint-disable-next-line react/jsx-no-target-blank */}
            <a
              href={article.trackingUrl}
              target={'_blank'}
              rel={'sponsored'}
              className={clsx(theme === 'dark' ? 'bg-primary-100 text-primary-900' : 'bg-primary-900 text-primary-100', 'text-left border px-16 py-16 rounded-lg layout-row layout-align-start-center width-100')}
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