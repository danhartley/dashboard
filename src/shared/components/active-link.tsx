import { Link, useMatch, useResolvedPath, LinkProps } from "react-router-dom";

const ActiveLink = ({ children, to, ...props }: LinkProps) => {
  const resolved = useResolvedPath(to);
  const match = useMatch({ path: resolved.pathname, end: true });

  return (
    <div>
      <Link
        className={match ? "text-orange-700" : "hover:text-orange-500"}
        to={to}
        {...props}
      >
        {children}
      </Link>
    </div>
  );
};

export default ActiveLink;
