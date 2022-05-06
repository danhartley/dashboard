import { Link, Outlet } from "react-router-dom";
import { useSnapshots } from "src/screens/dashboard/hooks/useSnapshots";
import { transformSourceName } from "src/shared/utils";
import ActiveLink from "src/shared/components/active-link";

const Layout = (): JSX.Element => {
  type Error = {
    message?: string;
  };

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
        <Navigation data={data} isSuccess={isSuccess}></Navigation>
        <Outlet />
      </section>
      <Footer />
    </>
  );
};

export default Layout;

const Header = (): JSX.Element => {
  return (
    <header className="h-10v py-5">
      <h1 className="font-serif text-2xl lg:text-3xl">
        <Link key="home" to="">
          Responsibility Dashboard
        </Link>
      </h1>
    </header>
  );
};

type NavigationProps = {
  isSuccess: boolean;
  data: {
    id: number;
    snapshot: string;
    source: string;
    snapshotId: number;
  }[];
};

const Navigation = ({ isSuccess, data }: NavigationProps): JSX.Element => {
  const links =
    data && data.length > 0
      ? data.map((d) => {
          return (
            <li key={`li-${d.source}-${d.snapshotId}`} className="my-2">
              <ActiveLink
                to={`snapshots/${d.source}/${d.snapshotId}`}
                key={`link-${d.source}-${d.snapshotId}`}
              >
                {transformSourceName(d.source)} {d.snapshot}
              </ActiveLink>
            </li>
          );
        })
      : null;
  return isSuccess ? (
    <nav
      id="projects"
      className="w-3/3 lg:w-1/3 bg-sky-100 p-4 min-h-max lg:min-h-85v"
    >
      <h2 className="mb-4 uppercase text-xs tracking-wider">Projects</h2>
      <ul className="text-xs">{links}</ul>
    </nav>
  ) : null;
};

const Footer = (): JSX.Element => {
  return (
    <section className="py-2">
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
    </section>
  );
};
