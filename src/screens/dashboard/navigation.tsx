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
      className="w-10/12 md:w-4/6 bg-night p-4 lg:min-h-85v m-auto min-h-85v rounded-lg"
    >
      <h2 className="text-xl mb-4 font-serif italic text-wider">Projects</h2>
      <ul className="text-md">{links}</ul>
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
