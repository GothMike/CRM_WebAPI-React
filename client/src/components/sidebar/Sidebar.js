import { useState, useEffect } from "react";
import { createPortal } from "react-dom";
import { useDispatch, useSelector } from "react-redux";
import { toogleSidebar } from "../searchPanel/searchPanelSlice";

import { Link, NavLink } from "react-router-dom";
import { ReactComponent as ArrowMenu } from "../../assets/arrow-sidebar.svg";
import Logo from "../../assets/CRM_logo.webp";

const Sidebar = () => {
  const [windowWidth, setWindowWidth] = useState(window.innerWidth);
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

  const arrowMenuWidth = windowWidth < 768 ? "50px" : "75px";
  const arrowMenuHeight = windowWidth < 768 ? "50px" : "75px";

  const sidebarClosed = hiddenSidebar ? "sidebar_closed" : "";
  const sidebarItems = hiddenSidebar ? "sidebar__items_closed" : "";
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
        <ul className={`sidebar__items ${sidebarItems}`}>
          <NavLink
            style={({ isActive }) => ({
              backgroundColor: isActive ? " var(--hover-color)" : "",
            })}
            to="/"
            className={`sidebar__item`}
          >
            Департаменты
          </NavLink>
          <NavLink
            style={({ isActive }) => ({
              backgroundColor: isActive ? " var(--hover-color)" : "",
            })}
            to="/position"
            className={`sidebar__item ${({ isActive }) =>
              isActive ? "sidebar__item_active" : ""}`}
          >
            Должности
          </NavLink>
          <NavLink
            style={({ isActive }) => ({
              backgroundColor: isActive ? " var(--hover-color)" : "",
            })}
            to="/employee"
            className={`sidebar__item`}
          >
            Сотрудники
          </NavLink>
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
