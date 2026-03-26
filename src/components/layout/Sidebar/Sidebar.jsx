import React from "react";
import {
  FaChartBar,
  FaClipboardList,
  FaCogs,
  FaFileInvoice,
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
  return (
    <aside className={sidebarOpen ? "sidebar open" : "sidebar"}>
      <div className="side-group-title">MENU</div>
      <div className="side-list">
        <SidebarItem
          icon={<FaTachometerAlt />}
          label="Dashboard"
          collapsed={!sidebarOpen}
          active={activeSection === "Dashboard"}
          onClick={() => onSectionChange("Dashboard")}
        />
        <SidebarItem
          icon={<FaUser />}
          label="Leads"
          collapsed={!sidebarOpen}
          active={activeSection === "Leads"}
          onClick={() => onSectionChange("Leads")}
        />
        <SidebarItem
          icon={<FaRoute />}
          label="Itineraries"
          collapsed={!sidebarOpen}
          active={activeSection === "Itineraries"}
          onClick={() => onSectionChange("Itineraries")}
        />
        <SidebarItem
          icon={<FaClipboardList />}
          label="Google Reviews"
          collapsed={!sidebarOpen}
          active={activeSection === "Google Reviews"}
          onClick={() => onSectionChange("Google Reviews")}
        />
        <SidebarItem
          icon={<FaFileInvoice />}
          label="Vouchers"
          collapsed={!sidebarOpen}
          active={activeSection === "Vouchers"}
          onClick={() => onSectionChange("Vouchers")}
        />
        <SidebarItem
          icon={<FaWallet />}
          label="Accounts"
          collapsed={!sidebarOpen}
          active={activeSection === "Accounts"}
          onClick={() => onSectionChange("Accounts")}
        />
        <SidebarItem
          icon={<FaChartBar />}
          label="Reports"
          collapsed={!sidebarOpen}
          active={activeSection === "Reports"}
          onClick={() => onSectionChange("Reports")}
        />
        <SidebarItem
          icon={<FaHeadset />}
          label="Customer Support"
          collapsed={!sidebarOpen}
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
          active={activeSection === "User Settings"}
          onClick={() => onSectionChange("User Settings")}
        />
        <SidebarItem
          icon={<FaCogs />}
          label="Masters Settings"
          collapsed={!sidebarOpen}
          active={activeSection === "Masters Settings"}
          onClick={() => onSectionChange("Masters Settings")}
        />
        <SidebarItem
          icon={<FaUser />}
          label="HRM"
          collapsed={!sidebarOpen}
          active={activeSection === "HRM"}
          onClick={() => onSectionChange("HRM")}
        />
        <SidebarItem
          icon={<FaUsers />}
          label="Assets Management"
          collapsed={!sidebarOpen}
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
          active={activeSection === "Itinerary Customers"}
          onClick={() => onSectionChange("Itinerary Customers")}
        />
        <SidebarItem
          icon={<FaUsers />}
          label="Partners"
          collapsed={!sidebarOpen}
          active={activeSection === "Partners"}
          onClick={() => onSectionChange("Partners")}
        />
        <SidebarItem
          icon={<FaUsers />}
          label="Suppliers"
          collapsed={!sidebarOpen}
          active={activeSection === "Suppliers"}
          onClick={() => onSectionChange("Suppliers")}
        />
      </div>
    </aside>
  );
}

export default Sidebar;
