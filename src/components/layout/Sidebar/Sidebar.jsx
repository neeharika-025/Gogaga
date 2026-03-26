import React, { useEffect, useState } from "react";
import {
  FaChartBar,
  FaClipboardList,
  FaCogs,
  FaFileInvoice,
  FaFilter,
  FaHeadset,
  FaRoute,
  FaTachometerAlt,
  FaUser,
  FaUsers,
  FaWallet,
} from "react-icons/fa";
import SidebarItem from "../SidebarItem/SidebarItem";
import "./Sidebar.css";

function Sidebar({ sidebarOpen, activeSection, onSectionChange }) {
  const [leadsOpen, setLeadsOpen] = useState(false);

  useEffect(() => {
    if (activeSection === "Leads") {
      setLeadsOpen(true);
      return;
    }

    if (activeSection !== "Leads Menu") {
      setLeadsOpen(false);
    }
  }, [activeSection]);

  const handleLeadsParentClick = () => {
    onSectionChange("Leads Menu");
    setLeadsOpen((prev) => !prev);
  };

  const toggleLeadsDropdown = () => {
    setLeadsOpen((prev) => !prev);
  };

  return (
    <aside className={sidebarOpen ? "sidebar open" : "sidebar"}>
      <div className="side-group-title">MENU</div>
      <div className="side-list">
        <SidebarItem
          icon={<FaTachometerAlt />}
          label="Dashboard"
          collapsed={!sidebarOpen}
          expanded={activeSection === "Dashboard"}
          active={activeSection === "Dashboard"}
          onClick={() => onSectionChange("Dashboard")}
        />
        <SidebarItem
          icon={<FaFilter />}
          label="Leads"
          collapsed={!sidebarOpen}
          expanded={leadsOpen}
          active={activeSection === "Leads"}
          onClick={handleLeadsParentClick}
          onArrowClick={toggleLeadsDropdown}
        />

        {sidebarOpen && leadsOpen && (
          <button
            type="button"
            className={
              activeSection === "Leads"
                ? "sub-side-item active-sub-side-item"
                : "sub-side-item"
            }
            onClick={() => onSectionChange("Leads")}
          >
            <span className="sub-side-icon">
              <FaFilter />
            </span>
            <span className="sub-side-label">Leads</span>
            <span className="sub-side-count">30434</span>
          </button>
        )}

        <SidebarItem
          icon={<FaRoute />}
          label="Itineraries"
          collapsed={!sidebarOpen}
          expanded={activeSection === "Itineraries"}
          active={activeSection === "Itineraries"}
          onClick={() => onSectionChange("Itineraries")}
        />
        <SidebarItem
          icon={<FaClipboardList />}
          label="Google Reviews"
          collapsed={!sidebarOpen}
          expanded={activeSection === "Google Reviews"}
          active={activeSection === "Google Reviews"}
          onClick={() => onSectionChange("Google Reviews")}
        />
        <SidebarItem
          icon={<FaFileInvoice />}
          label="Vouchers"
          collapsed={!sidebarOpen}
          expanded={activeSection === "Vouchers"}
          active={activeSection === "Vouchers"}
          onClick={() => onSectionChange("Vouchers")}
        />
        <SidebarItem
          icon={<FaWallet />}
          label="Accounts"
          collapsed={!sidebarOpen}
          expanded={activeSection === "Accounts"}
          active={activeSection === "Accounts"}
          onClick={() => onSectionChange("Accounts")}
        />
        <SidebarItem
          icon={<FaChartBar />}
          label="Reports"
          collapsed={!sidebarOpen}
          expanded={activeSection === "Reports"}
          active={activeSection === "Reports"}
          onClick={() => onSectionChange("Reports")}
        />
        <SidebarItem
          icon={<FaHeadset />}
          label="Customer Support"
          collapsed={!sidebarOpen}
          expanded={activeSection === "Customer Support"}
          active={activeSection === "Customer Support"}
          onClick={() => onSectionChange("Customer Support")}
        />
      </div>

      <div className="side-group-title">USER CONTROL</div>
      <div className="side-list">
        <SidebarItem
          icon={<FaCogs />}
          label="User Settings"
          collapsed={!sidebarOpen}
          expanded={activeSection === "User Settings"}
          active={activeSection === "User Settings"}
          onClick={() => onSectionChange("User Settings")}
        />
        <SidebarItem
          icon={<FaCogs />}
          label="Masters Settings"
          collapsed={!sidebarOpen}
          expanded={activeSection === "Masters Settings"}
          active={activeSection === "Masters Settings"}
          onClick={() => onSectionChange("Masters Settings")}
        />
        <SidebarItem
          icon={<FaUser />}
          label="HRM"
          collapsed={!sidebarOpen}
          expanded={activeSection === "HRM"}
          active={activeSection === "HRM"}
          onClick={() => onSectionChange("HRM")}
        />
        <SidebarItem
          icon={<FaUsers />}
          label="Assets Management"
          collapsed={!sidebarOpen}
          expanded={activeSection === "Assets Management"}
          active={activeSection === "Assets Management"}
          onClick={() => onSectionChange("Assets Management")}
        />
      </div>

      <div className="side-group-title">PARTICIPANTS</div>
      <div className="side-list">
        <SidebarItem
          icon={<FaUsers />}
          label="Itinerary Customers"
          collapsed={!sidebarOpen}
          expanded={activeSection === "Itinerary Customers"}
          active={activeSection === "Itinerary Customers"}
          onClick={() => onSectionChange("Itinerary Customers")}
        />
        <SidebarItem
          icon={<FaUsers />}
          label="Partners"
          collapsed={!sidebarOpen}
          expanded={activeSection === "Partners"}
          active={activeSection === "Partners"}
          onClick={() => onSectionChange("Partners")}
        />
        <SidebarItem
          icon={<FaUsers />}
          label="Suppliers"
          collapsed={!sidebarOpen}
          expanded={activeSection === "Suppliers"}
          active={activeSection === "Suppliers"}
          onClick={() => onSectionChange("Suppliers")}
        />
      </div>
    </aside>
  );
}

export default Sidebar;
