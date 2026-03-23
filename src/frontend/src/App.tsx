import {
  RouterProvider,
  createRootRoute,
  createRoute,
  createRouter,
} from "@tanstack/react-router";
import { Suspense, lazy } from "react";
import ChatBot from "./components/ChatBot";

// Lazy-load every page so only the current page's JS is fetched on first visit
const Home = lazy(() => import("./pages/Home"));
const About = lazy(() => import("./pages/About"));
const Services = lazy(() => import("./pages/Services"));
const CaseStudies = lazy(() => import("./pages/CaseStudies"));
const Blog = lazy(() => import("./pages/Blog"));
const BlogPost = lazy(() => import("./pages/BlogPost"));
const Contact = lazy(() => import("./pages/Contact"));
const AdminPanel = lazy(() => import("./pages/AdminPanel"));

// Minimal full-screen loading indicator shown while a page chunk is fetched
function PageLoader() {
  return (
    <div className="min-h-screen flex items-center justify-center bg-[#0a1628]">
      <div className="flex flex-col items-center gap-4">
        <div className="w-10 h-10 rounded-full border-4 border-[#38C98A]/30 border-t-[#38C98A] animate-spin" />
        <span className="text-white/60 text-sm font-medium">Loading…</span>
      </div>
    </div>
  );
}

const rootRoute = createRootRoute();

const homeRoute = createRoute({
  getParentRoute: () => rootRoute,
  path: "/",
  component: () => (
    <Suspense fallback={<PageLoader />}>
      <Home />
    </Suspense>
  ),
});
const aboutRoute = createRoute({
  getParentRoute: () => rootRoute,
  path: "/about",
  component: () => (
    <Suspense fallback={<PageLoader />}>
      <About />
    </Suspense>
  ),
});
const servicesRoute = createRoute({
  getParentRoute: () => rootRoute,
  path: "/services",
  component: () => (
    <Suspense fallback={<PageLoader />}>
      <Services />
    </Suspense>
  ),
});
const caseStudiesRoute = createRoute({
  getParentRoute: () => rootRoute,
  path: "/case-studies",
  component: () => (
    <Suspense fallback={<PageLoader />}>
      <CaseStudies />
    </Suspense>
  ),
});
const blogRoute = createRoute({
  getParentRoute: () => rootRoute,
  path: "/blog",
  component: () => (
    <Suspense fallback={<PageLoader />}>
      <Blog />
    </Suspense>
  ),
});
const blogPostRoute = createRoute({
  getParentRoute: () => rootRoute,
  path: "/blog/$id",
  component: () => (
    <Suspense fallback={<PageLoader />}>
      <BlogPost />
    </Suspense>
  ),
});
const contactRoute = createRoute({
  getParentRoute: () => rootRoute,
  path: "/contact",
  component: () => (
    <Suspense fallback={<PageLoader />}>
      <Contact />
    </Suspense>
  ),
});
const adminRoute = createRoute({
  getParentRoute: () => rootRoute,
  path: "/admin",
  component: () => (
    <Suspense fallback={<PageLoader />}>
      <AdminPanel />
    </Suspense>
  ),
});

const routeTree = rootRoute.addChildren([
  homeRoute,
  aboutRoute,
  servicesRoute,
  caseStudiesRoute,
  blogRoute,
  blogPostRoute,
  contactRoute,
  adminRoute,
]);

const router = createRouter({ routeTree });

declare module "@tanstack/react-router" {
  interface Register {
    router: typeof router;
  }
}

export default function App() {
  return (
    <>
      <RouterProvider router={router} />
      <ChatBot />
    </>
  );
}
