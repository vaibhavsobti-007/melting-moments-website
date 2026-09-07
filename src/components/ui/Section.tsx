export function Section({
  children,
  className = "",
  as: Tag = "section",
}: {
  children: React.ReactNode;
  className?: string;
  as?: keyof React.JSX.IntrinsicElements;
}) {
  return (
    <Tag className={`mx-auto max-w-content px-6 sm:px-10 ${className}`}>
      {children}
    </Tag>
  );
}
