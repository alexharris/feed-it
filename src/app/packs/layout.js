export default function RootLayout({ children }) {
  return (
    <div className="flex-1 overflow-auto">
      {children}
    </div>
  );
}
