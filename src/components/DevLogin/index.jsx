import React, { useState, useEffect } from 'react';
import { useHistory } from 'react-router-dom';

import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.min.css';
import '../../assets/icon/font-awesome-4.7.0/css/font-awesome.min.css';

import './styles.css';

toast.configure()

const CLIENT_ID = "f89054aa23b6260b569e";

function DevLogin() {

    const [rerender, setRerender] = useState(false);
    const [userData, setUserData] = useState({});
    const [username, setUsername] = useState(localStorage.getItem("username") || null);
    const history = useHistory(); // Obtenha o objeto history
    let codeParam = null;

    useEffect(() => {
        const fetchData = async () => {
            const queryString = window.location.search;
            const urlParams = new URLSearchParams(queryString);
            codeParam = urlParams.get("code");

            if (codeParam && (localStorage.getItem("accessToken") === null)) {
                try {
                    const response = await fetch(`http://localhost:3333/getAccessToken?code=${codeParam}`, {
                        method: "GET",
                    });
                    const data = await response.json();

                    if (data.access_token) {
                        localStorage.setItem("accessToken", data.access_token);
                        setRerender(!rerender);
                    }
                } catch (error) {
                    console.error("Error fetching access token:", error);
                }

                getUserData();
            }
        };

        fetchData();
    }, [rerender]);

    async function getUserData() {
        try {
            const response = await fetch("http://localhost:3333/getUserData", {
                method: "GET",
                headers: {
                    "Authorization": `Bearer ${localStorage.getItem("accessToken")}` // Bearer ACCESS TOKEN
                }
            });

            const data = await response.json();

            setUserData(data);
            setUsername(data.name);
            localStorage.setItem("username", data.name);

        } catch (error) {
            console.error("Error fetching user data:", error);
        }
    }

    function loginWithGithub() {
        window.location.assign(`https://github.com/login/oauth/authorize?client_id=${CLIENT_ID}`);
    }

    function logoutGithub() {
        localStorage.removeItem("accessToken"); // Remove o token de acesso
        localStorage.removeItem("username"); // Remove o nome do usuário
        setUserData({}); // Limpa os dados do usuário
        codeParam = null; // Limpa o code param
        setRerender(!rerender);
        history.push('/');
        window.location.reload();
    }

    return (
        <div className="login-container">
            <h1>{codeParam}</h1>
            {localStorage.getItem("accessToken") ?
                <>
                    <div className="logged-container">
                        <h1>Bem vindo(a), {username}!</h1>
                        <p>Explore as vantagens de uma experiência personalizada no Dev360. Aproveite ao máximo o que temos a oferecer!</p>
                        <div className="logged-card-options">  
                            <a href="/cadastrar-dev" className="card">
                                <i className="fa fa-user-plus icon" aria-hidden="true"></i>
                                <p>Cadastrar Dev</p>
                            </a>
                            <a href="/lista-devs" className="card">
                                <i className="fa fa-list-ul icon" aria-hidden="true"></i>
                                <p>Lista de Devs</p>
                            </a>
                            <a href="/mapa" className="card">
                                <i className="fa fa-map icon" aria-hidden="true"></i>
                                <p>Mapa</p>
                            </a>
                            <a href="/" onClick={logoutGithub} className="card">
                                <i class="fa fa-sign-out icon" aria-hidden="true"></i>
                                <p>Logout</p>
                            </a>
                        </div>
                    </div>
                </>

                :

                <>
                    <div className="login-card">
                        <div>
                            <h1>Hey Dev, bem vindo(a)!</h1>
                            <p>Explore as vantagens de uma experiência de login simplificada.<br></br> Conecte-se usando sua conta do <b>GitHub!</b></p>
                        </div>
                        <button onClick={loginWithGithub}>
                            <p>Entrar com GitHub</p>
                            <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24">
                                <path d="M12 0c-6.626 0-12 5.373-12 12 0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23.957-.266 1.983-.399 3.003-.404 1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576 4.765-1.589 8.199-6.086 8.199-11.386 0-6.627-5.373-12-12-12z" />
                            </svg>
                        </button>
                    </div>
                </>
            }
        </div>
    );
}

export default DevLogin;