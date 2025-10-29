import { Link } from "react-router";

export default function NotFound() {
  return (
    <section className="h-screen flex flex-col justify-center items-center text-center bg-gray-50">
      <h1 className="text-6xl font-extrabold text-gray-900 mb-4">404</h1>
      <p className="text-xl text-gray-600 mb-8">
        Oups ! La page que vous recherchez n’existe pas.
      </p>
      <Link
        to="/"
        className="bg-blue-600 text-white px-6 py-3 rounded-lg font-semibold hover:bg-blue-700 transition-all"
      >
        Retour à l’accueil
      </Link>
    </section>
  );
}
