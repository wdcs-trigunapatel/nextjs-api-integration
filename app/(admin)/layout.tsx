import Link from "next/link";

export default function LayoutAmin({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <div className="flex justify-between py-10 px-4">
      <div className="w-1/3 flex flex-col gap-2">
        <Link href="/dashboard" className="text-blue-500 font-bold">
          Dashboard
        </Link>
        <Link href="/profile" className="text-blue-500 font-bold">
          Profile
        </Link>
      </div>
      <div className="w-2/3">{children}</div>
    </div>
  );
}
