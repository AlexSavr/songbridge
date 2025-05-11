import {ButtonColor, ButtonVariant} from "@/types/button";

function prepareClasses({ variant, color, className }: { variant?: ButtonVariant, color?: ButtonColor, className: string }) {
  const classes = ['button'];
  if(variant) {
    classes.push(`button--${variant}`);
  }
  if(color) {
    classes.push(`button--${color}`);
  }
  if(className) {
    classes.push(className);
  }

  return classes.join(' ');
}

export default prepareClasses;