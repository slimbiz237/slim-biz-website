import { createBrowserRouter } from "react-router";
import Layout from "./components/Layout";
import HomePage from "./components/pages/HomePage";
import AboutPage from "./components/pages/AboutPage";
import ServicesPage from "./components/pages/ServicesPage";
import PortfolioPage from "./components/pages/PortfolioPage";
import PricingPage from "./components/pages/PricingPage";
import TestimonialsPage from "./components/pages/TestimonialsPage";
import BlogPage from "./components/pages/BlogPage";
import BlogPostPage from "./components/pages/BlogPostPage";
import ContactPage from "./components/pages/ContactPage";
import FAQPage from "./components/pages/FAQPage";
import CareersPage from "./components/pages/CareersPage";
import ConsultationPage from "./components/pages/ConsultationPage";
import TrainingPage from "./components/pages/TrainingPage";

export const router = createBrowserRouter([
  {
    path: "/",
    Component: Layout,
    children: [
      { index: true, Component: HomePage },
      { path: "about",        Component: AboutPage },
      { path: "services",     Component: ServicesPage },
      { path: "portfolio",    Component: PortfolioPage },
      { path: "pricing",      Component: PricingPage },
      { path: "testimonials", Component: TestimonialsPage },
      { path: "blog/:slug", Component: BlogPostPage },
      { path: "contact",      Component: ContactPage },
      { path: "faq",          Component: FAQPage },
      { path: "careers",      Component: CareersPage },
      { path: "consultation", Component: ConsultationPage },
      { path: "training",     Component: TrainingPage },
    ],
  },
]);
