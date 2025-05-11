import React, { AnchorHTMLAttributes, ButtonHTMLAttributes } from 'react';
import Link from 'next/link';
import {ButtonColor, ButtonVariant} from "@/types/button";
import prepareClasses from "@/components/button/prepare-classes";

type ButtonBaseProps = {
  children: React.ReactNode;
  variant?: ButtonVariant;
  color?: ButtonColor;
  className?: string;
};

type ButtonProps = ButtonBaseProps &
  (ButtonHTMLAttributes<HTMLButtonElement> | AnchorHTMLAttributes<HTMLAnchorElement>) & {
  href?: string;
};

const Button: React.FC<ButtonProps> = ({
                                         children,
                                         variant = 'flat',
                                         color = 'default',
                                         href,
                                         className = '',
                                         ...props
                                       }) => {
  const combinedClasses = prepareClasses({ variant, color, className });

  if (href) {
    const isExternal = href.startsWith('http');

    if (isExternal) {
      return (
        <a
          href={href}
          className={combinedClasses}
          target="_blank"
          rel="noopener noreferrer"
          {...props as AnchorHTMLAttributes<HTMLAnchorElement>}
        >
          {children}
        </a>
      );
    }

    return (
      <Link href={href} className={combinedClasses} {...props as AnchorHTMLAttributes<HTMLAnchorElement>}>
        {children}
      </Link>
    );
  }

  return (
    <button
      className={combinedClasses}
      {...props as ButtonHTMLAttributes<HTMLButtonElement>}
    >
      {children}
    </button>
  );
};

export default Button;