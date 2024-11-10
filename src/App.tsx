// import React from 'react';
import { BrowserRouter, Route, Routes } from "react-router-dom";
import Login from "./Components/Login/Login";
import SignUp from "./Components/Login/SignUp";
import ForgetPassword from "./Components/Login/ForgetPassword";
import Layout from "./app/layout/Layout";
import HomePage from "./Components/HomePage/HomePage";
import ProductViewDetail from "./Components/ProductViewDetail/ProductViewDetail";
import Authorization from "./app/Auth/Auth";
import PrivateRoutes from "./app/PrivateRoutes/DashboardWrapper";
import Dashboard from "./Components/Dashboard/Dashboard";
import ManageProduct from './Components/departmentManagement/ManageProduct/ManageProduct';
import AdminApprovedDpartmentRequest from './Components/AdminApprovedDpartmentRequest/AdminApprovedDpartmentRequest';
import ManageProductCategory from "./Components/departmentManagement/ManageProductCategory/ManageProductCategory";
function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route
          path="/"
          element={
            <Layout>
              <HomePage />
            </Layout>
          }
        />
        <Route
          path="/view-product-details"
          element={
            <Layout>
              <ProductViewDetail />
            </Layout>
          }
        />
        <Route
          path="/login"
          element={
            <Layout>
              <Login />
            </Layout>
          }
        />
        <Route
          path="/signup"
          element={
            <Layout>
              <SignUp />
            </Layout>
          }
        />
        <Route
          path="/forget"
          element={
            <Layout>
              <ForgetPassword />
            </Layout>
          }
        />
        <Route path="/auth" element={ <Authorization><PrivateRoutes /></Authorization>}>
          <Route path="dashboard" element={<Dashboard />}/>
          <Route path="manage-product" element={<ManageProduct />}/>
          <Route path="user_request_for_department" element={<AdminApprovedDpartmentRequest />}/>
          <Route path="manage-product-category" element={<ManageProductCategory />}/>
        </Route>
      </Routes>
    </BrowserRouter>
  );
}

export default App;
