import SideNav from "@/src/ui/tables/sidenav";
import TopNav from '@/src/ui/tables/top-nav';

export default function Layout(
  { children }: { children: React.ReactNode }
) {
  return (
    <div className="h-screen flex flex-col">
      <TopNav />
      <div className="flex flex-row" style={{ height: 'calc(100vh - 4rem)' }}>
        <div className="hidden md:block md:min-w-52 shadow-md">
          <SideNav />
        </div>
        <div className="grow overflow-y-scroll p-10">
          {children}
        </div>
      </div>
    </div>
  );
}