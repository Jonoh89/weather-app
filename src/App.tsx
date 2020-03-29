import React, { useState } from "react";
import "./App.css";
import { BrowserRouter as Router, Link, Route, Switch } from "react-router-dom";
import Home from "./Home";
import History from "./History";
import { Units } from "./types/Units";

function App () {
    const [ history, setHistory ] = useState([ "sunnyville", "snowville", "rainville", "cloudlyville", "drizzleville" ]);
    const [ units, setUnits ] = useState<Units>("metric");

    return (
        <div className="App">
            <Router>
                <header className="App-header">
                    <Link to="/">Home</Link>
                    <h1 className='App-Header-title'>Weather</h1>
                    <Link to="/history">History</Link>
                </header>
                <Switch>
                    <Route exact path="/">
                        <Home units={units} setUnits={setUnits} history={history} setHistory={setHistory}/>
                    </Route>
                    <Route path="/history">
                        <History units={units} history={history} />
                    </Route>
                </Switch>
            </Router>
        </div>
    );
}

export default App;
