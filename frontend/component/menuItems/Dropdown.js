// Dropdown.js

import React from "react";
import MenuItems from "./MenuItems";

const Dropdown = ({ submenus, dropdown, depthLevel }) => {
    // Increment depth level for nested dropdowns
    depthLevel = depthLevel + 1;
    const dropdownClass = depthLevel > 1 ? "dropdown-submenu" : "";

    // Apply styles for overflow if there are more than 8 submenus
    const shouldApplyOverflow = submenus.length > 8;
    const dropdownStyle = shouldApplyOverflow ? { maxHeight: "500px", overflowY: "auto", overflowX: "hidden" } : {};

    return (
        <ul className={`dropdown ${dropdownClass} ${dropdown ? "show" : ""}`} style={dropdownStyle}>
            {submenus.map((submenu, index) => (
                // Render MenuItems for each submenu
                <MenuItems items={submenu} key={index} depthLevel={depthLevel} />
            ))}
        </ul>
    );
};

export default Dropdown;