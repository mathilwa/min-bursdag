import React from 'react';
import { BrowserRouter, Route, Switch } from 'react-router-dom';
import 'babel-polyfill';
import { polyfill } from 'es6-promise';
import { forIn, isEmpty, orderBy } from 'lodash';
polyfill();

import Hovedside from './Hovedside.jsx';
import Slideshow from './Slideshow.jsx';
import AlleBilderSide from './AlleBilderSide.jsx';

class AppRouter extends React.Component {
  render () {
    return (
      <BrowserRouter>
        <Switch>
          <Route exact path="/" component={Hovedside} />
          <Route exact path="/slideshow" component={Slideshow} />
          <Route exact path="/alle-bilder" component={AlleBilderSide} />
        </Switch>
      </BrowserRouter>
    );
  }
};

export default AppRouter;
