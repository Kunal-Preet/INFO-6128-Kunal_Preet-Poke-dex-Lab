const savePokemon = (pokenumber, button) => {
    addPokemonToGrid(pokenumber);
    button.parentNode.parentNode.hideExpansion();
  };
  
  document.addEventListener('init', ({ target }) => {
    if (target.matches('#pokeball')) {
  
      let url = 'https://pokeapi.co/api/v2/pokemon';
      let nextPokenumber = 1; // use to keep track of the Pokémon numbers
  
      const get = async () => {
        // do the API call and get JSON response
        const response = await fetch(url);
        const json = await response.json();
  
        const newPokemon = json.results.map(e => e.name);
  
        const list = document.querySelector('#pokemon-list');
        newPokemon.forEach(name => {
          list.appendChild(ons.createElement(`
            <ons-list-item expandable>
              ${nextPokenumber} ${name}
              <div class="expandable-content">
                <ons-button onclick="savePokemon(${nextPokenumber}, this)">Save</ons-button>
              </div>
            </ons-list-item>
          `));
          nextPokenumber++;
        });
  
        url = json.next;
  
        // hide the spinner when all the pages have been loaded
        if (!url) {
          document.querySelector('#after-list').style.display = 'none';
        }
      };
  
      // get the first set of results as soon as the page is initialised
      get();
  
      // at the bottom of the list get the next set of results and append them
      target.onInfiniteScroll = (done) => {
        if (url) {
          setTimeout(() => {
            get();
            done();
          }, 200);
        }
      };
    }
  });