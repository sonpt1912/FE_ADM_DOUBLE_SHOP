import React, { useState, useEffect } from "react";

const ShipperSell = ({ currentTab }) => {
  useEffect(() => {
    console.log("Current tab normalSell:", currentTab);
  }, [currentTab]);

  return (
    <>
      <h2>Content of Tab Shipper {currentTab}</h2>
      <div>{currentTab}</div>
    </>
  );
};

export default ShipperSell;
