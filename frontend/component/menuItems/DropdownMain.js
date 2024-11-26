
// DropdownMain.js

import React from "react";
import MenuItems from "./MenuItems";
import "./DropdownMain.css";
import { CategoriesJSON } from "@/constants/Categories";

/*
-----------------------DropdownMain.js-----------------------

   This component serves as the main container for the navigation menu. It imports the menuItems array
   and maps over it to render top-level menu items using the MenuItems component.

-----------------------Dropdown.js-----------------------------

   This component represents a dropdown menu with the ability to have nested submenus.
   It takes in the following props:
   - submenus: an array of submenus to be rendered
   - dropdown: a boolean indicating whether the dropdown is currently open
   - depthLevel: the depth level of the dropdown in the hierarchy

   The component dynamically adjusts its appearance based on the depth level and the number of submenus.
   If the number of submenus is greater than 8, it applies styles for overflow to maintain a consistent UI.

   The component renders a list of submenus using the MenuItems component for each submenu.

-----------------------MenuItems.js-------------------------------

   This component represents an individual menu item, whether it has a submenu or is a leaf item.
   It takes in the following props:
   - items: an object containing information about the menu item
   - depthLevel: the depth level of the menu item in the hierarchy

   The component manages the state for dropdown visibility and utilizes the useRef hook to handle
   clicks outside of the dropdown, closing it when necessary. It also checks the window width to determine
   whether to show the dropdown on hover.

   The component conditionally renders a link/button for submenu items or a link for leaf menu items?.
   For submenu items, it renders a nested Dropdown component for handling nested submenus.

   Note: The actual rendering logic for the MenuItems is encapsulated in the return statement.
*/

const DropdownMain = () => {
    let menuItems = [
        { title: "2NTECH", submenu: Object.values(CategoriesJSON)}
    ];
    return (
        <nav>
            <ul className="menus">
                {menuItems.map((menu, index) => {
                    // Initial depth level for top-level menu items
                    const depthLevel = 0;
                    return <MenuItems items={menu} key={index} depthLevel={depthLevel} />;
                })}
            </ul>
        </nav>
    );
};

export default DropdownMain;