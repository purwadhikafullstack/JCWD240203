import React from "react";
import Header from "../header/headerPage";
import FilterBar from "../FilterBar/FilterBar";

export default function HeaderDetail() {
  return (
    <div className="header-detail">
      <Header />
      <div className="header-filter">
        <FilterBar />
      </div>
    </div>
  );
}
