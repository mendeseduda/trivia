import React from 'react';
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';
import { HeaderBar } from './HeaderBar/HeaderBar';
import { routes } from './routes';
import './App.scss';

function App() {
    return (
        <div role="app" className="App">
            <HeaderBar></HeaderBar>
            <div className="AppContainer">
                <Router>
                    <Switch>
                        {Object.values(routes).map((route, index) =>
                            <Route key={index} path={route.path} component={route.component}></Route>
                        )}
                    </Switch>
                </Router>
            </div>
        </div>
    );
}

export default App;
