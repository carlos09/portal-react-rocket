'use strict';

import React              from 'react';
import {ListenerMixin}    from 'reflux';
import Header             from './components/Header';
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

const propTypes = {
  params: React.PropTypes.object,
  query: React.PropTypes.object,
  children: React.PropTypes.oneOfType([
    React.PropTypes.array,
    React.PropTypes.object
  ])
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

    var headerTitle = this.props.children.props.route.component.displayName;

    if( this.props.children.props.route.path === '/login') {
      return (
          <MaterialTitlePanel title={contentHeader}>
            {this.renderChildren()}
          </MaterialTitlePanel>
      )
    } else {
      return (
        <Sidebar {...sidebarProps}>
          <MaterialTitlePanel title={contentHeader}>
            <Header title={headerTitle} />
            {this.renderChildren()}
          </MaterialTitlePanel>
        </Sidebar>
      )
    }
  },
});

export default App;
