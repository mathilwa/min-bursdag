import React from 'react';
import PropTypes from 'prop-types';

const gaTilAlleBilder = (event, history) => {
  event.preventDefault();
  history.push('/alle-bilder')
};

const SeAlleBilderKnapp = ({history}) => {
  return <a className="knapp-se-alle-bilder" onClick={(event) => gaTilAlleBilder(event, history)}>Se alle bilder</a>
};

SeAlleBilderKnapp.propTypes = {
  history: PropTypes.object.isRequired,
};

export default SeAlleBilderKnapp;