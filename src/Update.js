import React, { useState } from 'react';
import api from './services/api'

import DevUpdate from './components/DevUpdate'

import './Update.css';

function Update(){

  const [devs, setDevs] = useState([]);

    
  async function handleUpdateDev(data) {
    const response = await api.put(`/atualizar/${data.github_username}`, data)

    setDevs([...devs, response.data]);

  }

  return (

    <div className="group-update disabled">
      <strong>Atualizar</strong>
      <DevUpdate onSubmit={handleUpdateDev}/>
    </div>
  )
}

export default Update;