import { transformSourceName } from "src/shared/utils";
import ActiveLink from "src/shared/components/active-link";

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
      className="w-3/3 lg:w-1/3 bg-sky-100 p-4 min-h-max lg:min-h-85v m-auto"
    >
      <h2 className="mb-4 uppercase text-xs tracking-wider">Projects</h2>
      <ul className="text-xs">{links}</ul>
    </nav>
  ) : null;
};

export default Navigation;

type NavigationProps = {
  isSuccess: boolean;
  data: {
    id: number;
    snapshot: string;
    source: string;
    snapshotId: number;
  }[];
};
