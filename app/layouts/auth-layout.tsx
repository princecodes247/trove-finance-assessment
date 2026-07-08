import { Outlet } from "react-router";

export default function AuthLayout() {
  return (
    <div className="min-h-screen bg-page flex flex-col justify-center py-12 sm:px-6 lg:px-8">
      <div className="sm:mx-auto sm:w-full sm:max-w-md">
        <h2 className="mt-6 text-center text-3xl font-extrabold text-text-default">
          Welcome Back
        </h2>
      </div>

      <div className="mt-8 sm:mx-auto sm:w-full sm:max-w-md">
        <div className="bg-surface py-8 px-4 shadow-sm border border-border sm:rounded-xl sm:px-10">
          <Outlet />
        </div>
      </div>
    </div>
  );
}
