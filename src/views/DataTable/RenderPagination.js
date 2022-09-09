import React from "react";
import Pagination from "./Pagination";
export default function RenderPagination({
  totalItems,
  ITEMS_PER_PAGE,
  currentPage,
  setCurrentPage,
}) {
  return (
    <div className="row">
      <div className="col-md-6">
        <Pagination
          itemsCount={totalItems}
          itemsPerPage={ITEMS_PER_PAGE}
          currentPage={currentPage}
          setCurrentPage={(page) => setCurrentPage(page)}
          alwaysShown={false}
        />
      </div>
    </div>
  );
}
