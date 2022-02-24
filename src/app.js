 
let elements = {
    pokeStats: null,
    navigator: null
}
const changePage = (page, data) => {
    elements.navigator.pushPage(page, { data });
  }

document.addEventListener('init', (e) => {
        if (e.target.id === 'pokeball') {
      let url = 'https://pokeapi.co/api/v2/pokemon?limit=100';
      let nextPokenumber = 1; // use to keep track of the Pokémon numbers
      elements = {
        navigator: document.querySelector('#navigator')}
      const get = async () => {
        // do the API call and get JSON response
        const response = await fetch(url);
        const json = await response.json();
  
        const newPokemon = json.results.map(e => e.name);
  
        const list = document.querySelector('#pokemon-list');
        newPokemon.forEach(name => {
          list.appendChild(ons.createElement(`
            <ons-list-item modifier="chevron" tappable id="pokeStats" onclick="changePage('pokeStats.html')">
              ${nextPokenumber} ${name}
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
     // target.onInfiniteScroll = (done) => {
      //  if (url) {
      //    setTimeout(() => {
      //      get();
      //      done();
      //    }, 200);
      //  }
      //};
    }
  });