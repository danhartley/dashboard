import { Link, Outlet } from "react-router-dom";
import { useSnapshots } from "src/screens/dashboard/hooks/useSnapshots";
import { transformSourceName } from "src/shared/utils";
import ActiveLink from "src/shared/components/active-link";

const Navigation = (): JSX.Element => {
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
      <div className="container mx-auto w-4/5">
        <section className="container mx-auto max-w-4xl pt-4">
          <h1 className="font-serif text-3xl mt-4 mb-6">
            <Link key="home" to="">
              Responsibility dashboard
            </Link>
          </h1>
          <ul className="text-sm sm:text-base">
            {isSuccess
              ? data.map((d) => {
                  return (
                    <li key={`${d.source}-${d.snapshotId}`}>
                      <ActiveLink
                        to={`snapshots/${d.source}/${d.snapshotId}`}
                        key={`${d.source}-${d.snapshotId}`}
                      >
                        {transformSourceName(d.source)} {d.snapshot}
                      </ActiveLink>
                    </li>
                  );
                })
              : null}
          </ul>
        </section>
      </div>
      <Outlet />
    </>
  );
};

export default Navigation;
