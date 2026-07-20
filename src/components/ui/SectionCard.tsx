type SectionCardProps = {
  title: string;
  icon?: string;
  children: React.ReactNode;
  footer?: React.ReactNode;
};

export default function SectionCard({
  title,
  icon,
  children,
  footer,
}: SectionCardProps) {
  return (
    <section className="bg-[#161b22] border border-gray-800 rounded-2xl overflow-hidden">

      <div className="flex items-center justify-between px-5 py-4 border-b border-gray-800">

        <div className="flex items-center gap-3">

          {icon && (
            <div className="text-2xl">
              {icon}
            </div>
          )}

          <h2 className="text-lg font-semibold text-white">
            {title}
          </h2>

        </div>

      </div>

      <div className="p-5 space-y-4">
        {children}
      </div>

      {footer && (
        <div className="px-5 py-4 border-t border-gray-800 bg-[#11161d]">
          {footer}
        </div>
      )}

    </section>
  );
}