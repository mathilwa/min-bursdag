import React from 'react';
import VisibleIf from './VisibleIf.jsx';
import { isEmpty } from 'lodash';

class Filopplaster extends React.Component {
  constructor(props) {
    super(props);
    this.settPreviewBilde = this.settPreviewBilde.bind(this);
    this.lagreBilde = this.lagreBilde.bind(this);
    this.slettBilde = this.slettBilde.bind(this);
    this.clearBildeFraState = this.clearBildeFraState.bind(this);
    this.state = {
      bilde: '',
    }
  }

  settPreviewBilde () {
    const reader = new FileReader();
    reader.onload = (e) => {
      document.getElementById("preview-image").src = e.target.result;
      this.setState({bilde: e.target.result});
    };
    reader.readAsDataURL(document.getElementById('filopplaster').files[0]);
  }

  lagreBilde (event) {
    event.preventDefault();
    const bildedata = document.getElementById("preview-image").src;
    const file = document.getElementById('filopplaster').files[0];

    const headers = new Headers();
    headers.append('Content-Type', 'application/json');

    const bildeForLagring = {
      data: bildedata,
      filnavn: file.name,
      storrelse: file.size,
    };

    fetch('https://min-bursdag.firebaseio.com/bilder.json', {
      method: 'post',
      headers: headers,
      body: JSON.stringify(bildeForLagring),
    });
    this.slettBilde();
  }

  slettBilde () {
    document.getElementById("preview-image").src = undefined;
    this.clearBildeFraState();
  }

  clearBildeFraState () {
    this.setState({ bilde: ''});
  }

  render() {
    const lagreknappSkalVises = !isEmpty(this.state.bilde);
    const filopplasterSkalVises = isEmpty(this.state.bilde);

    return (
        <form>
          <VisibleIf isVisible={filopplasterSkalVises}>
            <div>
              <input id="filopplaster" type="file" multiple accept="image/*" capture="camera" onChange={this.settPreviewBilde}/>
              <label htmlFor="filopplaster">
                <i className="fa fa-camera-retro" aria-hidden="true"/>
              </label>
            </div>
          </VisibleIf>
          <img id="preview-image" alt="your image" width="auto" height="200em"/>
          <VisibleIf isVisible={lagreknappSkalVises}>
            <div>
              <button className="knapp" onClick={(event) => this.lagreBilde(event)}>Lagre bilde</button>
              <button className="knapp" onClick={(event) => this.slettBilde(event)}>Slett bilde</button>
            </div>
          </VisibleIf>

        </form>
    )
  }
};

export default Filopplaster;
