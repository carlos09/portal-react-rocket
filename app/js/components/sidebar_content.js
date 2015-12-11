import React from 'react';
import MaterialTitlePanel from './material_title_panel';
import { Grid, Row, Col, Form } from 'react-bootstrap';
import {Link}        from 'react-router';

const styles = {
  sidebar: {
    width: 256,
    height: '100%',
  },
  sidebarLink: {
    display: 'block',
    padding: '16px 0px',
    color: '#757575',
    textDecoration: 'none',
  },
  divider: {
    margin: '8px 0',
    height: 1,
    backgroundColor: '#757575',
  },
  content: {
    padding: '16px',
    height: '100%',
    backgroundColor: 'white',
  },
};

const SidebarContent = (props) => {
  const style = props.style ? {...styles.sidebar, ...props.style} : styles.sidebar;

  const links = [];

  for (let ind = 0; ind < 10; ind++) {
    links.push(
      <a key={ind} href="#" style={styles.sidebarLink}>Mock menu item {ind}</a>);
  }

  return (
    <MaterialTitlePanel style={style}>
      <div id="sidebar">
          <div className="text-center profile-welcome">
            <Link to="/"><img className="st-logo" src="/images/logos/station-logo.png" /></Link>
              <div className="avatar"></div>

              <div className="welcome">Hello, Private Label</div>
            </div>
            <div className="text-center">
            <ul id="nav-list">
              <li><Link to="/"><i className="zmdi zmdi-view-dashboard"></i> Dashboard</Link></li>
              <li><Link to="/affiliates"><i className="zmdi zmdi-account-box"></i> Affiliates</Link></li>
              <li><Link to="/stations"><i className="material-icons md-24">wifi_tethering</i> Stations</Link></li>
              <li><Link to="/users"><i className="zmdi zmdi-accounts"></i> Users</Link></li>
              <li><Link to="/login"><i className="material-icons md-24">keyboard_tab</i> Login</Link></li>
            </ul>
          </div>
      </div>
    </MaterialTitlePanel>
  );
};

export default SidebarContent;
