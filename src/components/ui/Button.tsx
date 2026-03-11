"use client";

import type { ButtonHTMLAttributes, ComponentProps, ReactNode } from "react";
import { Link } from "@/i18n/routing";
import { motion } from "framer-motion";
import {
  AnimatedButtonIcon,
  type AnimatedButtonIconVariant,
} from "@/components/ui/AnimatedButtonIcon";

type ButtonVariant = "primary" | "secondary" | "neutral";
type ButtonSize = "xs" | "sm" | "md" | "lg" | "iconSm" | "iconMd" | "iconLg";

type CommonButtonProps = {
  variant?: ButtonVariant;
  size?: ButtonSize;
  iconVariant?: AnimatedButtonIconVariant;
  icon?: ReactNode;
  iconPosition?: "left" | "right";
  className?: string;
  fullWidth?: boolean;
  children?: ReactNode;
};

type LinkButtonProps = CommonButtonProps &
  Omit<ComponentProps<typeof Link>, "className" | "children"> & {
    href: ComponentProps<typeof Link>["href"];
  };

type NativeButtonProps = CommonButtonProps &
  Omit<ButtonHTMLAttributes<HTMLButtonElement>, "className" | "children"> & {
    href?: never;
  };

export type ButtonProps = LinkButtonProps | NativeButtonProps;

function joinClasses(...classes: Array<string | undefined | false>) {
  return classes.filter(Boolean).join(" ");
}

const variantClassMap: Record<ButtonVariant, string> = {
  primary:
    "rounded-full bg-clinic-teal-700 dark:bg-clinic-teal-300 text-white dark:text-slate-950 shadow-soft hover:bg-clinic-teal-800 dark:hover:bg-clinic-teal-200",
  secondary:
    "rounded-full border border-clinic-border bg-clinic-white text-clinic-slate-800 shadow-sm hover:bg-clinic-blue-50",
  neutral:
    "rounded-full border border-clinic-border bg-clinic-white text-clinic-slate-800 hover:bg-clinic-blue-50",
};

const sizeClassMap: Record<ButtonSize, string> = {
  xs: "h-8 px-3 text-xs",
  sm: "px-4 py-2 text-sm",
  md: "px-5 py-2.5 text-sm",
  lg: "px-6 py-3 text-sm",
  iconSm: "h-9 w-9",
  iconMd: "h-10 w-10",
  iconLg: "h-11 w-11",
};

export function Button(props: ButtonProps) {
  const {
    variant = "secondary",
    size = "md",
    iconVariant,
    icon,
    iconPosition = "right",
    className,
    fullWidth = false,
    children,
    ...rest
  } = props;

  const iconElement =
    icon ??
    (iconVariant ? <AnimatedButtonIcon variant={iconVariant} /> : null);

  const content = (
    <>
      {iconPosition === "left" ? iconElement : null}
      {children}
      {iconPosition === "right" ? iconElement : null}
    </>
  );

  const classes = joinClasses(
    "inline-flex items-center justify-center gap-2 font-semibold transition focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-clinic-teal-600 disabled:cursor-not-allowed disabled:opacity-70",
    variantClassMap[variant],
    sizeClassMap[size],
    fullWidth ? "w-full" : undefined,
    className,
  );

  if ("href" in props) {
    return (
      <motion.div
        whileHover={{ y: -4, scale: 1.04 }}
        transition={{ type: "spring", stiffness: 400, damping: 22 }}
        style={{ display: "inline-block" }}
      >
        <Link
          className={classes}
          {...(rest as Omit<LinkButtonProps, keyof CommonButtonProps>)}
          href={props.href as string}
          as={undefined}
        >
          {content}
        </Link>
      </motion.div>
    );
  }

  const nativeProps = rest as Omit<NativeButtonProps, keyof CommonButtonProps>;

  return (
    <motion.div
      whileHover={{ y: -4, scale: 1.04 }}
      transition={{ type: "spring", stiffness: 400, damping: 22 }}
      style={{ display: "inline-block" }}
    >
      <button
        type={nativeProps.type ?? "button"}
        className={classes}
        {...nativeProps}
      >
        {content}
      </button>
    </motion.div>
  );
}
