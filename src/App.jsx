import { useEffect, Suspense, lazy } from "react";
import { Route, Routes, Navigate } from "react-router-dom";
import { Toaster } from "react-hot-toast";
import { readTokenFromLocalStorage } from "./Utils/auth";
import axios from "axios";
import { RegisterPageSkeleton } from "./components/Loader";

// Lazy load components
const Register = lazy(() => import("./components/Register").then(m => ({ default: m.Register })));
const HomeV2 = lazy(() => import("./components/HomeV2"));
const ProductDetail = lazy(() => import("./components/ProductDetail"));
const ProtectedRoutes = lazy(() => import("./components/ProtectedRoutes"));

const App = () => {
  useEffect(() => {
    const token = readTokenFromLocalStorage();
    if (token) {
      axios.defaults.headers.common["Authorization"] = `Bearer ${token}`;
    } else {
      delete axios.defaults.headers.common["Authorization"];
    }
  }, []);

  return (
    <>
      <Toaster />
      <Suspense fallback={<RegisterPageSkeleton />}>
        <Routes>
          <Route path="/" element={<Register />} />

          <Route element={<ProtectedRoutes />}>
            <Route path="/home" element={<HomeV2 />} />
            <Route path="/product/:id" element={<ProductDetail />} />
          </Route>
          <Route path="*" element={<Navigate to="/" replace />} />
        </Routes>
      </Suspense>
    </>
  );
};

export default App;
