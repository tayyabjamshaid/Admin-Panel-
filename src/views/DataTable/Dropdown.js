import React, { useState } from "react";
import { BsChevronDown } from "react-icons/bs";

export default function Dropdown({ setITEMS_PER_PAGE, ITEMS_PER_PAGE }) {
  const [dropdownOpen, setDropdownOpen] = useState(true);

  const openDropdown = () => {
    setDropdownOpen(!dropdownOpen);

    let data = document.querySelector(".dropdown-content");

    if (dropdownOpen === true) {
      data.style.display = "block";
    } else {
      data.style.display = "none";
    }
  };

  return (
    <div className="dropdown">
      <button
        className="dropbtn"
        onClick={() => {
          openDropdown();
        }}
      >
        Page Size
        <span style={{ "marginLeft": "10px" }}>
          {" "}
          {ITEMS_PER_PAGE} <BsChevronDown />
        </span>
      </button>
      <div
        className="dropdown-content"
        onClick={() => {
          openDropdown();
        }}
      >
        <a
          onClick={() => {
            setITEMS_PER_PAGE(10);
          }}
        >
          10
        </a>
        <a
          onClick={() => {
            setITEMS_PER_PAGE(20);
          }}
        >
          20
        </a>
        <a
          onClick={() => {
            setITEMS_PER_PAGE(30);
          }}
        >
          30
        </a>
        <a
          onClick={() => {
            setITEMS_PER_PAGE(40);
          }}
        >
          40
        </a>

        <a
          onClick={() => {
            setITEMS_PER_PAGE(50);
          }}
        >
          50
        </a>
      </div>
    </div>
  );
}
