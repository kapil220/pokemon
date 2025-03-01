
import Image from 'next/image';
import Link from 'next/link';
import StatsBar from './StatsBar';

export default function PokemonDetail({ pokemon }) {
  if (!pokemon) return null;
  
  const {
    id,
    name,
    sprites,
    types,
    abilities,
    height,
    weight,
    stats,
    moves
  } = pokemon;
  
  
  const formattedName = name.charAt(0).toUpperCase() + name.slice(1);
  

  const formattedId = String(id).padStart(3, '0');
  

  const getPokemonTypeColor = (type) => {
    const typeColors = {
      normal: 'bg-gray-400',
      fire: 'bg-red-500',
      water: 'bg-blue-500',
      electric: 'bg-yellow-400',
      grass: 'bg-green-500',
      ice: 'bg-blue-200',
      fighting: 'bg-red-700',
      poison: 'bg-purple-500',
      ground: 'bg-yellow-600',
      flying: 'bg-indigo-300',
      psychic: 'bg-pink-500',
      bug: 'bg-green-400',
      rock: 'bg-yellow-700',
      ghost: 'bg-purple-700',
      dragon: 'bg-indigo-700',
      dark: 'bg-gray-700',
      steel: 'bg-gray-500',
      fairy: 'bg-pink-300',
    };
    
    return typeColors[type] || 'bg-gray-400';
  };
  
  return (
    <div className="bg-white rounded-lg shadow-lg overflow-hidden">
     
      <div className="p-4 bg-gray-50">
        <Link 
          href="/"
          className="flex items-center text-blue-600 hover:underline"
        >
          <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-1" viewBox="0 0 20 20" fill="currentColor">
            <path fillRule="evenodd" d="M9.707 16.707a1 1 0 01-1.414 0l-6-6a1 1 0 010-1.414l6-6a1 1 0 011.414 1.414L5.414 9H17a1 1 0 110 2H5.414l4.293 4.293a1 1 0 010 1.414z" clipRule="evenodd" />
          </svg>
          Back to List
        </Link>
      </div>
      
     
      <div className="px-6 py-4 flex justify-between items-center">
        <div>
          <p className="text-gray-500">#{formattedId}</p>
          <h1 className="text-3xl font-bold text-gray-800">{formattedName}</h1>
          <div className="flex mt-2 space-x-2">
            {types.map(({ type }) => (
              <span 
                key={type.name}
                className={`text-xs font-semibold px-3 py-1 rounded-full text-white ${getPokemonTypeColor(type.name)}`}
              >
                {type.name.toUpperCase()}
              </span>
            ))}
          </div>
        </div>
        <div className="w-32 h-32 flex-shrink-0">
          <Image 
            src={sprites.other['official-artwork'].front_default || sprites.front_default}
            alt={`${formattedName} image`}
            width={128}
            height={128}
            priority
          />
        </div>
      </div>
      
  
      <div className="px-6 py-4 grid grid-cols-1 md:grid-cols-2 gap-8">
        
        <div>
          <h2 className="text-xl font-semibold mb-4 text-gray-800">Base Stats</h2>
          <div className="space-y-2">
            {stats.map(stat => (
              <StatsBar 
                key={stat.stat.name} 
                stat={{ 
                  name: stat.stat.name, 
                  value: stat.base_stat 
                }} 
              />
            ))}
          </div>
          
          <h2 className="text-xl font-semibold mt-6 mb-4 text-gray-800">Physical</h2>
          <div className="grid grid-cols-2 gap-4">
            <div className="bg-gray-100 p-4 rounded-lg text-center">
              <p className="text-sm text-gray-500">Height</p>
              <p className="text-lg font-medium">{height / 10} m</p>
            </div>
            <div className="bg-gray-100 p-4 rounded-lg text-center">
              <p className="text-sm text-gray-500">Weight</p>
              <p className="text-lg font-medium">{weight / 10} kg</p>
            </div>
          </div>
        </div>
        
        
        <div>
          <h2 className="text-xl font-semibold mb-4 text-gray-800">Abilities</h2>
          <div className="space-y-2">
            {abilities.map(({ ability, is_hidden }) => (
              <div key={ability.name} className="flex items-center">
                <span className="mr-2 text-lg">•</span>
                <span className="capitalize">{ability.name.replace('-', ' ')}</span>
                {is_hidden && <span className="ml-2 text-xs text-gray-500">(Hidden)</span>}
              </div>
            ))}
          </div>
          
          <h2 className="text-xl font-semibold mt-6 mb-4 text-gray-800">Moves</h2>
          <div className="grid grid-cols-2 gap-2 max-h-64 overflow-y-auto">
            {moves.slice(0, 20).map(({ move }) => (
              <div key={move.name} className="bg-gray-100 px-3 py-2 rounded capitalize text-sm">
                {move.name.replace('-', ' ')}
              </div>
            ))}
          </div>
          {moves.length > 20 && (
            <p className="text-sm text-gray-500 mt-2">
              + {moves.length - 20} more moves
            </p>
          )}
        </div>
      </div>
    </div>
  );
}