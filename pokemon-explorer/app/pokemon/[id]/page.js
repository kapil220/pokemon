
import { Suspense } from 'react';
import { getPokemonDetails } from '../../lib/api';
import PokemonDetail from '../../components/PokemonDetail';
import Link from 'next/link';


export async function generateMetadata({ params }) {
  try {
    const pokemon = await getPokemonDetails(params.id);
    const pokemonName = pokemon.name.charAt(0).toUpperCase() + pokemon.name.slice(1);
    
    return {
      title: `${pokemonName} | Pokemon Explorer`,
      description: `View details about ${pokemonName} including stats, abilities, and moves.`,
    };
  } catch (error) {
    return {
      title: 'Pokemon Details | Pokemon Explorer',
      description: 'View detailed information about this Pokemon.',
    };
  }
}


export async function generateStaticParams() {

  const pokemonIds = Array.from({ length: 20 }, (_, i) => (i + 1).toString());
  
  return pokemonIds.map(id => ({
    id,
  }));
}

async function PokemonDetailPage({ params }) {
  try {
    const pokemon = await getPokemonDetails(params.id);
    
    return <PokemonDetail pokemon={pokemon} />;
  } catch (error) {
    return (
      <div className="bg-white rounded-lg shadow-lg p-8 text-center">
        <h1 className="text-2xl font-bold text-red-600 mb-4">Pokemon Not Found</h1>
        <p className="mb-4">We couldnt find the Pokemon youre looking for.</p>
        <Link 
          href="/"
          className="inline-block bg-red-600 text-white px-6 py-2 rounded-lg hover:bg-red-700"
        >
          Return to Homepage
        </Link>
      </div>
    );
  }
}

export default function Page({ params }) {
  return (
    <Suspense fallback={
      <div className="flex justify-center items-center p-12">
        <div className="animate-spin inline-block w-8 h-8 border-4 border-red-600 border-t-transparent rounded-full"></div>
        <p className="ml-2">Loading Pokemon details...</p>
      </div>
    }>
      <PokemonDetailPage params={params} />
    </Suspense>
  );
}