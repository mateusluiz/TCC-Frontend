import React, { useState } from 'react';
import { Link } from 'react-router-dom'
import api from '../../services/api';

import './styles.css';

function DevItem ({ dev, callback }) {
    const [carregar, setCarregar] = useState(false);

    async function handleDeleteDev(id) {

      setCarregar(true);
      await api.delete(`/delete/${id}`);
      setCarregar(false);
    
      callback();
    }

    return (
        <li className="dev-item">
            <header>
              <img src={dev.avatar_url} alt={dev.name} />
              <div className="user-info">
                <strong id="devName">{dev.name}</strong>
                <span>{dev.techs.join(', ')}</span>
              </div>

            </header>
            <p>{dev.bio}</p>
            <a id="githubLink" href={`https://github.com/${dev.github_username}`} 
            target="_blank"
            rel="noopener noreferrer"
            >Acessar perfil no Github</a>

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