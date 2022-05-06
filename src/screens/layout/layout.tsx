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
      <section className="flex flex-col lg:flex-row">
        <Navigation data={data} isSuccess={isSuccess}></Navigation>
        <Outlet />
      </section>
    </>
  );
};

export default Layout;

const Header = (): JSX.Element => {
  return (
    <header>
      <h1 className="font-serif text-3xl mt-4 mb-6">
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
            <li key={`${d.source}-${d.snapshotId}`} className="my-2">
              <ActiveLink
                to={`snapshots/${d.source}/${d.snapshotId}`}
                key={`${d.source}-${d.snapshotId}`}
              >
                {transformSourceName(d.source)} {d.snapshot}
              </ActiveLink>
            </li>
          );
        })
      : null;
  return isSuccess ? (
    <nav className="w-4/4 lg:w-1/4 pr-4">
      <h2 className="text-xl mb-4">Sources</h2>
      <ul className="text-sm sm:text-base">{links}</ul>
    </nav>
  ) : null;
};
