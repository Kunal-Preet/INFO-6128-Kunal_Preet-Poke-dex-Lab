 
let elements = {
    pokeStats: null,
    navigator: null,

}
const state={
    sprites: null,
    name:null,
    pokeUrl: null,
    types: null,
    stats:null,
    moves:null
}
const changePage = (page, data) => {
    elements.navigator.pushPage(page, { data });
    pokeUrl=data;
    console.log(pokeUrl);
  }

document.addEventListener('init', (e) => {
        if (e.target.id === 'pokeball') {
      let url = 'https://pokeapi.co/api/v2/pokemon?limit=100';
      let pokeNumber = 1; 
      elements = {
        navigator: document.querySelector('#navigator')}
      const get = async () => {
    
        const response = await fetch(url);
        const json = await response.json();
  
        const pokemon = json.results.map(e => e.name);
    
  
        const list = document.querySelector('#pokemon-list');
        pokemon.forEach(name => {
          list.appendChild(ons.createElement(`
          
            <ons-list-item modifier="chevron" tappable tap-background-color= "#f69273"  id="pokeStats" onclick="changePage('pokeStats.html', ${pokeNumber} )">
              ${name} 

            </ons-list-item>
          `));
          
          pokeNumber++;
        });
  
        url = json.next;

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
            pokeName.textContent=state.name;
               
              stats.appendChild(ons.createElement(`
                <ons-list-item>
                ${state.name}
                </ons-list-item>
              `));
              stats.appendChild(ons.createElement(`
                <ons-list-item >
                ${state.sprites}
                </ons-list-item>
              `));
              
              stats.appendChild(ons.createElement(`
                <ons-list-item>
                ${state.stats}
                </ons-list-item>
              `));
              stats.appendChild(ons.createElement(`
                <ons-list-item>
                ${state.moves}
                </ons-list-item>
              `));           
    
          };
      
          get();
        }
      
  });