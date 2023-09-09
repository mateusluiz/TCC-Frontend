import React, { useState } from 'react';

import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.min.css'; 

import api from '../../services/api'
import DevUpdate from '../../components/DevUpdate'

import './Update.css';

toast.configure()

function Update(){

  const [devs, setDevs] = useState([]);

    
  async function handleUpdateDev(data) {
    
    try {
      const response = await api.put(`/atualizar/${data.github_username}`, data)

      setDevs([...devs, response.data])

      toast.success('Alterado com sucesso!')
      toast('Você será redirecionado em 5 segundos')

      setTimeout(() => {
        window.location.href="/"
      }, 5000)
      
    } catch (error) {
      toast.error(error)
    }

  }

  return (

    <div className="container update">
      <div className="group-update">
        <strong>Meu usuário</strong>
        <hr />
        <DevUpdate onSubmit={handleUpdateDev}/>
      </div>
    </div>
  )
}

export default Update;