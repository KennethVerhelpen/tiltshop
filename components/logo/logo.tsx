import { ImgHTMLAttributes, useEffect, useState } from 'react';

import { ThemeType } from '../../lib/types';

export type LogoProps = {
  width?: number;
  theme?: ThemeType;
} & ImgHTMLAttributes<HTMLImageElement>;

const logoDark = '/images/logos/tilt-dark.svg';
const logoLight = '/images/logos/tilt-light.svg';

export const Logo = (props: LogoProps) => {
  const { width, theme, ...restProps } =props;
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
    <img {...restProps} src={logoSrc} width={width} height={height} alt="Tilt logo"/>
  );
}