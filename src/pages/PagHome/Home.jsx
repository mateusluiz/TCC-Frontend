import React, { useState, useEffect } from 'react';

import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.min.css'; 

import './global.css';
import './Home.css';
import './Sidebar.css';
import './Main.css';

import api from '../../services/api';
import DevItem from '../../components/DevItem';
import DevForm from '../../components/DevForm';

toast.configure()

function Home() {
  const [devs, setDevs] = useState([]);

  useEffect(() => {

    loadDevs();
  }, []);

  async function loadDevs(){
    const response = await api.get('/devs');

    setDevs(response.data);
  }

  async function handleAddDev(data) {

    try {
      const response = await api.post('/devs', data)

      toast.success('Cadastrado com sucesso!')

      setDevs([...devs, response.data]);

    } catch (error) {
      toast.warn('Já cadastrado')
    }
  }

  async function loadDeleteDev() {
    await loadDevs();
  }
  
  return ( 
    <div className="container">
      <div id="app">

        <aside>
          <strong>Cadastrar</strong>
          <DevForm onSubmit={handleAddDev} />
        </aside> 

        <main>
          <ul>
            {devs.map(dev => (
              <DevItem key={dev._id} dev={dev} callback={loadDeleteDev}/>
            ))}
          </ul>
        </main>

      </div>
    </div>
  );
}

export default Home;
