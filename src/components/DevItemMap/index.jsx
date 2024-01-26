import React from 'react';

import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.min.css'; 

import './styles.css';

toast.configure()

function DevItemMap ({ dev, showDescription = true }) {
    return (
      <div className="dev-map">
        <header>
            <div className="user-info">
              <img src={dev.avatar_url} alt={dev.name} />
              <div className="first-info">
                <strong id="devName">{dev.name}</strong>
                <span>{dev.techs.join(', ')}</span>
              </div>
            </div>
        </header>
        {
          showDescription &&
          (
            <div>
              <p>{dev.bio}</p>

              <div className="group-button">
                <a id="githubLink" href={`https://github.com/${dev.github_username}`} 
                target="_blank"
                rel="noopener noreferrer"
                >
                  Acessar perfil no Github
                </a>
              </div>
            </div>
          ) 
        }
      </div>
    );
}

export default DevItemMap;