let url = 'https://pokeapi.co/api/v2/pokemon?limit=100';
let nextPokenumber = 1; // use to keep track of the Pokémon numbers

const get = async () => {
  // do the API call and get JSON response
  const response = await fetch(url);
  const json = await response.json();

  const newPokemon = json.results.map(e => e.name);

  const list = document.querySelector('#pokemon-list');
  newPokemon.forEach(name => {
    list.appendChild(ons.createElement(`
      <ons-list-item expandable >
        ${nextPokenumber} ${name}
        <div class="expandable-content">
          <ons-button onclick="savePokemon(${nextPokenumber}, this)">Save</ons-button>
        </div>
      </ons-list-item>
    `));
    nextPokenumber++;
  });

  url = json.next;
};