import clsx from "clsx";
import { ReactNode } from "react";
import { Size } from "../../lib/types";

export type ButtonProps = {
  label: string;
  onClick: () => void;
  size?: Size;
  className?: string;
  color?: "primary" | "secondary";
  variant?: "soft" | "raised" | "outlined" | "plain";
  rounded?: boolean;
  leadingIcon?: ReactNode;
  trailingIcon?: ReactNode;
};

const getColorClasses = (color: ButtonProps["color"]) => {
  switch (color) {
    case "secondary":
      return "bg-zinc-50 text-zinc-900";
    default:
      return "bg-zinc-900 text-zinc-50";
  }
};

const getRadiusClasses = (rounded: ButtonProps["rounded"]) => {
  switch (rounded) {
    case true:
      return "rounded-full";
    default:
      return "rounded-md";
  }
};

const getSizeClasses = (size: ButtonProps["size"]) => {
  switch (size) {
    case "xs":
      return "py-1 px-2";
    case "sm":
      return "py-2 px-3";
    case "md":
      return "py-3 px-4";
    case "lg":
      return "py-4 px-5";
    case "xl":
      return "py-5 px-6";
    default:
      return "py-6 px-7";
  }
};

const defaultProps = {
  size: "xs" as ButtonProps["size"],
  color: "primary" as ButtonProps["color"],
  rounded: false,
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
    rounded,
    ...restProps
  } = { ...defaultProps, ...props };

  return (
    <button
      className={clsx(
        className,
        getSizeClasses(size),
        getColorClasses(color),
        getRadiusClasses(rounded)
      )}
      onClick={onClick}
      {...restProps}
    >
      {leadingIcon}
      {label}
      {trailingIcon}
    </button>
  );
};
