import './App.css'
import Login from './auth/Login'
import { createBrowserRouter, RouterProvider } from 'react-router-dom'
import MainLayout from './MainLayout'
import Signup from './auth/Signup'
import ForgotPassword from './auth/ForgotPassword'
import ResetPassword from './auth/ResetPassword'
import VerifyEmail from './auth/VerifyEmail'
import Navbar from './components/Navbar'

const appRouter = createBrowserRouter([
  {
    path: "/",
    element: <Navbar />,
    // children: [
    //     {
    //         path: "/login",
    //     }
    // ]
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
