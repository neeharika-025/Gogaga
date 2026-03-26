import React from "react";
import { FaChevronDown, FaChevronRight } from "react-icons/fa";
import "./SidebarItem.css";

function SidebarItem({ icon, label, active, collapsed, onClick }) {
  return (
    <button
      type="button"
      className={active ? "side-item active" : "side-item"}
      onClick={onClick}
      title={collapsed ? label : undefined}
      aria-label={label}
    >
      <span className="side-icon">{icon}</span>
      {!collapsed && <span className="side-label">{label}</span>}
      {!collapsed && (
        <span className="side-arrow" aria-hidden="true">
          {active ? <FaChevronDown /> : <FaChevronRight />}
        </span>
      )}
    </button>
  );
}

export default SidebarItem;
