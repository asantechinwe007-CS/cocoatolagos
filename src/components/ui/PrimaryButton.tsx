import { ButtonHTMLAttributes } from "react";

type PrimaryButtonProps = ButtonHTMLAttributes<HTMLButtonElement>;

export default function PrimaryButton({
  children,
  className = "",
  ...props
}: PrimaryButtonProps) {
  return (
    <button
      {...props}
      className={`
        w-full
        rounded-xl
        bg-emerald-600
        hover:bg-emerald-700
        active:scale-[0.98]
        transition-all
        duration-200
        py-3
        px-5
        font-semibold
        text-white
        disabled:opacity-50
        disabled:cursor-not-allowed
        ${className}
      `}
    >
      {children}
    </button>
  );
}