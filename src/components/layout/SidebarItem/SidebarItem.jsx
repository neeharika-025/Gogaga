import React from "react";
import { FaChevronDown, FaChevronRight } from "react-icons/fa";
import "./SidebarItem.css";

function SidebarItem({ icon, label, active, onClick }) {
  return (
    <button
      type="button"
      className={active ? "side-item active" : "side-item"}
      onClick={onClick}
    >
      <span className="side-icon">{icon}</span>
      <span className="side-label">{label}</span>
      <span className="side-arrow" aria-hidden="true">
        {active ? <FaChevronDown /> : <FaChevronRight />}
      </span>
    </button>
  );
}

export default SidebarItem;
