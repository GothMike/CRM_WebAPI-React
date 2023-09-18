import { useState, useEffect } from "react";
import { createPortal } from "react-dom";

import { ReactComponent as ArrowMenu } from "../../assets/arrow-sidebar.svg";
import Logo from "../../assets/CRM_logo.webp";

const response = fetch("https://localhost:3001/api/Department", {
  method: "GET",
  headers: {
    "Content-Type": "application/json",
  },
})
  .then((response) => {
    if (!response.ok) {
      throw new Error("Network response was not ok");
    }
    return response.json();
  })
  .then((data) => {
    console.log(data);
  })
  .catch((error) => {
    console.error("There was a problem with the fetch operation:", error);
  });

console.log(response);

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

  const toggleSidebar = () => {
    setSidebarIsOpen(!sidebarIsOpen);
    console.log(sidebarIsOpen);
  };

  const arrowMenuWidth = windowWidth < 768 ? "50px" : "75px";
  const arrowMenuHeight = windowWidth < 768 ? "50px" : "75px";

  const sidebarClosed = sidebarIsOpen ? "sidebar_closed" : "";
  const sidebarItems = sidebarIsOpen ? "sidebar__items_closed" : "";
  const sidebarBtn = sidebarIsOpen ? "sidebar__close_reverse" : "";
  const sidebarOverlay = !sidebarIsOpen ? "sidebar__overlay_active" : "";

  return (
    <>
      <nav className={`sidebar ${sidebarClosed}`}>
        <div className="sidebar__logo">
          <img src={Logo} alt="logo" />
        </div>
        <div className="sidebar__title">StaffPulse</div>
        <ul className={`sidebar__items ${sidebarItems}`}>
          <li className="sidebar__item sidebar__item_active">Департаменты</li>
          <li className="sidebar__item">Должности</li>
          <li className="sidebar__item">Сотрудники</li>
        </ul>
        <div className="sidebar__btn">
          <button onClick={toggleSidebar} className={`sidebar__close ${sidebarBtn}`}>
            <ArrowMenu width={arrowMenuWidth} height={arrowMenuHeight} />
          </button>
        </div>
      </nav>

      {createPortal(
        <div onClick={toggleSidebar} className={`sidebar__overlay ${sidebarOverlay}`}></div>,
        document.body
      )}
    </>
  );
};

export default Sidebar;
