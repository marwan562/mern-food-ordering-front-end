import { lazy, Suspense } from "react";
import { Routes, Route } from "react-router-dom";

// Protected Route
import ProtectedRoute from "@/components/ProtectedRoute";

// Main layout
import MainLayout from "@/layouts/MainLayout";
import LottileFiles from "@/assets/lottieFiles/LottieFiles";
import OrderStatusPage from "@/pages/OrderStatusPage";

// Pages
const HomePage = lazy(() => import("@/pages/HomePage"));
const UserProfile = lazy(() => import("@/pages/UserProfile"));
const SearchPage = lazy(() => import("@/pages/SearchPage"));
const AuthCallbackPage = lazy(() => import("@/pages/AuthCallbackPage"));
const MyRestaurantPage = lazy(() => import("@/pages/MyRestaurantPage"));
const DetailsRestaurant = lazy(() => import("@/pages/DetailsRestaurant"));

const AppRouter = () => {
  return (
    <Suspense fallback={<LottileFiles variant="LoadingPage" />}>
      <Routes>
        <Route
          path="/"
          element={
            <MainLayout showHero>
              <HomePage />
            </MainLayout>
          }
        />
        <Route
          path="/search/:city"
          element={
            <MainLayout>
              <SearchPage />
            </MainLayout>
          }
        />
        <Route
          path="/details/:id"
          element={
            <MainLayout>
              <DetailsRestaurant />
            </MainLayout>
          }
        />

        {/* Protected Routes  */}
        <Route element={<ProtectedRoute />}>
          <Route
            path="/user-profile"
            element={
              <MainLayout>
                <UserProfile />
              </MainLayout>
            }
          />
          <Route
            path="/manage-restaurant"
            element={
              <MainLayout>
                <MyRestaurantPage />
              </MainLayout>
            }
          />
          <Route path="/order-status" element={<MainLayout ><OrderStatusPage/></MainLayout>}/>
        </Route>

        <Route path="/auth-callback" element={<AuthCallbackPage />} />
        {/* <Route path="*" element={<PageNotFound/>} /> */}
      </Routes>
    </Suspense>
  );
};

export default AppRouter;
