import ProtectedRoute from "@/components/ProtectedRoute";
import MainLayout from "@/layouts/MainLayout";
import AuthCallbackPage from "@/pages/AuthCallbackPage";
import HomePage from "@/pages/HomePage";
import MyRestaurantPage from "@/pages/MyRestaurantPage";
import UserProfile from "@/pages/UserProfile";
import { Routes, Route } from "react-router-dom";

const AppRouter = () => {
  return (
    <Routes>
      <Route
        path="/"
        element={
          <MainLayout showHero>
            <HomePage />
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
      </Route>

      <Route path="/auth-callback" element={<AuthCallbackPage />} />
      {/* <Route path="*" element={<PageNotFound/>} /> */}
    </Routes>
  );
};

export default AppRouter;
