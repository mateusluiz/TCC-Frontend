import React, { useState } from 'react';
import { Link } from 'react-router-dom'
// import crypto from 'crypto'

import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.min.css'; 

import api from '../../services/api';

import './styles.css';

toast.configure()

function DevItem ({ dev, callback }) {
    const [carregar, setCarregar] = useState(false);
    const [mostrarDev, setMostrarDev] = useState(dev.github_username_crypt)

    async function handleDeleteDev(id) {

      setCarregar(true);
      await api.delete(`/delete/${id}`);
      setCarregar(false);

      toast.success('Excluído com sucesso!')
    
      callback();
    }

    function decryptUser() {
      const secret = 'aabbcccaabbcccaabbcccaabbcccaabb'
      const [iv, encrypted] = dev.github_username_crypt.split(':')
      const ivBuffer = Buffer.from(iv, 'hex')
      const decipher = crypto.createDecipheriv('aes-256-cbc', Buffer.from(secret), ivBuffer)
      let content = decipher.update(Buffer.from(encrypted, 'hex'))
      content = Buffer.concat([content, decipher.final()])
      
      setMostrarDev(content.toString())
    }

    return (
        <li className="dev-item">
            <header>
                <div className="user-info">
                  <img src={dev.avatar_url} alt={dev.name} />
                  <div className="first-info">
                    <strong id="devName">{dev.name}</strong>
                    <span>{dev.techs.join(', ')}</span>
                  </div>
                </div>
              <div class="second-info">
                <p className="crypto">{mostrarDev}</p>
                <button className="decrypt-user" onClick={decryptUser}>Descriptografar</button>
              </div>

            </header>
            <p>{dev.bio}</p>
            <a id="githubLink" 
               href={`https://github.com/${dev.github_username}`} 
               target="_blank"
               rel="noopener noreferrer"
            >  Acessar perfil no Github
            </a>
            <div className="group-button">
                {!carregar && (
                  <button className="delete-button"
                  onClick={() => {handleDeleteDev(dev._id)}}
                  title={`Excluir o usuário ${dev.github_username}`} >
                    Excluir
                  </button>
                )}

                {carregar && (
                  <button className="delete-button"
                  onClick={() => {handleDeleteDev(dev._id)}}
                  disabled>
                    Excluindo...
                  </button>
                )}

                <Link to={`/atualizar/${dev.github_username}`}>
                  <button className="update-button">Atualizar</button>
                </Link>
              </div>
              
          </li>
    );
}

export default DevItem;