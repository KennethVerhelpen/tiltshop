import { useState, useEffect, ReactNode } from 'react';
import clsx from 'clsx';

import { ThemeType } from '../../lib/types';
import { createMarkup } from '../../lib/utils';
import { Section, DefaultTitle, CustomTitle } from './header.styles';

export type HeaderProps = {
  className?: string;
  title?: string;
  category?: string;
  medium?: string;
  subtitle?: string | ReactNode;
  rotation?: boolean;
  rotatingTexts?: string[];
  theme?: ThemeType;
}

const defaultProps = {
  rotation: false,
	rotatingTexts: [ 'cinema lovers', 'tv show addicts', 'passionate gamers' ],
}


export type SubheadingProps = {
   theme: ThemeType,
   text: string | ReactNode;
}

export const Subheading = (props: SubheadingProps) => {
  const { theme, text } = { ...props};
  
  return (
    <h2
      className={clsx({'text-secondary-500' : theme === 'dark'}, 'h6 fade-in-bottom speed-5 container-sm lh-2')}
      dangerouslySetInnerHTML={createMarkup(text)}
    />
  )
}

export const Header = (props: HeaderProps) => {
  const { className, theme, title, category, medium, subtitle, rotatingTexts, rotation, ...restProps } = {...defaultProps, ...props};
  const [ visibleText, setVisibleText ] = useState(0);

  const handleRotatingTextChange = () => {
		if ((visibleText + 1) === rotatingTexts.length) {
			setVisibleText(0)
		} else {
			setVisibleText(visibleText + 1)
		}
	};

  if (rotation) {
    useEffect(() => {
      const interval = setInterval(() => {
        handleRotatingTextChange()
      }, 1500);
      return () => clearInterval(interval);
    });
  }

  return (
    <Section className={clsx(className, 'pt-xs-128 pb-xs-32 text-center layout-column layout-align-center-center')} {...restProps}>
      <div className={'pt-32 container-lg layout-column layout-align-center-center flex'}>
        { title
          ? <CustomTitle className={clsx({'text-secondary-100' : theme === 'dark'}, 'scale-in speed-10 mt-16 mb-16 strong')}>{title}</CustomTitle>
          : <>
              <DefaultTitle className={clsx({'text-secondary-100' : theme === 'dark'}, 'scale-in speed-10 hide-xs mt-16 mb-16 strong')}> 
                <span>The best items for</span><br/>
                  { category ?
                    <span>{category} lovers</span>
                  :
                  <span>
                    {rotatingTexts.map((text, index) => (
                      <span className={clsx({ 'hide': visibleText != index })} key={index}>{text}.</span>
                    ))}
                  </span>
                }
              </DefaultTitle>
              <DefaultTitle className={clsx({'text-secondary-100' : theme === 'dark'}, 'scale-in speed-10 mt-16 mb-32 strong hide show-xs')}>The best items for cinema, tv & video game lovers.</DefaultTitle>
            </>
        }
        { medium &&
          <Subheading
            theme={theme}
            text={`The best items for <b>{medium} fans</b> in <b>${new Date().getFullYear()}.`}
          />
        }
        { subtitle &&
          <Subheading
            theme={theme}
            text={subtitle}
          />
        }
        { (!medium && !subtitle) &&
          <Subheading
            theme={theme}
            text={'A list of great products hand-picked just for you.'}
          />
        }
      </div>
    </Section>
  );
}