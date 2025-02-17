import './App.css'
import Login from './auth/Login'
import { createBrowserRouter, RouterProvider } from 'react-router-dom'
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



const appRouter = createBrowserRouter([
  {
    path: "/",
    element: <MainLayout />,
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
        path: "/admin/store",
        element: <Store />
      },
      {
        path: "/admin/products",
        element: <AddProducts />
      },
      {
        path: "/admin/storeOrders",
        element: <StoreOrders />
      },

    ]
  },
  {
    path: "/login",
    element: <Login />
  },
  {
    path: "/signup",
    element: <Signup />
  },
  {
    path: "/forgotpassword",
    element: <ForgotPassword />
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

  return (
    <main>
      <RouterProvider router={appRouter} />
    </main>
  )
}

export default App
