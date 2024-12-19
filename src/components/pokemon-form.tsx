import React, { FunctionComponent, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import formatType from '../helpers/format-type';
import Pokemon from '../models/pokemon';
import PokemonService from '../services/pokemon-service';
import checkForm from '../helpers/check-form';

type Props = {
    pokemon: Pokemon,
    isEdit: boolean
};

type Field = {
    value: any,
    error?: string,
    isValid?: boolean
}

type Form = {
    name: Field,
    hp: Field,
    cp: Field,
    types: Field,
    picture: Field
}

const PokemonForm: FunctionComponent<Props> = ({ pokemon, isEdit }) => {

    const [form, setForm] = useState<Form>({
        name: { value: pokemon.name, isValid: true },
        hp: { value: pokemon.hp, isValid: true },
        cp: { value: pokemon.cp, isValid: true },
        types: { value: pokemon.types, isValid: true },
        picture: { value: pokemon.picture },
    })
    const types: string[] = [
        'Plante', 'Feu', 'Eau', 'Insecte', 'Normal', 'Electrik',
        'Poison', 'Fée', 'Vol', 'Combat', 'Psy'
    ];

    const hasType = (type: string): boolean => {
        return form.types.value.includes(type)
    }

    const handleInput = (e: React.ChangeEvent<HTMLInputElement>) => {
        const fieldName: string = e.target.name;
        const fieldValue: string = e.target.value;
        const newField: Field = { [fieldName]: { value: fieldValue }, value: "" };

        setForm({ ...form, ...newField })

    }

    const selectType = (type: string, e: React.ChangeEvent<HTMLInputElement>): void => {
        const checked = e.target.checked
        let newField: Field;

        if (checked) {
            const newTypes: string[] = form.types.value.concat([type])
            newField = { value: newTypes }
        } else {
            const newTypes: string[] = form.types.value.filter((currentType: string) => currentType !== type);
            newField = { value: newTypes }
        }

        setForm({ ...form, ...{ types: newField } })
    }

    const history = useNavigate()

    const handleSubmit = (e: React.FormEvent<HTMLFormElement>): void => {
        e.preventDefault()
        const isFormValid = validateForm()

        if (isFormValid) {

            pokemon.name = form.name.value;
            pokemon.hp = +form.hp.value;
            pokemon.cp = +form.cp.value;
            pokemon.types = form.types.value;
            pokemon.picture = form.picture.value
            isEdit ? updatePokemon() : addPokemon()
        }
    }

    const addPokemon = () => {
        PokemonService.addPokemon(pokemon).then(() => history(`/pokemons`))
    }

    const updatePokemon = () => {
        PokemonService.updatePokemon(pokemon).then(() => history(`/pokemons/${pokemon.id}`))
    }

    const deletePokemon = () => {
        PokemonService.deletePokemon(pokemon).then(() => history('/pokemons'))
    }

    const isAddForm = () => {
        return !isEdit;
    }


    const validateForm = () => {
        let newForm: Form = form;

        if (!/^[a-zA-Zàéè ]{3,25}$/.test(form.name.value)) {
            const errorMsg: string = 'Le nom du pokémon est réquis (1-25).'
            const newField: Field = { value: form.name.value, error: errorMsg, isValid: false }
            newForm = { ...newForm, ...{ name: newField } }
        } else {
            const newField: Field = { value: form.name.value, error: '', isValid: true }
            newForm = { ...newForm, ...{ name: newField } }
        }

        if (!/^[0-9]{1,3}$/.test(form.hp.value)) {
            const errorMsg: string = 'Les points de vie du pokémon sont compris entre 0 et 999'
            const newField: Field = { value: form.hp.value, error: errorMsg, isValid: false }
            newForm = { ...newForm, ...{ hp: newField } }
        } else {
            const newField: Field = { value: form.hp.value, error: '', isValid: true }
            newForm = { ...newForm, ...{ hp: newField } }
        }

        if (!/^[0-9]{1,2}$/.test(form.cp.value)) {
            const errorMsg: string = 'Les dégâts du pokémon sont compris entre 0 et 99'
            const newField: Field = { value: form.cp.value, error: errorMsg, isValid: false }
            newForm = { ...newForm, ...{ cp: newField } }
        } else {
            const newField: Field = { value: form.cp.value, error: '', isValid: true }
            newForm = { ...newForm, ...{ cp: newField } }
        }

        if (isAddForm()) {

            const start = "http://assets.pokemon.com/assets/cms2/img/pokedex/detail/";
            const end = ".png"

            if (!form.picture.value.startsWith(start) || !form.picture.value.endsWith(end)) {
                const errorMsg: string = "L'url n'est pas valide"
                const newField: Field = { value: form.picture.value, error: errorMsg, isValid: false }
                newForm = { ...newForm, ...{ picture: newField } }
            } else {
                const newField: Field = { value: form.picture.value, error: '', isValid: true }
                newForm = { ...newForm, ...{ picture: newField } }
            }
        }

        setForm(newForm);
        return newForm.name.isValid && newForm.hp.isValid && newForm.cp.isValid
    }

    const isTypesValid = (type: string): boolean => {

        if (form.types.value.length === 1 && hasType(type)) {
            return false;
        }

        if (form.types.value.length >= 3 && !hasType(type)) {
            return false;
        }

        return true;
    }


    return (
        <form onSubmit={e => handleSubmit(e)}>
            <div className="row">
                <div className="col s12 m8 offset-m2">
                    <div className="card hoverable">
                        {isEdit && <div className="card-image">
                            <img src={pokemon.picture} alt={pokemon.name} style={{ inlineSize: '250px', margin: '0 auto' }} />
                            <span className='btn btn-floating halfway-fab waves-effect waves-light'>
                                <i onClick={deletePokemon} className='material-icons'>delete</i></span>
                        </div>}
                        <div className="card-stacked">
                            <div className="card-content">
                                {isEdit ? null : <div className="form-group">
                                    <label htmlFor="url">Picture</label>
                                    <input id="url" name='picture' type="text" className="form-control" value={form.picture.value} onChange={e => handleInput(e)}></input>
                                    {form.picture.error &&
                                        <div className='card-panel red accent-1'>{form.picture.error}
                                        </div>
                                    }
                                </div>}
                                {/* Pokemon name */}
                                <div className="form-group">
                                    <label htmlFor="name">Nom</label>
                                    <input id="name" name='name' type="text" className="form-control" value={form.name.value} onChange={e => handleInput(e)}></input>
                                    {form.name.error &&
                                        <div className='card-panel red accent-1'>{form.name.error}
                                        </div>
                                    }
                                </div>
                                {/* Pokemon hp */}
                                <div className="form-group">
                                    <label htmlFor="hp">Point de vie</label>
                                    <input id="hp" name='hp' type="number" className="form-control" value={form.hp.value} onChange={e => handleInput(e)}></input>
                                    {form.hp.error &&
                                        <div className='card-panel red accent-1'>{form.name.error}
                                        </div>
                                    }
                                </div>
                                {/* Pokemon cp */}
                                <div className="form-group">
                                    <label htmlFor="cp">Dégâts</label>
                                    <input id="cp" name='cp' type="number" className="form-control" value={form.cp.value} onChange={e => handleInput(e)}></input>
                                    {form.cp.error &&
                                        <div className='card-panel red accent-1'>{form.name.error}
                                        </div>
                                    }
                                </div>
                                {/* Pokemon types */}
                                <div className="form-group">
                                    <label>Types</label>
                                    {types.map(type => (
                                        <div key={type} style={{ insetBlockEnd: '10px' }}>
                                            <label>
                                                <input id={type} name='type ' type="checkbox" className="filled-in" value={type} disabled={!isTypesValid(type)} checked={hasType(type)} onChange={e => selectType(type, e)}></input>
                                                <span>
                                                    <p className={formatType(type)}>{type}</p>
                                                </span>
                                            </label>
                                        </div>
                                    ))}
                                </div>
                            </div>
                            <div className="card-action center">
                                {/* Submit button */}
                                <button type="submit" className="btn" onClick={validateForm}>Valider</button>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </form>
    );
};

export default PokemonForm;