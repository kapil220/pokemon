
const API_BASE_URL = 'https://pokeapi.co/api/v2';

/**

 * @param {number} limit 
 * @param {number} offset 
 * @returns {Promise<Object>} 
 */
export async function getPokemonList(limit = 20, offset = 0) {
  const response = await fetch(`${API_BASE_URL}/pokemon?limit=${limit}&offset=${offset}`);
  
  if (!response.ok) {
    throw new Error('Failed to fetch Pokemon list');
  }
  
  const data = await response.json();
  

  const enhancedResults = data.results.map(pokemon => {
    const id = pokemon.url.split('/').filter(Boolean).pop();
    return {
      ...pokemon,
      id,
      image: `https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/${id}.png`
    };
  });
  
  return {
    ...data,
    results: enhancedResults
  };
}

/**

 * @param {string} idOrName 
 * @returns {Promise<Object>} 
 */
export async function getPokemonDetails(idOrName) {
  const response = await fetch(`${API_BASE_URL}/pokemon/${idOrName}`);
  
  if (!response.ok) {
    throw new Error(`Failed to fetch details for Pokemon: ${idOrName}`);
  }
  
  const data = await response.json();
  return data;
}

/**

 * @param {string} query 
 * @returns {Promise<Array>} 
 */
export async function searchPokemon(query) {
 
  const data = await getPokemonList(150, 0);
  
  if (!query) return data;
  
  const filteredResults = data.results.filter(pokemon => 
    pokemon.name.toLowerCase().includes(query.toLowerCase())
  );
  
  return {
    ...data,
    results: filteredResults
  };
}