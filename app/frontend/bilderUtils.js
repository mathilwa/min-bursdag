const hentBildeListe = () => {
  this.setState({ henterBilder: true});
  fetch('https://min-bursdag.firebaseio.com/bilder.json').then(response => {
    if (response.ok) {
      response.json().then(bilder => {
        this.byggBildeliste(bilder);
        this.setState({ henterBilder: false});
      });
    }
  }).catch(() => {
    console.log('Kunne ikke hente bilder');
  });
};
