import AuthLayout from "./components/authLayout"
import { Routes, Route } from "react-router-dom";
import Login from "./pages/auth/login";
import SignUp from "./pages/auth/signUp";
import ShoppingView from "./components/shopping-view/layout";
import AdminView from "./components/admin-view/layout";
import AdminDashboard from "./pages/admin-view/dashboard";
import AdminFeatures from "./pages/admin-view/features";
import AdminOrders from "./pages/admin-view/orders";
import AdminProducts from "./pages/admin-view/products";
import ShoppingCheckout from "./pages/shopping-view/checkout";
import ShoppingHome from "./pages/shopping-view/home";
import ShoppingListing from "./pages/shopping-view/listing";
import ShoppingProfile from "./pages/shopping-view/profile";
import NotFound from "./pages/not-found/index";
import UnAuthPage from "./pages/unauth-page";
import CheckAuth from "./components/common/check-auth";
import { useSelector , useDispatch} from "react-redux";
import { useEffect } from "react";
import { checkAuth } from "./store/authSlice";

function App() {

  const {user, isAuthenticated, isLoading} = useSelector((state) => state.auth);
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(checkAuth());
  }
  , [dispatch]);

  if (isLoading) {
    return null;
  }

  return (
    <div>

      <Routes>
        <Route
          path="/auth"
          element={
            <CheckAuth isAuthenticated={isAuthenticated} user={user}>
              <AuthLayout />
            </CheckAuth>
          }
        >
          <Route path="login" element={<Login />} />
          <Route path="signup" element={<SignUp />} />
        </Route>
        <Route path="/shopping" element={
          <CheckAuth isAuthenticated={isAuthenticated} user={user}>
            <ShoppingView />
          </CheckAuth>
        }>
          <Route path="home" element={<ShoppingHome />} />
          <Route path="listing" element={<ShoppingListing />} />
          <Route path="checkout" element={<ShoppingCheckout />} />
          <Route path="profile" element={<ShoppingProfile />} />
        </Route>
        <Route path="/admin" element={
          <CheckAuth isAuthenticated={isAuthenticated} user={user}>
            <AdminView />
          </CheckAuth>
        }>
          <Route path="dashboard" element={<AdminDashboard />} />
          <Route path="products" element={<AdminProducts />} />
          <Route path="orders" element={<AdminOrders />} />
          <Route path="features" element={<AdminFeatures />} />
        </Route>
        <Route path="*" element={<NotFound />} ></Route>
        <Route path="/unauth-page" element={<UnAuthPage />} />
      </Routes>
    </div>
  )
}

export default App
