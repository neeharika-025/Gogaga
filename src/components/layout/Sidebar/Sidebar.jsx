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
          active={activeSection === "Dashboard"}
          onClick={() => onSectionChange("Dashboard")}
        />
        <SidebarItem
          icon={<FaUser />}
          label="Leads"
          active={activeSection === "Leads"}
          onClick={() => onSectionChange("Leads")}
        />
        <SidebarItem
          icon={<FaRoute />}
          label="Itineraries"
          active={activeSection === "Itineraries"}
          onClick={() => onSectionChange("Itineraries")}
        />
        <SidebarItem
          icon={<FaClipboardList />}
          label="Google Reviews"
          active={activeSection === "Google Reviews"}
          onClick={() => onSectionChange("Google Reviews")}
        />
        <SidebarItem
          icon={<FaFileInvoice />}
          label="Vouchers"
          active={activeSection === "Vouchers"}
          onClick={() => onSectionChange("Vouchers")}
        />
        <SidebarItem
          icon={<FaWallet />}
          label="Accounts"
          active={activeSection === "Accounts"}
          onClick={() => onSectionChange("Accounts")}
        />
        <SidebarItem
          icon={<FaChartBar />}
          label="Reports"
          active={activeSection === "Reports"}
          onClick={() => onSectionChange("Reports")}
        />
        <SidebarItem
          icon={<FaHeadset />}
          label="Customer Support"
          active={activeSection === "Customer Support"}
          onClick={() => onSectionChange("Customer Support")}
        />
      </div>

      <div className="side-group-title">USER CONTROL</div>
      <div className="side-list">
        <SidebarItem
          icon={<FaCogs />}
          label="User Settings"
          active={activeSection === "User Settings"}
          onClick={() => onSectionChange("User Settings")}
        />
        <SidebarItem
          icon={<FaCogs />}
          label="Masters Settings"
          active={activeSection === "Masters Settings"}
          onClick={() => onSectionChange("Masters Settings")}
        />
        <SidebarItem
          icon={<FaUser />}
          label="HRM"
          active={activeSection === "HRM"}
          onClick={() => onSectionChange("HRM")}
        />
        <SidebarItem
          icon={<FaUsers />}
          label="Assets Management"
          active={activeSection === "Assets Management"}
          onClick={() => onSectionChange("Assets Management")}
        />
      </div>

      <div className="side-group-title">PARTICIPANTS</div>
      <div className="side-list">
        <SidebarItem
          icon={<FaUsers />}
          label="Itinerary Customers"
          active={activeSection === "Itinerary Customers"}
          onClick={() => onSectionChange("Itinerary Customers")}
        />
        <SidebarItem
          icon={<FaUsers />}
          label="Partners"
          active={activeSection === "Partners"}
          onClick={() => onSectionChange("Partners")}
        />
        <SidebarItem
          icon={<FaUsers />}
          label="Suppliers"
          active={activeSection === "Suppliers"}
          onClick={() => onSectionChange("Suppliers")}
        />
      </div>
    </aside>
  );
}

export default Sidebar;
