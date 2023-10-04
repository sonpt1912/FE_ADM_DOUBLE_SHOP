import React, { useState } from "react";
import { Layout } from "antd";
import { BrowserRouter as Router } from "react-router-dom";

import CustomHeader from "./components/Header";
import Navbar from "./components/Navbar";
import CustomContent from "./components/Content";

const App = () => {
  const [collapsed, setCollapsed] = useState(false);

  return (
    <Router>
      <Layout>
        <Navbar collapsed={collapsed} />
        <Layout>
          <CustomHeader collapsed={collapsed} setCollapsed={setCollapsed} />
          <CustomContent />
        </Layout>
      </Layout>
    </Router>
  );
};

export default App;
