import React from 'react';
import PropTypes from 'prop-types';

import Filopplaster from './Filopplaster.jsx';
import SeAlleBilderKnapp from './SeAlleBilderKnapp.jsx';

class Hovedside extends React.Component {
  constructor(props) {
    super(props);
  }

  componentDidMount () {
    window.scrollTo(0,1);
  }

  render () {
    return (
      <div className="l-content">
        <main>
          <h1>MATTA BLIR <u>30</u>! </h1>
          <Filopplaster/>
          <div className="info-se-alle-bilder">
            <p>Du kan se alle bildene på mobilen også altså</p>
            <SeAlleBilderKnapp history={this.props.history}/>
          </div>
        </main>
      </div>
    );
  }
};

Hovedside.propTypes = {
  history: PropTypes.object.isRequired,
};


export default Hovedside;
