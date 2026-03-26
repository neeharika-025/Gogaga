import React from "react";
import { FaChevronDown, FaChevronRight } from "react-icons/fa";
import "./SidebarItem.css";

function SidebarItem({
  icon,
  label,
  active,
  expanded,
  collapsed,
  onClick,
  onArrowClick,
}) {
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
        <button
          type="button"
          className="side-arrow-btn"
          aria-label={expanded ? `Collapse ${label}` : `Expand ${label}`}
          onClick={(event) => {
            event.stopPropagation();
            if (onArrowClick) {
              onArrowClick();
            }
          }}
        >
          <span className="side-arrow" aria-hidden="true">
            {expanded ? <FaChevronDown /> : <FaChevronRight />}
          </span>
        </button>
      )}
    </button>
  );
}

export default SidebarItem;
