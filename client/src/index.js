import React from 'react';
import ReactDOM from 'react-dom';
import App from './components/App';

import './styles/styles.sass';

console.log(`Looks like we are in ${process.env.NODE_ENV} mode!`); // eslint-disable-line no-console

ReactDOM.render(<App />, document.getElementById('app'));
