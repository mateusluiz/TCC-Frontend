import React from 'react';

import DevLogin from '../../components/DevLogin';
import './Login.css';


function Login(){

    return (
        <div className="container">
            <div id="app">
                <DevLogin />
            </div>
        </div>
    );
}

export default Login;