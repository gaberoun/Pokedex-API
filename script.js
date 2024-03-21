function addCard(pokemonName, pokemonImage) {
  const newDiv = document.createElement('div');
  newDiv.classList = 'card';

  const name = document.createElement('span');
  name.innerHTML = pokemonName;

  const image = document.createElement('img');
  image.src = pokemonImage;

  newDiv.appendChild(image);
  newDiv.appendChild(name);
  document.getElementById('container').appendChild(newDiv);
}

async function fetchImage(url) {
  try {
    const response = await fetch(url);
    if (!response.ok) {
      throw new Error('There is a problem fetching the data in getPokemons().')
    }

    const data = await response.json();
    return data.sprites.front_default;
    
  } catch (error) {
    console.log('Error fetching pokemon image');
  }
}

async function fetchPokedex(limit = 151, offset = 0) {
  try {
    const response = await fetch(`https://pokeapi.co/api/v2/pokemon/?limit=${limit}&offset=${offset}`);
    const data = await response.json();
    
    data.results.map(async (pokemon) => {
      const name = pokemon.name;
      const image = await fetchImage(pokemon.url);

      addCard(name, image);
    });

  } catch (error) {
    console.log('Error fetching pokedex');
  }
}

fetchPokedex();