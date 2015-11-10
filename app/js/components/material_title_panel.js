import React from 'react';

const styles = {
  root: {
    height: '100%'
  },
  header: {
    // backgroundColor: '#03a9f4',
    // color: 'white',
    // height: '16px',
    // fontSize: '1.5em',
    height: '0px'
  },
};

const MaterialTitlePanel = (props) => {
  const rootStyle = props.style ? {...styles.root, ...props.style} : styles.root;

  return (
    <div style={rootStyle}>
      <div style={styles.header}>{props.title}</div>
      {props.children}
    </div>
  );
};

export default MaterialTitlePanel;
