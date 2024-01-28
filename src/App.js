import React, { useState } from "react";
import { Layout } from "antd";
import { Route, BrowserRouter as Router, Routes } from "react-router-dom";
import CustomHeader from "./components/Header";
import Navbar from "./components/Navbar";
import CustomContent from "./components/Content";
import { Provider } from "react-redux";
import store from "./store/store";
import Login from "./components/Login";

const App = () => {
  const [collapsed, setCollapsed] = useState(false);

  return (
    <Provider store={store}>
      <div className="container">
        <Router>
          <Routes>
            <Route
              path="/dashboard/*"
              element={
                <Layout>
                  <Navbar collapsed={collapsed} />
                  <Layout>
                    <CustomHeader
                      collapsed={collapsed}
                      setCollapsed={setCollapsed}
                    />
                    <CustomContent />
                  </Layout>
                </Layout>
              }
            />
            <Route path="/login" element={<Login />} />
          </Routes>
        </Router>
      </div>
    </Provider>
  );
};

export default App;
