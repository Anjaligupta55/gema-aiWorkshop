import { ArrowRight, Loader2 } from "lucide-react";

function Button({
  children,
  variant = "primary",
  showArrow = true,
  loading = false,
  disabled = false,
  className = "",
  ...props
}) {
  const variants = {
    primary:
      "bg-indigo-600 text-white hover:bg-indigo-700 shadow-md hover:shadow-indigo-500/25 disabled:bg-indigo-400",

    secondary:
      "border border-slate-200 bg-white text-slate-800 hover:bg-slate-50 disabled:bg-slate-100 disabled:text-slate-400",

    outline:
      "border border-indigo-600 text-indigo-600 hover:bg-indigo-50/50 disabled:border-indigo-300 disabled:text-indigo-300",
  };

  return (
    <button
      disabled={disabled || loading}
      className={`
      group
      inline-flex
      items-center
      justify-center
      gap-2
      rounded-2xl
      px-6
      py-3
      font-semibold
      transition-all
      duration-300
      hover:-translate-y-0.5
      hover:shadow-lg
      active:scale-[0.98]
      disabled:pointer-events-none
      disabled:opacity-70
      disabled:transform-none
      disabled:shadow-none
      cursor-pointer
      ${variants[variant]}
      ${className}
      `}
      {...props}
    >
      {loading && <Loader2 size={18} className="animate-spin" />}
      
      <span>{children}</span>

      {showArrow && !loading && (
        <ArrowRight
          size={18}
          className="transition-transform duration-300 group-hover:translate-x-1"
        />
      )}
    </button>
  );
}

export default Button;