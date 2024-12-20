import React, { FunctionComponent } from "react";
import { Link, Route, BrowserRouter as Router, Routes } from "react-router-dom";
import PageNotFound from "./pages/page-not-found";
import PokemonsDetail from "./pages/pokemon-detail";
import PokemonEdit from "./pages/pokemon-edit";
import PokemonList from "./pages/pokemon-list";
import PokemonAdd from "./pages/pokemon-add";
import Login from "./pages/login";
import PrivateRoute from "./PrivateRoute";


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
                    <Route path='/' element={<PrivateRoute />}>
                        <Route path='/' element={<PokemonList />} />
                    </Route>
                    <Route path='/' element={<PrivateRoute />}>
                        <Route path="/pokemons" element={<PokemonList />} />
                    </Route>
                    <Route path='/' element={<PrivateRoute />}>
                        <Route path="/pokemons/:id" element={<PokemonsDetail />} />
                    </Route>
                    <Route path='/' element={<PrivateRoute />}>
                        <Route path="/pokemons/edit/:id" element={<PokemonEdit />} />
                    </Route>
                    <Route path='/' element={<PrivateRoute />}>
                        <Route path="/pokemons/add" element={<PokemonAdd />} />
                    </Route>
                    <Route path="/login" element={<Login />} />
                    <Route path="*" element={<PageNotFound />} />
                </Routes>
            </div>
        </Router>
    )
}

export default App;