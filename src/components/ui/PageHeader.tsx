type PageHeaderProps = {
  eyebrow?: string;
  title: string;
  subtitle?: string;
  icon?: string;
  children?: React.ReactNode;
};

export default function PageHeader({
  eyebrow,
  title,
  subtitle,
  icon,
  children,
}: PageHeaderProps) {
  return (
    <div className="bg-[#161b22] border border-gray-800 rounded-2xl p-6 mb-6">

      <div className="flex items-start justify-between gap-4">

        <div className="flex-1">

          {eyebrow && (
            <p className="text-xs uppercase tracking-[0.25em] text-amber-500 font-semibold mb-2">
              {eyebrow}
            </p>
          )}

          <h1 className="text-3xl font-bold text-white">
            {title}
          </h1>

          {subtitle && (
            <p className="text-gray-400 mt-2">
              {subtitle}
            </p>
          )}

        </div>

        {icon && (
          <div className="text-5xl">
            {icon}
          </div>
        )}

      </div>

      {children && (
        <div className="mt-6">
          {children}
        </div>
      )}

    </div>
  );
}