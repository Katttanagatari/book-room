import { Avatar, Skeleton } from "@mui/material";
import CalendarMonthIcon from "@mui/icons-material/CalendarMonth";
import "./Header.css";

import { NavLink } from "react-router-dom";
import useUser from "../../../entities/user/model/useUser";

function Header() {
  const { user, isLoading } = useUser();
  return (
    <header className="header">
      <div className="header__content">
        <div className="header__brand">
          <div className="header__logo">
            <CalendarMonthIcon
              className="header__logo-icon"
              sx={{
                fontSize: 24,
                color: "#fff",
              }}
            />
          </div>

          <span className="header__title">BookRoom</span>
        </div>

        <nav className="header__navigation">
          <NavLink
            to="/rooms"
            className={({ isActive }) =>
              `header__link ${isActive ? "header__link--active" : ""}`
            }
          >
            Переговорные
          </NavLink>

          <NavLink
            to="/bookings"
            className={({ isActive }) =>
              `header__link ${isActive ? "header__link--active" : ""}`
            }
          >
            Мои бронирования
          </NavLink>
        </nav>

        <div className="header__user">
          {isLoading ? (
            <Skeleton variant="text" width={100} height={24} />
          ) : (
            <span className="header__user-name">{user?.displayName}</span>
          )}

          {isLoading ? (
            <Skeleton
              variant="circular"
              width={40}
              height={40}
              className="header__avatar"
            />
          ) : (
            <Avatar
              className="header__avatar"
              sx={{
                bgcolor: "#5478D9",
                fontSize: "14px",
              }}
            >
              {user?.initials}
            </Avatar>
          )}
        </div>
      </div>
    </header>
  );
}

export default Header;
