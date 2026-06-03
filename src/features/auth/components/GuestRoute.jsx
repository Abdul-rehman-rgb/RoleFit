import { Navigate, Outlet } from "react-router";
import { useSelector } from "react-redux";

const GuestRoute = () => {
  const { isAuthenticated, initializing } = useSelector((state) => state.auth);

  if (initializing) {
    return (
      <main className="flex min-h-screen items-center justify-center bg-neutral-50">
        <p className="text-neutral-500">Loading...</p>
      </main>
    );
  }

  if (isAuthenticated) {
    return <Navigate to="/dashboard" replace />;
  }

  return <Outlet />;
};

export default GuestRoute;
