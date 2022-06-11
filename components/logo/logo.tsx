import clsx from 'clsx';
import { HTMLAttributes } from 'react';

import { ThemeType } from '../../lib/types';

export type LogoProps = {
  theme?: ThemeType;
  className?: string;
} & HTMLAttributes<HTMLSpanElement>;

export const Logo = (props: LogoProps) => {
  const { className, theme, ...restProps } =props;

  return (
    <span
      className={clsx(
        className,
        theme === 'light' ? 'text-primary-900' : 'text-neutral-100',
        'cursive'
      )}
      {...restProps}
    >
      tilt.
    </span>
  );
}