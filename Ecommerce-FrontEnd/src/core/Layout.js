import React, { Fragment } from "react";
import styles from "./Layout.module.css";
import Menu from "./Menu";
import UserLinks from "../userComponents/UserLinks";
import AdminLinks from "../admin/AdminLinks";
import { isAuthenticated } from "../Auth/index";
import { Link } from "react-router-dom";

const Layout = ({
  title = "Title",
  description = "description",
  className,
  children,
}) => {
  const { user } = isAuthenticated();

  const DashboardLinks = () => {
    if (user.role == 1) return <AdminLinks />;
    else return <UserLinks />;
  };

  return (
    <React.Fragment>
      {/* for actual content user routed to */}

      <div className={styles.container}>
        {/* for dashboard link */}
        <div className={styles.containerLeft}>
          <DashboardLinks />
        </div>

        <div className={styles.containerRight}>
          <div className={styles.heading}>
            <h1>{title}</h1>
            <p className="lead">{description}</p>
          </div>
          <div className={className}>{children}</div>
        </div>
      </div>

    </React.Fragment>
  );
};
export default Layout;
