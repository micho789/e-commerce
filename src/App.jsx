import { createBrowserRouter, RouterProvider } from "react-router-dom"
import Home from "./Pages/Home/Home"
import MainLayout from "./Pages/MainLayout/MainLayout"
import Products from "./Pages/Products/Products"
import Login from "./Pages/Login/Login"
import Register from "./Pages/Register/Register"
import NotFound from "./Pages/NotFound/NotFound"
import ProductDetails from "./Pages/ProductDetails/ProductDetails"
import Cart from "./Pages/Cart/Cart"
import Brands from "./Pages/Brands/Brands"
import WishList from "./Pages/WishList/WishList"
import Categories from "./Pages/Categories/Categories"
import ForgetPassword from "./Pages/ForgetPassword/ForgetPassword"
import TokenContextProvider from "./Context/TokenContext"
import ProtectedRoutes from "./Components/ProtectedRoutes/ProtectedRoutes"
import { Offline, Online } from "react-detect-offline"
import { CiWifiOff } from "react-icons/ci"
import CartContextProvider from "./Context/CartContext"
import { Toaster } from "react-hot-toast"
import { QueryClient, QueryClientProvider } from "@tanstack/react-query"
import { ReactQueryDevtools } from "@tanstack/react-query-devtools"
import Checkout from "./Pages/Checkout/Checkout"
import AllOrders from "./Pages/AllOrders/AllOrders"
import WishlistContextProvider from "./Context/WishlistContext"
import icon from "./assets/icon.png";
import { useEffect } from "react"

export default function App() {


  function Favicon(){
    const link = document.querySelector("link[rel~='icon']");
    if (link) {
        link.href = icon;
    }
  }

  useEffect(() => {
      Favicon()
  }, []);

 const routes =  createBrowserRouter(
  [{
    path: "/", 
    element: <MainLayout />,
    children: [
      { index: true, element: <ProtectedRoutes> <Home /> </ProtectedRoutes> },
      { path: "products", element: <ProtectedRoutes> <Products /> </ProtectedRoutes> },
      { path: "login", element: <Login /> },
      { path: "register", element: <Register /> },
      { path: "forgetPassword", element: <ForgetPassword /> },
      { path: "productDetails/:productId", element: <ProtectedRoutes> <ProductDetails /> </ProtectedRoutes> },
      { path: "categories", element: <ProtectedRoutes> <Categories /> </ProtectedRoutes> },
      { path: "cart", element: <ProtectedRoutes> <Cart /> </ProtectedRoutes> },
      { path: "brands", element: <ProtectedRoutes> <Brands /> </ProtectedRoutes> },
      { path: "wishList", element: <ProtectedRoutes> <WishList /> </ProtectedRoutes> },
      { path: "checkout", element: <ProtectedRoutes> <Checkout /> </ProtectedRoutes> },
      { path: "allorders", element: <ProtectedRoutes> <AllOrders /> </ProtectedRoutes> },
      { path: "*", element: <NotFound /> }
    ]
  }],
  { basename: "/e-commerce" }
)
  const queryClient = new QueryClient();
  return (
    <QueryClientProvider client={queryClient}>
  <TokenContextProvider>
    <CartContextProvider>
      <WishlistContextProvider>
    <Offline>
    <div className="fixed bottom-2 right-4 bg-main p-3 rounded font-semibold z-50 text-white">
    <CiWifiOff className="inline mx-3 text-lg" />
    You are Offline now !
    </div>
    </Offline>
    <Toaster position="top-center"/>
    <ReactQueryDevtools />
    <RouterProvider router = {routes}></RouterProvider>
      </WishlistContextProvider>
    </CartContextProvider>
  </TokenContextProvider>
    </QueryClientProvider>

  )
}
