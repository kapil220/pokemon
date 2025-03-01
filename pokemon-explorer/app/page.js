'use client';

import { useState, useEffect } from 'react';
import SearchBar from './components/SearchBar';
import PokemonList from './components/PokemonList';
import LoadMore from './components/LoadMore';
import { getPokemonList, searchPokemon } from './lib/api';

export default function HomePage() {
  const [pokemonData, setPokemonData] = useState({
    results: [],
    next: null,
    loading: true,
    error: null
  });
  const [searchQuery, setSearchQuery] = useState('');
  

  useEffect(() => {
    async function loadInitialPokemon() {
      try {
        const data = await getPokemonList();
        setPokemonData({
          results: data.results,
          next: data.next,
          loading: false,
          error: null
        });
      } catch (error) {
        console.error("Error fetching Pokemon:", error);
        setPokemonData({
          results: [],
          next: null,
          loading: false,
          error: error.message
        });
      }
    }
    
    loadInitialPokemon();
  }, []);
  

  const handleSearch = async (query) => {
    setSearchQuery(query);
    setPokemonData(prev => ({ ...prev, loading: true }));
    
    try {
      const data = await searchPokemon(query);
      setPokemonData({
        results: data.results,
        next: query ? null : data.next, 
        loading: false,
        error: null
      });
    } catch (error) {
      console.error("Error searching Pokemon:", error);
      setPokemonData({
        results: [],
        next: null,
        loading: false,
        error: error.message
      });
    }
  };
  
  
  const handleLoadMore = async () => {
    if (!pokemonData.next || pokemonData.loading) return;
    
    setPokemonData(prev => ({ ...prev, loading: true }));
    
    try {
      const offset = new URL(pokemonData.next).searchParams.get('offset');
      const data = await getPokemonList(20, offset);
      
      setPokemonData({
        results: [...pokemonData.results, ...data.results],
        next: data.next,
        loading: false,
        error: null
      });
    } catch (error) {
      console.error("Error loading more Pokemon:", error);
      setPokemonData(prev => ({
        ...prev,
        loading: false,
        error: error.message
      }));
    }
  };
  
  return (
    <div>
      <SearchBar onSearch={handleSearch} />
      
      {pokemonData.error ? (
        <div className="text-center text-red-600 p-4">
          Error: {pokemonData.error}
        </div>
      ) : pokemonData.loading && pokemonData.results.length === 0 ? (
        <div className="text-center p-8">
          <div className="animate-spin inline-block w-8 h-8 border-4 border-red-600 border-t-transparent rounded-full"></div>
          <p className="mt-2">Loading Pokemon...</p>
        </div>
      ) : (
        <>
          <PokemonList pokemonList={pokemonData.results} />
          {!searchQuery && pokemonData.next && (
            <LoadMore 
              onLoadMore={handleLoadMore} 
              isLoading={pokemonData.loading}
            />
          )}
        </>
      )}
    </div>
  );
}