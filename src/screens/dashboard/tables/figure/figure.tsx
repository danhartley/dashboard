import { transformSourceName } from "src/shared/utils";

const Figure = ({
  title,
  children,
}: {
  title?: string;
  children?: JSX.Element | JSX.Element[];
}) => {
  return (
    <figure className="w-full border-solid border-slate-900 dark:border-slate-50 border-4 rounded-md p-3 my-2">
      <figcaption className="font-serif mb-4">
        <em>{transformSourceName(title)}</em>
      </figcaption>
      {children}
    </figure>
  );
};

export default Figure;
