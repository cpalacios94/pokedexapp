import { useEffect, useState } from 'react'
import axios from 'axios'
import type { Pokemon, PokemonDetails } from './types/pokemon'
import PokemonCard from './components/PokemonCard'

function App() {
  const [pokemonList, setPokemonList] = useState<PokemonDetails[]>([])

  useEffect(() => {
    const fetchData = async () => {
      const res = await axios.get('https://pokeapi.co/api/v2/pokemon?limit=20')
      const promises = res.data.results.map((p: Pokemon) => axios.get(p.url))
      const results = await Promise.all(promises)
      const pokemons = results.map((res) => res.data as PokemonDetails)
      setPokemonList(pokemons)
    }

    fetchData()
  }, [])

  return (
    <div className="w-full min-h-screen bg-gradient-to-b from-gray-100 to-white text-gray-900 px-4 py-10">
      <h1 className="text-4xl font-extrabold text-center mb-10 tracking-tight">Pokédex</h1>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
        {pokemonList.map((p) => (
          <PokemonCard key={p.id} pokemon={p} />
        ))}
      </div>
    </div>
  )
}

export default App
