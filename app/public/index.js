import React from 'react';
import ReactDOM from 'react-dom';
require('./style/main.less');

import App from './../frontend/App.jsx';

const constraints = { audio: true, video: { width: 1280, height: 720 } };

navigator.mediaDevices.getUserMedia(constraints)
    .then(function(mediaStream) {
      const video = document.querySelector('video');
      video.srcObject = mediaStream;
      video.onloadedmetadata = function(e) {
        video.play();
      };
    })
    .catch(function(err) { console.log(err.name + ": " + err.message); }); // always check for errors at the end.

ReactDOM.render(<App/>, document.getElementById('app'));
