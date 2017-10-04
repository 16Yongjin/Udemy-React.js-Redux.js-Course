import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import registerServiceWorker from './registerServiceWorker';
import * as firebase from 'firebase';

var config = {
    apiKey: 'AIzaSyColWfu2Xp2eW6Qq7SyueuI0zkGx56bGJw',
    authDomain: 'react-add-ict.firebaseapp.com',
    databaseURL: 'https://react-add-ict.firebaseio.com',
    projectId: 'react-add-ict',
    storageBucket: 'react-add-ict.appspot.com',
    messagingSenderId: '865167814872'
};

firebase.initializeApp(config);

ReactDOM.render(<App />, document.getElementById('root'));
registerServiceWorker();
