import React, { useEffect, useState } from "react";

export default function Loading({ purpose }) {
  const [data, checkData] = useState(true);
  useEffect(() => {
    const timer = setTimeout(() => {
      checkData(false);
    }, 2000);
    return () => clearTimeout(timer);
  }, []);
  return (
    <div style={{ "marginTop": "1%", "color": "white" }}>
      {data == true ? (
        <>
          <i class="fa fa-spinner fa-pulse fa-3x fa-fw"></i>
          <span style={{ "fontSize": "30px" }}> Loading...</span>
        </>
      ) : (
        <>
          <i class="fa-solid fa-empty-set"></i>
          <span style={{ "fontSize": "30px" }}>{purpose}</span>
        </>
      )}
    </div>
  );
}
