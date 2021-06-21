import { useState, useEffect, ReactNode } from "react";
import clsx from "clsx";

import { Section, DefaultTitle, CustomTitle } from './header.styles';

export type HeaderProps = {
  className?: string;
  title?: string;
  category?: string;
  medium?: string;
  subtitle?: string | ReactNode;
  rotation?: boolean;
  rotatingTexts?: string[];
}

const defaultProps = {
  rotation: false,
	rotatingTexts: [ "cinema lovers", "tv show addicts", "passionate gamers" ],
}

export const Header = (props: HeaderProps) => {
  const { className, title, category, medium, subtitle, rotatingTexts, rotation } = {...defaultProps, ...props};
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
    <Section className={clsx(className, "pt-xs-128 pb-xs-32 text-center layout-column layout-align-center-center")}>
      <div className="pt-32 container-md layout-column layout-align-center-center flex">
        { title ? 
          <CustomTitle className="scale-in speed-10 mt-16 mb-16 strong" >{title}</CustomTitle>
          :
          <>
            <DefaultTitle className="scale-in speed-10 hide-xs mt-16 mb-16 strong"> 
              <span>The best items for</span><br/>
                { category ?
                  <span>{category} lovers</span>
                :
                <span>
                  {rotatingTexts.map((text, index) => (
                    <span className={clsx({ "hide": visibleText != index })} key={index}>{text}.</span>
                  ))}
                </span>
              }
            </DefaultTitle>
            <DefaultTitle className="scale-in speed-10 mt-16 mb-32 strong hide show-xs">The best items for cinema, tv & video game lovers.</DefaultTitle>
          </>
        }
        { medium &&
          <h2 className="h6 fade-in-bottom speed-5 container-sm lh-2">The best items for <b>{medium} fans</b> in <b>{new Date().getFullYear()}</b>.</h2>
        }
        { subtitle &&
          <h2 className="h6 fade-in-bottom speed-5 container-sm lh-2">{subtitle}</h2>
        }
        { !medium && !subtitle &&
          <h2 className="fade-in-bottom speed-5 h6 layout-row layout-column-xs layout-align-center-center container-sm lh-2">A list of great products hand-picked just for you.</h2>
        }
      </div>
    </Section>
  );
}