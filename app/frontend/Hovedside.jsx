import React from 'react';
import PropTypes from 'prop-types';

import Filopplaster from './Filopplaster.jsx';
import SeAlleBilderKnapp from './SeAlleBilderKnapp.jsx';

const hideAddressBar = () => {
  if(!window.location.hash) {
    if(document.height < window.outerHeight) {
      document.body.style.height = (window.outerHeight + 50) + 'px';
    }

    setTimeout( function(){ window.scrollTo(0, 1); }, 50 );
  }
};

class Hovedside extends React.Component {
  constructor(props) {
    super(props);
  }

  componentDidMount () {
    if (!window.pageYOffset) {
      hideAddressBar();
    }
    window.addEventListener("orientationchange", hideAddressBar );
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
          <div>
            <img id="preview-image" alt="your image" style={{visibility: 'hidden'}}/>
            <img id="preview-image-mini" alt="your mini-image" style={{visibility: 'hidden'}}/>
          </div>
          <div id="preview-image-container" style={{visibility: 'hidden'}}></div>
          <div id="preview-image-mini-container" style={{visibility: 'hidden'}}></div>
        </main>
      </div>
    );
  }
};

Hovedside.propTypes = {
  history: PropTypes.object.isRequired,
};


export default Hovedside;
