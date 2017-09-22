import React from 'react';

const hei = () => {
  const reader = new FileReader();
  reader.onload = (e) => {
    document.getElementById("preview-image").src = e.target.result;
  };
  reader.readAsDataURL(document.getElementById('filopplaster').files[0]);
};

const Bla = () => {
  return (
    <form>
      <input id="filopplaster" type="file" multiple accept="image/*" capture="camera" onChange={hei}/>
      <label htmlFor="filopplaster">
        <i className="fa fa-camera-retro" aria-hidden="true"/>
      </label>
      <button>Lagre bilde</button>
      <img id="preview-image" alt="your image" width="auto" height="200em" />

    </form>
  )
};

export default Bla;
