import React from 'react';
import Screen from './client/index';
import './bootstrap.css';

import JavascriptTimeAgo from 'javascript-time-ago';

// The desired locales.
import en from 'javascript-time-ago/locale/en';

// Initialize the desired locales.
JavascriptTimeAgo.locale(en);

const App = (props) => (
    <div className="App">
        <Screen
            {...props}
        />
    </div>
);

export default App;
