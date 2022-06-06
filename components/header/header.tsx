import { useState, useEffect, ReactNode } from 'react';
import clsx from 'clsx';

import { createMarkup } from '../../lib/utils';
import { ThemeType, TopicType, TypeType } from '../../lib/types';
import { Section, DefaultTitle, CustomTitle } from './header.styles';

export type HeaderProps = {
  className?: string;
  title?: string;
  type?: TypeType['name'];
  topic?: TopicType['name'];
  align?: 'left' | 'center';
  subtitle?: string | ReactNode;
  rotation?: boolean;
  rotatingTexts?: string[];
  theme?: ThemeType;
  animated?: boolean;
}

const defaultProps = {
  rotation: false,
  align: 'center',
  animated: true,
	rotatingTexts: [ 'cinema lovers', 'tv show addicts', 'passionate gamers' ],
}

export type SubheadingProps = {
   theme: ThemeType,
   text: string | ReactNode;
   animated?: boolean;
}

export const Subheading = (props: SubheadingProps) => {
  const { theme, text, animated } = { ...props};
  const [content, setContent] = useState<any>(undefined)

  useEffect(() => {
    setContent(createMarkup(text));
  }, [text])
  
  return (
    <h2
      className={clsx(theme === 'dark' ? 'text-primary-400' : 'text-primary-500', {'scale-in speed-10' : animated }, 'h6 lh-2')}
      dangerouslySetInnerHTML={content}
    />
  )
}

export const Header = (props: HeaderProps) => {
  const { align, className, theme, title, type, topic, subtitle, rotatingTexts, rotation, animated, ...restProps } = { ...defaultProps, ...props };
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
    <Section className={clsx(className, align === 'left' ? 'layout-align-start-start text-left' : 'layout-align-center-center text-center', 'layout-column')} {...restProps}>
      <div className={clsx(align === 'left' ? 'layout-align-start-start' : 'layout-align-center-center', 'layout-column flex')}>
        { title
          ? <CustomTitle className={clsx({'text-primary-100' : theme === 'dark'}, {'scale-in speed-10' : animated }, ' mt-16 mb-16 strong')}>{title}</CustomTitle>
          : <>
              <DefaultTitle className={clsx({'text-primary-100' : theme === 'dark'}, {'scale-in speed-10' : animated }, 'hide-xs mt-16 mb-16 strong')}> 
                <span>The best items for</span><br/>
                  { type ?
                    <span>{type} lovers</span>
                  :
                  <span>
                    {rotatingTexts.map((text, index) => (
                      <span className={clsx({ 'hide': visibleText != index })} key={index}>{text}.</span>
                    ))}
                  </span>
                }
              </DefaultTitle>
              <DefaultTitle className={clsx({'text-primary-100' : theme === 'dark'}, {'scale-in speed-10' : animated }, 'mt-16 mb-32 strong hide show-xs')}>The best items for cinema, tv & video game lovers.</DefaultTitle>
            </>
        }
        { topic &&
          <Subheading
            theme={theme}
            animated={animated}
            text={`The best items for <b>${topic} fans</b> in <b>${new Date().getFullYear()}.`}
          />
        }
        { subtitle &&
          <Subheading
            theme={theme}
            animated={animated}
            text={subtitle}
          />
        }
        { (!topic && !subtitle) &&
          <Subheading
            theme={theme}
            animated={animated}
            text={'A list of great products hand-picked just for you.'}
          />
        }
      </div>
    </Section>
  );
}