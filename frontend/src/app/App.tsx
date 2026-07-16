// Main App Router Component
// Keep this clean and simple

import { lazy, Suspense } from "react";
import { HashRouter, Routes, Route, Navigate, useLocation } from "react-router";
import { AnimatePresence, motion } from "framer-motion";
import CustomCursor from "./components/CustomCursor";
import KomponenPage from "./pages/KomponenPage";
import AboutPage from "./pages/AboutPage";
import LoginPage from "./pages/LoginPage";
import ModulPage from "./pages/ModulPage";
import ModulDetailPage from "./pages/ModulDetailPage";
import PraktikumPage from "./pages/PraktikumPage";
import HomePage from "./pages/HomePage";
import { AuthProvider, useAuth } from "./auth";

const EmbossingSimPage = lazy(() => import("./pages/EmbossingSimPage"));
const TensileSimPage = lazy(() => import("./pages/TensileSimPage"));
const KomponenDetailPage = lazy(() => import("./pages/KomponenDetailPage"));

function RequireAuth({ children }: { children: React.ReactElement }) {
  const { user } = useAuth();
  if (!user) return <Navigate to="/login" replace />;
  return children;
}

function PageTransition({ children }: { children: React.ReactNode }) {
  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.95, filter: "blur(4px)" }}
      animate={{ opacity: 1, scale: 1, filter: "blur(0px)" }}
      exit={{ opacity: 0, scale: 1.05, filter: "blur(4px)" }}
      transition={{ duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
      className="w-full h-full transform-gpu"
    >
      {children}
    </motion.div>
  );
}

function AnimatedRoutes() {
  const location = useLocation();
  return (
    <AnimatePresence mode="wait">
      <Routes location={location} key={location.pathname}>
        <Route path="/" element={<PageTransition><HomePage /></PageTransition>} />
        <Route path="/login" element={<PageTransition><LoginPage /></PageTransition>} />
        <Route
          path="/komponen"
          element={
            <RequireAuth>
              <PageTransition><KomponenPage /></PageTransition>
            </RequireAuth>
          }
        />
        <Route
          path="/komponen/:no"
          element={
            <RequireAuth>
              <Suspense
                fallback={
                  <div
                    className="flex min-h-screen items-center justify-center bg-black text-[#BFFD44]"
                    style={{ fontFamily: "'Chivo', sans-serif" }}
                  >
                    Memuat model 3D…
                  </div>
                }
              >
                <PageTransition><KomponenDetailPage /></PageTransition>
              </Suspense>
            </RequireAuth>
          }
        />
        <Route
          path="/praktikum"
          element={
            <RequireAuth>
              <PageTransition>
                <PraktikumPage />
              </PageTransition>
            </RequireAuth>
          }
        />
        <Route
          path="/praktikum/tensile-test"
          element={
            <RequireAuth>
              <Suspense
                fallback={
                  <div
                    className="flex min-h-screen items-center justify-center bg-black text-[#BFFD44]"
                    style={{ fontFamily: "'Chivo', sans-serif" }}
                  >
                    Memuat simulator…
                  </div>
                }
              >
                <PageTransition>
                  <TensileSimPage />
                </PageTransition>
              </Suspense>
            </RequireAuth>
          }
        />
        <Route
          path="/praktikum/embossing-machine"
          element={
            <RequireAuth>
              <Suspense
                fallback={
                  <div
                    className="flex min-h-screen items-center justify-center bg-black text-[#BFFD44]"
                    style={{ fontFamily: "'Chivo', sans-serif" }}
                  >
                    Memuat simulator…
                  </div>
                }
              >
                <PageTransition>
                  <EmbossingSimPage />
                </PageTransition>
              </Suspense>
            </RequireAuth>
          }
        />
        <Route
          path="/modul"
          element={
            <RequireAuth>
              <PageTransition>
                <ModulPage />
              </PageTransition>
            </RequireAuth>
          }
        />
        <Route
          path="/modul/:id"
          element={
            <RequireAuth>
              <PageTransition>
                <ModulDetailPage />
              </PageTransition>
            </RequireAuth>
          }
        />
        <Route
          path="/about"
          element={
            <PageTransition>
              <AboutPage />
            </PageTransition>
          }
        />
      </Routes>
    </AnimatePresence>
  );
}

export default function App() {
  return (
    <HashRouter>
      <AuthProvider>
        <CustomCursor />
        <AnimatedRoutes />
      </AuthProvider>
    </HashRouter>
  );
}
