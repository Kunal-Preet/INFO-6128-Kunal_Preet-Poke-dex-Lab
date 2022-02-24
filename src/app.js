 
let elements = {
    pokeStats: null,
    navigator: null,

}
const state={
    sprites: null,
    pokeUrl: null
}
const changePage = (page, data) => {
    elements.navigator.pushPage(page, { data });
    pokeUrl=data;
    console.log(pokeUrl);
  }

document.addEventListener('init', (e) => {
        if (e.target.id === 'pokeball') {
      let url = 'https://pokeapi.co/api/v2/pokemon?limit=100';
      let pokeNumber = 1; // use to keep track of the Pokémon numbers
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
            <ons-list-item modifier="chevron" tappable id="pokeStats" onclick="changePage('pokeStats.html', ${pokeNumber} )">
              ${name}

            </ons-list-item>
          `));
          
          pokeNumber++;
        });
  
        url = json.next;

        if (!url) {
          document.querySelector('#after-list').style.display = 'none';
        }
      };
  
      get();
    }
    if (e.target.id === "stats") {
        let url = "https://pokeapi.co/api/v2/pokemon/"+pokeUrl+"/";

        const get = async () => {
            const response = await fetch(url);
            const jsonResponse = await response.json();
            console.log(jsonResponse);
            state.sprites= jsonResponse.sprites;
            state.name= jsonResponse.name;
            state.types= jsonResponse.types;
            state.stats= jsonResponse.stats;
            state.moves= jsonResponse.moves;
      
            const stats = document.querySelector('#pokemon-stats');
            const pokeName = document.getElementById('pokeName');
            pokeName.textContent=jsonResponse.name;

            
              stats.appendChild(ons.createElement(`
                <ons-list-item>
                ${jsonResponse.sprites}
                </ons-list-item>
              `));
              
              
            
      
            url = json.next;
    
            if (!url) {
              document.querySelector('#after-list').style.display = 'none';
            }
          };
      
          get();
        }
      
  });