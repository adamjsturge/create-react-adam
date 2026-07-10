import { ComponentPropsWithoutRef } from "react";
import { ButtonVariant } from "../types/ui";

interface ButtonProps extends ComponentPropsWithoutRef<"button"> {
  variant?: ButtonVariant;
}

const variantClasses: Record<ButtonVariant, string> = {
  primary: "bg-brand-primary hover:bg-brand-primaryHover",
  success: "bg-brand-success hover:bg-brand-success/90",
  danger: "bg-brand-danger hover:bg-brand-danger/90",
};

const Button = ({ variant = "primary", className, ...props }: ButtonProps) => (
  <button
    className={[
      "text-brand-white rounded-lg px-4 py-2 transition-colors",
      variantClasses[variant],
      className,
    ]
      .filter(Boolean)
      .join(" ")}
    {...props}
  />
);

export default Button;
