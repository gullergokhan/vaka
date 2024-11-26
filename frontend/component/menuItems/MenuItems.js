// MenuItems.js

import React, { useState, useEffect, useRef } from "react";
import Dropdown from "./Dropdown.js";

const MenuItems = ({ items, depthLevel }) => {
    const [dropdown, setDropdown] = useState(false);
    let ref = useRef();

    useEffect(() => {
        // Close dropdown when clicking outside
        const handler = (event) => {
            if (dropdown && ref.current && !ref.current.contains(event.target)) {
                setDropdown(false);
            }
        };
        document.addEventListener("mousedown", handler);
        document.addEventListener("touchstart", handler);
        return () => {
            // Cleanup the event listener on component unmount
            document.removeEventListener("mousedown", handler);
            document.removeEventListener("touchstart", handler);
        };
    }, [dropdown]);

    const onMouseEnter = () => {
        // Open dropdown on hover if window width is greater than 960px
        window.innerWidth > 960 && setDropdown(true);
    };

    const onMouseLeave = () => {
        // Close dropdown on hover out if window width is greater than 960px
        window.innerWidth > 960 && setDropdown(false);
    };
    return (
        <li className="menu-items" ref={ref} onMouseEnter={onMouseEnter} onMouseLeave={onMouseLeave}>
            {items?.submenu ||  items?.SubCategories ? (
                <>
                    {/* Render link/button for submenu */}
                    <a
                        type="button"
                        aria-haspopup="menu"
                        aria-expanded={dropdown ? "true" : "false"}
                        onClick={() => setDropdown((prev) => !prev)}
                        className="menuItemsLink"
                    >
                        {items?.title ? items?.title  : (items?.CategoryTitle ? items?.CategoryTitle: items?.subCategoryTitle)}
                        {" "}
                        {depthLevel > 0 ? <span> &raquo; </span> : <span className="arrow" />}
                    </a>
                    {/* Render nested Dropdown component for submenus */}
                    <Dropdown depthLevel={depthLevel} submenus={items?.submenu ? items?.submenu : items?.SubCategories} dropdown={dropdown} />
                </>
            ) : (
                // Render link for leaf menu items
                <a href={`/categories/${items?.urlPath}`} className="menuItemsLink">
                    {items?.title ? items?.title  : (items?.CategoryTitle ? items?.CategoryTitle: items?.subCategoryTitle)}
                </a>
            )}
        </li>
    );
};

export default MenuItems;