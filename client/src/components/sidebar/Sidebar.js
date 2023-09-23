import { useState, useEffect } from "react";
import { createPortal } from "react-dom";
import { useDispatch, useSelector } from "react-redux";
import { toogleSidebar } from "../searchPanel/searchPanelSlice";

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
          <div className="sidebar__logo">
            <img src={Logo} alt="logo" />
          </div>
          <div className="sidebar__title">StaffPulse</div>
        </div>
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
