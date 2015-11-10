'use strict';

import React              from 'react/addons';
import {ListenerMixin}    from 'reflux';

import CurrentUserActions from './actions/CurrentUserActions';
import CurrentUserStore   from './stores/CurrentUserStore';
import Sidebar             from './components/Sidebar';
import ReactDOM from 'react-dom';
import MaterialTitlePanel from './components/material_title_panel';
import SidebarContent from './components/sidebar_content';

const styles = {
  contentHeaderMenuLink: {
    textDecoration: 'none',
    color: '#ff3d00',
    padding: 8,
  },
  content: {
    padding: '16px',
  },
};

const App = React.createClass({
  getInitialState() {
    return {docked: false, open: false};
  },

  componentWillMount() {
    const mql = window.matchMedia(`(min-width: 800px)`);
    mql.addListener(this.mediaQueryChanged);
    this.setState({mql: mql, docked: mql.matches});
  },

  componentWillUnmount() {
    this.state.mql.removeListener(this.mediaQueryChanged);
  },

  onSetOpen(open) {
    this.setState({open: open});
  },

  mediaQueryChanged() {
    this.setState({docked: this.state.mql.matches});
  },

  toggleOpen(ev) {
    this.setState({open: !this.state.open});

    if (ev) {
      ev.preventDefault();
    }
  },
  renderChildren() {
    console.log('query: ', this.props.query);
    return React.cloneElement(this.props.children, {
      params: this.props.params,
      query: this.props.query,
      currentUser: this.state.currentUser
    });
  },
  render() {
    const sidebar = <SidebarContent />;

    const contentHeader = (
      <span>
        {!this.state.docked &&
         <a onClick={this.toggleOpen} href="#" style={styles.contentHeaderMenuLink}><i className="fa fa-bars"></i></a>}
      </span>);

    const sidebarProps = {
      sidebar: sidebar,
      docked: this.state.docked,
      open: this.state.open,
      onSetOpen: this.onSetOpen,
    };

    return (
      <Sidebar {...sidebarProps}>
        <MaterialTitlePanel title={contentHeader}>
          {this.renderChildren()}
        </MaterialTitlePanel>
      </Sidebar>
    );
  },
});

export default App;
