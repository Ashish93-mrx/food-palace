import { useRouteError } from "react-router-dom";
import { Link } from "react-router-dom";

const Error = () => {
  const err = useRouteError();
  console.error(err);

  const status = err?.status || 500;
  const statusText = err?.statusText || "Internal Server Error";
  const message = err?.data?.message || "Something went wrong. Please try again.";

  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-gray-100 px-4">

      <h1 className="text-4xl font-bold text-red-600 mb-2">Oops!</h1>
      <h2 className="text-xl font-semibold text-gray-700 mb-1">
        {status}: {statusText}
      </h2>
      <p className="text-gray-500 mb-6 text-center max-w-md">
        {message}
      </p>
      <Link
        to="/"
        className="px-5 py-2 bg-blue-600 text-white rounded hover:bg-blue-700 transition"
      >
        Go back to Home
      </Link>
    </div>
  );
};

export default Error;
