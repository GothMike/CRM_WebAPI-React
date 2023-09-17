import { useState, useEffect } from "react";
import { createPortal } from "react-dom";

import { ReactComponent as ArrowMenu } from "../../assets/arrow-sidebar.svg";
import Logo from "../../assets/CRM_logo.webp";

const Sidebar = () => {
  const [sidebarIsOpen, setSidebarIsOpen] = useState(false);
  const [windowWidth, setWindowWidth] = useState(window.innerWidth);

  useEffect(() => {
    const handleResize = () => {
      setWindowWidth(window.innerWidth);
    };

    window.addEventListener("resize", handleResize);

    return () => {
      window.removeEventListener("resize", handleResize);
    };
  }, []);

  const arrowMenuWidth = windowWidth < 768 ? "50px" : "75px";
  const arrowMenuHeight = windowWidth < 768 ? "50px" : "75px";

  const toggleSidebar = () => {
    setSidebarIsOpen(!sidebarIsOpen);
    console.log(sidebarIsOpen);
  };

  return (
    <>
      <nav className={`sidebar ${sidebarIsOpen ? "sidebar_closed" : ""}`}>
        <div className="sidebar__logo">
          <img className="" src={Logo} />
        </div>
        <div className="sidebar__title">StaffPulse</div>
        <ul className={`sidebar__items ${sidebarIsOpen ? "sidebar__items_closed" : ""}`}>
          <li className="sidebar__item sidebar__item_active">Департаменты</li>
          <li className="sidebar__item">Должности</li>
          <li className="sidebar__item">Сотрудники</li>
        </ul>
        <div className="sidebar__btn">
          <button
            onClick={toggleSidebar}
            className={`sidebar__close ${sidebarIsOpen ? "sidebar__close_reverse" : ""}`}
          >
            <ArrowMenu width={arrowMenuWidth} height={arrowMenuHeight} />
          </button>
        </div>
      </nav>

      {createPortal(
        <div
          onClick={toggleSidebar}
          className={`sidebar__overlay ${!sidebarIsOpen ? "sidebar__overlay_active" : ""}`}
        ></div>,
        document.body
      )}
    </>
  );
};

export default Sidebar;
