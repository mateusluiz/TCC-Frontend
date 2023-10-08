import React, { useState, useEffect } from 'react';
import { useHistory } from 'react-router-dom';

const CLIENT_ID = "f89054aa23b6260b569e";

function DevLogin() {

    const [rerender, setRerender] = useState(false);
    const [userData, setUserData] = useState({});
    const history = useHistory(); // Obtenha o objeto history
    let codeParam = null;

    useEffect(() => {
        const queryString = window.location.search;
        const urlParams = new URLSearchParams(queryString);
        codeParam = urlParams.get("code");
        console.log(codeParam);
  
        if (codeParam && (localStorage.getItem("accessToken") === null)) {
          async function getAccessToken() {
            await fetch ("http://localhost:3333/getAccessToken?code=" + codeParam, {
              method: "GET",
            }).then((response) => {
              return response.json();
            }).then((data) => {
              console.log("GET ACCESS TOKEN" + data);
              if (data.access_token){
                localStorage.setItem("accessToken", data.access_token);
                setRerender(!rerender);
              } 
            })
          }
  
          getAccessToken();
          getUserData();
        }
    }, []);

    async function getUserData() {
        await fetch("http://localhost:3333/getUserData", {
            method: "GET",
            headers: {
                "Authorization" : "Bearer " + localStorage.getItem("accessToken") // Bearer ACCESS TOKEN
            }
        }).then((response) => {
            return response.json();
        }).then((data) => {
            console.log("GET USER DATA: " + getUserData);
            setUserData(data);
            console.log(data);
        })
    }

    function loginWithGithub() {
        window.location.assign("https://github.com/login/oauth/authorize?client_id=" + CLIENT_ID);
    }
    
    function logoutGithub() {
        localStorage.removeItem("accessToken"); // Remove o token de acesso
        setUserData({}); // limpa os dados do usuário
        codeParam = null; // limpa o code param
        setRerender(!rerender);
        history.push('/');
        window.location.reload();
    }

    return (
        <div class="login-container">
            <h1>{codeParam}</h1>
            {localStorage.getItem("accessToken") ? 
                <>
                    <h1>Bem vindo,  {userData.login}!</h1>
                    <div class="options-group">
                        <a href="/cadastrar-dev">Cadastrar Dev</a>
                        <a href="/lista-devs">Lista de Devs</a>
                        <a href="/mapa">Mapa</a>
                    </div>
                    <button onClick={logoutGithub} class="btn-logout">Logout</button>
                    <h4>Hey there {userData.login}</h4>
                    
                </>

                :

                <>
                    <h1>Login</h1>
                    <hr />                    
                    <p>Faça o login utilizando o seu GitHub</p>
                    <button onClick={loginWithGithub}>Login</button>
                </>
            }
        </div>
    );
}

export default DevLogin;

