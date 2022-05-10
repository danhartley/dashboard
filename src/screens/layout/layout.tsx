import { Link, Outlet } from "react-router-dom";
import { useSnapshots } from "src/screens/dashboard/hooks/useSnapshots";
import { Error } from "src/shared/types";

const Layout = (): JSX.Element => {
  const {
    data,
    isSuccess,
  }: {
    data: {
      id: number;
      snapshot: string;
      source: string;
      snapshotId: number;
    }[];
    isSuccess: boolean;
    error: Error;
  } = useSnapshots();

  return (
    <>
      <Header />
      <section className="flex flex-col lg:flex-row min-h-85v">
        {/* <Navigation data={data} isSuccess={isSuccess}></Navigation> */}
        <Outlet />
      </section>
      <Footer />
    </>
  );
};

export default Layout;

const Header = (): JSX.Element => {
  return (
    <header className="h-10v py-5 m-auto">
      <h1 className="font-serif text-2xl lg:text-3xl">
        <Link key="home" to="">
          Responsibility Dashboard
        </Link>
      </h1>
    </header>
  );
};

const Footer = (): JSX.Element => {
  return (
    <footer className="py-2 m-auto">
      <div>
        Dashboard{" "}
        <a
          className="class-pointer border-b pb-1 hover:border-slate-900 focus:border-slate-900"
          href="https://github.com/danhartley/dashboard"
        >
          repository
        </a>{" "}
        on GitHub
      </div>
    </footer>
  );
};
