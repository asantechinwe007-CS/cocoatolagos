import { ButtonHTMLAttributes } from "react";

type SecondaryButtonProps = ButtonHTMLAttributes<HTMLButtonElement>;

export default function SecondaryButton({
  children,
  className = "",
  ...props
}: SecondaryButtonProps) {
  return (
    <button
      {...props}
      className={`
        w-full
        rounded-xl
        border
        border-gray-700
        bg-[#161b22]
        hover:bg-[#1d2530]
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