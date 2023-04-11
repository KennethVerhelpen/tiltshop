import clsx from "clsx";
import { ReactNode } from "react";
import { Size } from "../../lib/types";

export type ButtonProps = {
  label: string;
  onClick?: () => void;
  size?: Size;
  className?: string;
  color?: "primary" | "secondary";
  variant?: "soft" | "raised" | "outlined" | "strong";
  rounded?: boolean;
  leadingIcon?: ReactNode;
  trailingIcon?: ReactNode;
};

const defaultClasses = "flex flex-row justify-start items-center"

const getVariantClasses = (variant: ButtonProps['variant']) => {
  if (variant === 'outlined') {
    return "border-none ring-1 ring-stone-200 hover:ring-stone-300 hover:bg-stone-100 text-stone-900";
  }
  if (variant === 'strong') {
    return "bg-stone-900 hover:bg-stone-700 text-stone-50";
  }
  if (variant === 'soft') {
    return "bg-stone-200 hover:bg-stone-300/70 active:bg-stone-300/70 focus:ring focus:ring-stone-200/50 text-stone-800 hover:text-stone-900";
  }
  else {
    return "bg-stone-900 hover:bg-stone-700 active:bg-stone-700 focus:ring focus:ring-stone-300 text-stone-50 shadow-md";
  }
};

const getRadiusClasses = (size: ButtonProps["size"], rounded: ButtonProps["rounded"]) => {
  if (rounded) {
    return "rounded-full";
  } else {
    switch (size) {
      case "xs":
        return "rounded-md";
      case "md":
        return "rounded-lg";
      case "lg":
        return "rounded-lg";
      case "xl":
        return "rounded-lg";
      default:
        return "rounded-md";
    }
  }
};

const getSizeClasses = (size: ButtonProps["size"]) => {
  switch (size) {
    case "xs":
      return "py-[0.3125rem] px-2 text-[0.8125rem]";
    case "md":
      return "py-2.5 px-3.5 text-md";
    case "lg":
      return "py-3 px-4 text-lg";
    case "xl":
      return "py-3.5 px-5 text-xl";
    default:
      return "py-2 px-3 text-sm";
  }
};

const defaultProps = {
  size: "xs" as ButtonProps["size"],
  color: "primary" as ButtonProps["color"],
  rounded: false,
  variant: "raised" as ButtonProps["variant"],
};

export const Button = (props: ButtonProps) => {
  const {
    className,
    label,
    leadingIcon,
    trailingIcon,
    size,
    onClick,
    color,
    variant,
    rounded,
    ...restProps
  } = { ...defaultProps, ...props };

  return (
    <button
      className={clsx(
        className,
        defaultClasses,
        getSizeClasses(size),
        getVariantClasses(variant),
        getRadiusClasses(size, rounded)
      )}
      onClick={onClick}
      {...restProps}
    >
      {leadingIcon}
      <span className={clsx(leadingIcon && 'pl-1', trailingIcon && 'pr-1')}>{label}</span>
      {trailingIcon}
    </button>
  );
};
