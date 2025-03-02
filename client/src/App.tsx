import './App.css'
import Login from './auth/Login'
import { createBrowserRouter, Navigate, RouterProvider } from 'react-router-dom'
import Signup from './auth/Signup'
import ForgotPassword from './auth/ForgotPassword'
import ResetPassword from './auth/ResetPassword'
import VerifyEmail from './auth/VerifyEmail'
import HeroSection from './components/HeroSection'
import MainLayout from './Layout/MainLayout'
import Profile from './components/Profile'
import SearchPage from './components/SearchPage'
import ShopDetails from './components/ShopDetails'
import Cart from './components/Cart'
import Store from './admin/Store'
import AddProducts from './admin/AddProducts'
import StoreOrders from './admin/StoreOrders'
import OrderPage from './components/OrderPage'
import { useUserStore } from './zustand/useUserStore'
import { useEffect } from 'react'
import Loading from './components/Loading'

const ProtectedRoutes = ({ children }: { children: React.ReactNode }) => {
  const { isAuthenticated, user } = useUserStore();
  if (!isAuthenticated) {
    return <Navigate to="/login" replace={true} />
  }

  if (!user?.isverified) {
    return <Navigate to="/verifyemail" replace={true} />
  }
  return children;
};

const AuthenticatedUser = ({ children }: { children: React.ReactNode }) => {
  const { isAuthenticated, user } = useUserStore();
  if (isAuthenticated && user?.isverified) {
    return <Navigate to="/" replace={true} />
  }
  return children;
};

const AdminRoutes = ({ children }: { children: React.ReactNode }) => {
  const { isAuthenticated, user } = useUserStore();
  if (!isAuthenticated) {
    return <Navigate to="/login" replace={true} />
  }
  if (!user?.admin) {
    return <Navigate to="/" replace={true} />
  }
  return children;
};




const appRouter = createBrowserRouter([
  {
    path: "/",
    element: <ProtectedRoutes><MainLayout /></ProtectedRoutes>,
    children: [
      {
        path: "/",
        element: <HeroSection />
      },
      {
        path: "/profile",
        element: <Profile />
      }, 
      {
        path: "/search/:text",
        element: <SearchPage />
      },
      {
        path: "/shop/:id",
        element: <ShopDetails />
      },
      {
        path: "/cart",
        element: <Cart />
      },
      {
        path: "/order/status",
        element: <OrderPage />
      },

      {/* Admin Routes */},

      {
        path: "/admin/store",
        element: <AdminRoutes><Store /></AdminRoutes>
      },
      {
        path: "/admin/products",
        element: <AdminRoutes><AddProducts /></AdminRoutes>
      },
      {
        path: "/admin/storeOrders",
        element: <AdminRoutes><StoreOrders /></AdminRoutes>
      },

    ]
  },
  {
    path: "/login",
    element: <AuthenticatedUser><Login /></AuthenticatedUser>
  },
  {
    path: "/signup",
    element: <AuthenticatedUser><Signup /></AuthenticatedUser>
  },
  {
    path: "/forgotpassword",
    element: <AuthenticatedUser><ForgotPassword /></AuthenticatedUser>
  },
  {
    path: "/resetpassword",
    element: <ResetPassword />
  },
  {
    path: "/verifyemail",
    element: <VerifyEmail />
  },


])
function App() {
  const { checkAuthentication, isCheckingAuth } = useUserStore();
  useEffect(() => {
    checkAuthentication();
  }, [checkAuthentication])
  if (isCheckingAuth) return <Loading/>
  return (
    <main>
      <RouterProvider router={appRouter} />
    </main>
  )
}

export default App
