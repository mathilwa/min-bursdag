import React from 'react';

const VisibleIf = ({isVisible, children}) => {
  if (isVisible) {
    return children;
  }
  return <noscript/>;
};

VisibleIf.propTypes = {
  isVisible: React.PropTypes.bool.isRequired,
  children: React.PropTypes.element.isRequired,
};

export default VisibleIf;