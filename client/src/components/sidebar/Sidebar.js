import { useState, useEffect } from "react";
import { createPortal } from "react-dom";
import { useDispatch, useSelector } from "react-redux";
import { toogleSidebar } from "../searchPanel/searchPanelSlice";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

import { Link, NavLink } from "react-router-dom";
import { ReactComponent as ArrowMenu } from "../../assets/arrow-sidebar.svg";
import Logo from "../../assets/CRM_logo.webp";

const Sidebar = () => {
  const [windowWidth, setWindowWidth] = useState(window.innerWidth);
  const [activeTab, setActiveTab] = useState("department");
  const hiddenSidebar = useSelector((state) => state.searchPanel);
  const dispatch = useDispatch();

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
    dispatch(toogleSidebar());
  };

  const chooseTab = (tabBool) => {
    return {
      backgroundColor: tabBool ? " var(--hover-color)" : "",
    };
  };
  const arrowMenuWidth = windowWidth < 768 ? "50px" : "75px";
  const arrowMenuHeight = windowWidth < 768 ? "50px" : "75px";

  const sidebarClosed = hiddenSidebar ? "sidebar_closed" : "";
  const sidebarItemClosed = hiddenSidebar ? "sidebar__item_closed" : "";
  const sidebarDescr = hiddenSidebar ? "sidebar__descr_closed" : "";
  const sidebarBtn = hiddenSidebar ? "sidebar__close_reverse" : "";
  const sidebarOverlay = !hiddenSidebar ? "sidebar__overlay_active" : "";

  return (
    <>
      <nav className={`sidebar ${sidebarClosed}`}>
        <div className="sidebar__wrapper">
          <Link to="/" className="sidebar__logo">
            <img src={Logo} alt="logo" />
          </Link>
          <div className="sidebar__title">StaffPulse</div>
        </div>
        <div className={`sidebar__items`}>
          <NavLink
            onClick={() => setActiveTab("department")}
            style={({ isActive }) => chooseTab(isActive)}
            to="/"
            className={`sidebar__item ${sidebarItemClosed}`}
          >
            <FontAwesomeIcon
              icon="fa-solid fa-building-user"
              size="2xl"
              style={{ color: activeTab === "department" ? "var(--bs-warning)" : "" }}
            />
            <div className={`sidebar__descr ${sidebarDescr}`}>Департаменты</div>
          </NavLink>
          <NavLink
            onClick={() => setActiveTab("position")}
            style={({ isActive }) => chooseTab(isActive)}
            to="/position"
            className={`sidebar__item ${sidebarItemClosed}`}
          >
            <FontAwesomeIcon
              icon="fa-solid fa-users"
              size="2xl"
              style={{ color: activeTab === "position" ? "var(--bs-warning)" : "" }}
            />
            <div className={`sidebar__descr ${sidebarDescr}`}>Должности</div>
          </NavLink>
          <NavLink
            onClick={() => setActiveTab("employee")}
            style={({ isActive }) => chooseTab(isActive)}
            to="/employee"
            className={`sidebar__item ${sidebarItemClosed}`}
          >
            <FontAwesomeIcon
              icon="fa-solid fa-user"
              size="2xl"
              style={{ color: activeTab === "employee" ? "var(--bs-warning)" : "" }}
            />
            <div className={`sidebar__descr ${sidebarDescr}`}>Сотрудники</div>
          </NavLink>
        </div>
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
