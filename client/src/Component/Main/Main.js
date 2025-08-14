import HomePage from "../Home/HomePage";
import Nav from "./Nav";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import React from "react";
import RegistrationPage from "../Registration/RegistrationPage";
import LoginPage from "../Login/LoginPage";
import CategoryListPage from "../Catalog/CategoryListPage";
import CategoryProductPage from "../Catalog/CategoryProductPage"
import ProductListPage from "../Catalog/ProductListPage";
import ProductDetailPage from "../Catalog/ProductDetailPage";
import AdminHomePage from "../Admin/HomePage/AdminHomePage";
import AdminCategoryListPage from "../Admin/Category/AdminCategoryListPage";
import AdminProductListPage from "../Admin/Products/AdminProductListPage";
import BasketPage from "../order/BasketPage";
import CheckoutPage from "../checkout/CheckoutPage";
import CheckoutPaymentDetailsPage from "../checkout/CheckoutPaymentDetailsPage";
import OrderConfirmationPage from "../checkout/OrderConfirmationPage";
class Main extends React.Component {

  constructor() { // lifecycle
    super();
  }

  componentDidUpdate() {
    console.log("Main component did update");
  }


  render() {

    console.log("Main render method");
    return <BrowserRouter>
      <Routes>
        <Route path="/" element={<Nav />}>
          <Route index element={<HomePage />} />
          <Route path="/register" element={<RegistrationPage />} />
          <Route path="/login" element={<LoginPage />} />
          <Route path="/categories" element={<CategoryListPage />} />
          <Route path="/categories/:id" element={<CategoryProductPage />} />
          <Route path="/shop" element={<ProductListPage />} />
          <Route path="/product-details/:id" element={<ProductDetailPage />} />
          <Route path="/admin-page" element={<AdminHomePage />} />
          <Route path="/admin-category" element={<AdminCategoryListPage />} />
          <Route path="/admin-product" element={<AdminProductListPage />} />
          <Route path="/basket-page" element={<BasketPage />} />
          <Route path="/checkout-page" element={<CheckoutPage />} />
          <Route path="/checkout-payment" element={<CheckoutPaymentDetailsPage />} />
          <Route path="/order-confirm/:orderId" element={<OrderConfirmationPage />} />

        </Route>
      </Routes>
    </BrowserRouter>
  }
}


export default Main;
