import React from 'react';
import ReactDOM from 'react-dom';
require('./style/main.less');

import AppRouter from '../frontend/AppRouter.jsx';

ReactDOM.render(<AppRouter/>, document.getElementById('app'));
