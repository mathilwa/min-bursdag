import React from 'react';
import { HashRouter, Route, Switch } from 'react-router-dom';
import 'babel-polyfill';
import { polyfill } from 'es6-promise';
import { forIn, isEmpty, orderBy } from 'lodash';
polyfill();

import Hovedside from './Hovedside.jsx';
import Bilder from './Bilder.jsx';

class AppRouter extends React.Component {
  render () {
    return (
      <HashRouter>
        <Switch>
          <Route exact path="/" component={Hovedside} />
          <Route exact path="/bilder" component={Bilder} />
        </Switch>
      </HashRouter>
    );
  }
};

export default AppRouter;
