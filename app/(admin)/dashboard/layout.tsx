import { Suspense } from "react";
import Loading from "./@cards/loading";
import Loading1 from "./@notifications/loading";
import Cards from "./@cards/page";

export default function LayoutDashboard({
  children,
  cards,
  notifications,
}: Readonly<{
  children: React.ReactNode;
  cards: React.ReactNode;
  notifications: React.ReactNode;
}>) {
  return (
    <>
      <div>{children}</div>
      <div className="flex gap-2">
        <Suspense fallback={<Loading />}>
          <Cards />
        </Suspense>
        <Suspense fallback={<Loading1 />}> {notifications}</Suspense>
      </div>
    </>
  );
}
