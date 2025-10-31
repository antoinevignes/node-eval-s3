import { createRouter, RouterProvider } from "@tanstack/react-router";
import { routeTree } from "./routeTree.gen";
import { Toaster } from "sonner";
import { useAuth } from "./context/AuthContext";

function App() {
  const { user, loading } = useAuth();

  const router = createRouter({
    routeTree,
    context: {
      auth: { user, loading },
    },
  });

  return (
    <>
      <Toaster richColors />
      <RouterProvider router={router} />
    </>
  );
}

export default App;
