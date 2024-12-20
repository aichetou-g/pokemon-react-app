import React, { FunctionComponent, useEffect, useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import PokemonForm from '../components/pokemon-form';
import Pokemon from '../models/pokemon';
import PokemonService from '../services/pokemon-service';
import Loader from '../components/loader';

type Params = { id: string };

const PokemonEdit: FunctionComponent = () => {
    const { id } = useParams<Params>()
    const [pokemon, setPokemon] = useState<Pokemon | null>(null);

    useEffect(() => {
        PokemonService.getPokemon(Number(id))
            .then((pokemon) => setPokemon(pokemon)
            )
    }, [id]);

    return (
        <div>
            {pokemon ? (
                <div className="row">
                    <h2 className="header center">Éditer {pokemon.name}</h2>
                    <PokemonForm pokemon={pokemon} isEdit={true}></PokemonForm>
                </div>
            ) : (
                <div className="center">
                    <Loader />
                    <div className="card-action">
                        <Link to="/" className='chip'>Retour</Link>
                    </div>
                </div>

            )}
        </div>
    );
}

export default PokemonEdit;