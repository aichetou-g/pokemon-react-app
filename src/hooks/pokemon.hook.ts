import { useEffect, useState } from 'react';
import POKEMONS from '../models/mock-pokemon';
import Pokemon from '../models/pokemon';

const usePokemons = () => {
    const [pokemons, setPokemens] = useState<Pokemon[]>([])
    useEffect(() => {
        setPokemens(POKEMONS)
    }, [])

    return pokemons
}

export default usePokemons