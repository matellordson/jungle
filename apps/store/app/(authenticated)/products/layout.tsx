export default function ProductLayout({
  children,
  inventory,
}: {
  children: React.ReactNode;
  inventory: React.ReactNode;
}) {
  return (
    <>
      {children}
      {inventory}
    </>
  );
}
