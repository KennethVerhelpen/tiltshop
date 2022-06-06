import clsx from 'clsx';
import { ImgHTMLAttributes, useEffect, useState } from 'react';

import { ThemeType } from '../../lib/types';

export type LogoProps = {
  width?: number;
  theme?: ThemeType;
  className?: string;
} & ImgHTMLAttributes<HTMLImageElement>;

const logoDark = '/images/logos/tilt-dark.svg';
const logoLight = '/images/logos/tilt-light.svg';

export const Logo = (props: LogoProps) => {
  const { className, width, theme, ...restProps } =props;
  const [height, setHeight] = useState<number | string | null>(null);
  const [logoSrc, setLogoSrc ] = useState<string>(logoLight)

  const getLogo = (theme: ThemeType) => {
    switch (theme) {
      case 'light':
        return logoDark;
      default:
        return logoLight;
    }
  }

  useEffect(() => {
    if (width) {
      setHeight(width / 1.5);
    } else {
      setHeight('auto');
    }
  }, [width]);

  useEffect(() => {
    setLogoSrc(getLogo(theme));
  }, [theme])

  return (
    <span className={clsx(className, theme === 'light' ? 'text-primary-900' : 'text-neutral-100', 'serif strong')}>tilt.</span>
    // <img {...restProps} src={logoSrc} width={width} height={height} alt="Tilt logo"/>
  );
}