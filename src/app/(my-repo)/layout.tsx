export default function MyRepoLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="flex w-full items-center justify-center">{children}</div>
  );
}
