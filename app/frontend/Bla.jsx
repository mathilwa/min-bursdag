import React from 'react';

const Bla = () => {
  return (
    <form>
      <input id="filopplaster" type="file" multiple accept="image/*" capture="camera"/>
      <label htmlFor="filopplaster">
        <i className="fa fa-camera-retro" aria-hidden="true"/>
      </label>
    </form>
  )
};

export default Bla;
