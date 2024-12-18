import React, { FunctionComponent } from "react";
import { Link, Route, BrowserRouter as Router, Routes } from "react-router-dom";
import PageNotFound from "./pages/page-not-found";
import PokemonsDetail from "./pages/pokemon-detail";
import PokemonEdit from "./pages/pokemon-edit";
import PokemonList from "./pages/pokemon-list";

const App: FunctionComponent = () => {

    return (
        <Router>
            <div>
                <nav>
                    <div className="nav-wrapper teal">
                        <Link to="/" className="brand-logo center">Pokédex</Link>
                    </div>
                </nav>

                <Routes>
                    <Route path="/" element={<PokemonList />} />
                    <Route path="/pokemons" element={<PokemonList />} />
                    <Route path="/pokemons/:id" element={<PokemonsDetail />} />
                    <Route path="/pokemons/edit/:id" element={<PokemonEdit />} />
                    <Route path="*" element={<PageNotFound />} />
                </Routes>
            </div>
        </Router>
    )
}

export default App;