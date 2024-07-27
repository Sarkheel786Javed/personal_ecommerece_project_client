// import React from 'react';
import { BrowserRouter, Route, Routes } from "react-router-dom";
import Login from "./Components/Login/Login";
import SignUp from "./Components/Login/SignUp.js";
import ForgetPassword from "./Components/Login/ForgetPassword.js";
import Layout from "./app/layout/Layout.js";
import HomePage from "./Components/HomePage/HomePage.js";
import Authorization from './Components/Auth/Auth';
import PrivateRoutes from './Components/PrivateRoutes/PrivateRoutes.js';
import Dashboard from "./Components/Dashboard/Dashboard.js";

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
        <Route path='/auth' element={<Authorization />}>
          <Route path='private' element={<PrivateRoutes />} >
          <Route path='dashboard' element={<Dashboard />} />
          </Route>
        </Route>
      </Routes>
    </BrowserRouter>
  );
}

export default App;
