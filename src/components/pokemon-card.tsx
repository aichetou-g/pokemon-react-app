import React, { FunctionComponent, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import formatDate from '../helpers/format-date';
import formatType from '../helpers/format-type';
import Pokemon from '../models/pokemon';
import './pokemon-card.css';

type Props = {
    pokemon: Pokemon,
    borderColor?: string
};

const PokemonCard: FunctionComponent<Props> = ({ pokemon, borderColor = '#009688' }) => {

    const [color, setColor] = useState<string>()
    const history = useNavigate()

    const showColor = () => {
        setColor(borderColor)
    }

    const hideColor = () => {
        setColor('#f5f5f5')
    }

    const goToPokemon = (id: number) => {
        history(`/pokemons/${id}`)
    }

    return (
        <div className="col s6 m4" onMouseEnter={showColor} onMouseLeave={hideColor} onClick={() => goToPokemon(pokemon.id)}>
            <div className="card horizontal" style={{ borderColor: color }} >
                <div className="card-image">
                    <img src={pokemon.picture} alt={pokemon.name} />
                </div>
                <div className="card-stacked">
                    <div className="card-content">
                        <p>{pokemon.name}</p>
                        <p><small>{formatDate(pokemon.created)}</small></p>
                        {pokemon.types.map((type => (
                            <span key={type} className={formatType(type)}>{type}</span>
                        )))}
                    </div>
                </div>
            </div>
        </div>
    );
}

export default PokemonCard;