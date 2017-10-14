import React from 'react';
import { forIn, isEmpty, orderBy } from 'lodash';

import Loader from './Loader.jsx';

class AlleBilder extends React.Component {
  constructor(props) {
    super(props);
  }

  render() {
    if(this.props.henterBilder) {
      return <Loader/>;
    }

    const listUtBilder = () => {
      return this.props.alleBilder.map((bilde, index) => {
        return <div key={index}><img className="" alt="your image" src={bilde.data}/></div>
      })
    };

    return (
      <header>
        {listUtBilder()}
      </header>
    );
  }
};

export default AlleBilder;