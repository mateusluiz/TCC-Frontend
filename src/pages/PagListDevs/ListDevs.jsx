import React, { useState, useEffect } from 'react';

import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.min.css';

import './ListDevs.css';

import api from '../../services/api'
import DevItem from '../../components/DevItem';


toast.configure()

function ListDevs(){
  const [devs, setDevs] = useState([]);

  useEffect(() => {

    loadDevs();
  }, []);

  async function loadDevs(){
    const response = await api.get('/devs');

    setDevs(response.data);
  }
  
  async function loadDeleteDev(){
    await loadDevs();
  }

  return (

    <div className="container">
      <div id="app">
        <div className="list-devs-container">
          <div className="list-devs-items">
            <div className="list-devs-title">
              <h1>Lista de Devs cadastrados</h1>
              <p>Explore a lista de desenvolvedores cadastrados</p>
            </div>
            <ul>
              {devs.map(dev => (
                <DevItem key={dev._id} dev={dev} callback={loadDeleteDev}/>
              ))}
            </ul>
          </div>
        </div>
      </div>
    </div>
    
  )
}

export default ListDevs;