import React, { useState } from 'react';

import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.min.css'; 

import './global.css';
import './Register.css';
import './Main.css';

import api from '../../services/api';
import DevForm from '../../components/DevForm';

toast.configure()

function Register() {
  const [devs, setDevs] = useState([]);

  async function handleAddDev(data) {

    try {
      const response = await api.post('/devs', data)

      toast.success('Cadastrado com sucesso!')

      setDevs([...devs, response.data]);

    } catch (error) {
      if(error.response.data.message.includes('Esse usuário não existe')){
        toast.warn('Esse usuário não existe')
      } else {
        toast.warn('Já cadastrado')
      }
    }
  }
  
  return ( 
    <div className="container">
      <div id="app">

        <main>
          <strong>Cadastrar Dev</strong>
          <hr />
          <DevForm onSubmit={handleAddDev} />
        </main>

      </div>
    </div>
  );
}

export default Register;
