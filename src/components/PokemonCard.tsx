import type { PokemonDetails } from '../types/pokemon'

type Props = {
  pokemon: PokemonDetails
}

const typeColors: Record<string, string> = {
  grass: 'bg-green-100',
  fire: 'bg-red-100',
  water: 'bg-blue-100',
  bug: 'bg-lime-100',
  poison: 'bg-purple-100',
  flying: 'bg-sky-100',
  normal: 'bg-gray-100',
}

const PokemonCard = ({ pokemon }: Props) => {
  const type = pokemon.types[0].type.name
  const bgColor = typeColors[type] || 'bg-white'
  return (
    <div
      className={`${bgColor} rounded-2xl shadow-md p-5 text-center w-full max-w-xs mx-auto transition-transform hover:scale-105 hover:shadow-xl`}
    >
      <img src={pokemon.sprites.front_default} alt={pokemon.name} className="w-24 h-24 mx-auto" />
      <h3 className="mt-4 text-lg font-bold text-gray-800 capitalize">{pokemon.name}</h3>
      <p className="mt-1 text-sm text-gray-500">
        {pokemon.types.map((t) => t.type.name).join(', ')}
      </p>
    </div>
  )
}

export default PokemonCard
