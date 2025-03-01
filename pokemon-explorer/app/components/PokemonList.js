
import PokemonCard from './PokemonCard';

export default function PokemonList({ pokemonList }) {
  if (!pokemonList || pokemonList.length === 0) {
    return (
      <div className="flex justify-center items-center p-8">
        <p className="text-gray-500 text-xl">No Pokemon found. Try a different search.</p>
      </div>
    );
  }
  
  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-6">
      {pokemonList.map(pokemon => (
        <PokemonCard key={pokemon.id} pokemon={pokemon} />
      ))}
    </div>
  );
}