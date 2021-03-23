import React, { useState, useEffect } from 'react';
import api from './services/api';

import './global.css';
import './Home.css';
import './Sidebar.css';
import './Main.css';

import DevItem from './components/DevItem';
import DevForm from './components/DevForm';


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
    const response = await api.post('/devs', data)

    setDevs([...devs, response.data]);
  }

  async function loadDeleteDev() {
    await loadDevs();
  }

  return ( 
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
  );
}

export default Home;
