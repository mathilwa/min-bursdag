import React from 'react';

class AppLayout extends React.Component {
  constructor(props) {
    super(props);
  }

  render () {
    return (
      <div>
        {this.props.children}
      </div>
    );
  }
};

export default AppLayout;