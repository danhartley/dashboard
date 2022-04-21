import { Outlet } from "react-router-dom";

const Navigation = () : JSX.Element => {
  return (
    <>
    <div className="container mx-auto w-4/5">
      <section className="container mx-auto max-w-4xl pt-4">
        <h1 className="font-serif text-3xl mt-4 mb-6">
          Responsibility dashboard
        </h1>
      </section>
    </div>
    <Outlet />
    </>
  )
};

export default Navigation;