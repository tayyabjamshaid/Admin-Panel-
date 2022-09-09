import React from "react";
import Search from "./Search";
export default function RenderSearch({ setSearch, setCurrentPage }) {
  return (
    <div className="row" style={{ "marginBottom": "1%" }}>
      <div className="col-md-6">
        <Search
          onSearch={(value) => {
            setSearch(value);
            setCurrentPage(1);
          }}
        />
      </div>
    </div>
  );
}
