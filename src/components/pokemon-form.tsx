import React, { FunctionComponent, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import formatType from '../helpers/format-type';
import Pokemon from '../models/pokemon';

type Props = {
    pokemon: Pokemon
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
    types: Field
}
const PokemonForm: FunctionComponent<Props> = ({ pokemon }) => {

    const [form, setForm] = useState<Form>({
        name: { value: pokemon.name, isValid: true },
        hp: { value: pokemon.hp, isValid: true },
        cp: { value: pokemon.cp, isValid: true },
        types: { value: pokemon.types, isValid: true },
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
        console.log(newField);

        setForm({ ...form, ...newField })
        console.log(form);

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
    const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault()
        const isFormValid = validateForm()
        if (isFormValid) {
            history(`/pokemons/${pokemon.id}`)
        }
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
                        <div className="card-image">
                            <img src={pokemon.picture} alt={pokemon.name} style={{ inlineSize: '250px', margin: '0 auto' }} />
                        </div>
                        <div className="card-stacked">
                            <div className="card-content">
                                {/* Pokemon name */}
                                <div className="form-group">
                                    <label htmlFor="name">Nom</label>
                                    <input id="name" name='name' type="text" className="form-control" value={form.name.value} onChange={e => handleInput(e)}></input>
                                    {form.name.error &&
                                        <div className='card-panel red accent-1'>{form.name.error}</div>}
                                </div>
                                {/* Pokemon hp */}
                                <div className="form-group">
                                    <label htmlFor="hp">Point de vie</label>
                                    <input id="hp" name='hp' type="number" className="form-control" value={form.hp.value} onChange={e => handleInput(e)}></input>
                                </div>
                                {/* Pokemon cp */}
                                <div className="form-group">
                                    <label htmlFor="cp">Dégâts</label>
                                    <input id="cp" name='cp' type="number" className="form-control" value={form.cp.value} onChange={e => handleInput(e)}></input>
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