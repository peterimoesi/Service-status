import React from 'react';
import Screen from './client/index';
import './bootstrap.css';

const App = (props) => (
    <div className="App">
        <Screen
            {...props}
        />
    </div>
);

export default App;
