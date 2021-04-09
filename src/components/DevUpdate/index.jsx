import React, { useState, useEffect } from 'react';
import { useRouteMatch } from 'react-router-dom'

import DevItem from '../DevItem'
import Home from '../../'

function DevUpdate({ onSubmit }){

  const [github_username, setGithub_username] = useState('');
  const [techs, setTechs] = useState('');
  const [latitude, setLatitude] = useState('');
  const [longitude, setLongitude] = useState('');

  const { params } = useRouteMatch();

  useEffect(() => {
      navigator.geolocation.getCurrentPosition(
        (position) => {
          const { latitude, longitude } = position.coords;
  
          setLatitude(latitude);
          setLongitude(longitude);
        },
        (err) => {
          console.log(err);
        },
        {
          timeout: 30000,
        }
      )
  }, []);

  async function handleSubmit(e){
      e.preventDefault();

      await onSubmit({
          github_username: params.id,
          techs,
          latitude,
          longitude
      });

      setGithub_username('');
      setTechs('');
  }

  return (
    <form onSubmit={handleSubmit}>
      <div className="input-block">
        <label htmlFor="github_username">Usuário do Github: </label>
        <input 
          name="github_username" 
          id="github_username" 
          required
          value={params.id}
          onChange={e => setGithub_username(e.target.value)}
          disabled 
        ></input>
      </div>

      <div className="input-block">
        <label htmlFor="techs">Tecnologias: </label>
        <input 
          name="techs" 
          id="techs" 
          required
          value={techs}
          onChange={e => setTechs(e.target.value)}
        ></input>
      </div>

      <div className="input-group">
        <div className="input-block">
          <label htmlFor="latitude">Latitude: </label>
          <input 
            type="number" 
            name="latitude" 
            id="latitude" 
            required 
            value={latitude} 
            onChange={e => setLatitude(e.target.value)} >
          </input>
        </div>

        <div className="input-block">
          <label htmlFor="longitude">Longitude: </label>
          <input 
            type="number" 
            name="longitude" 
            id="longitude" 
            required 
            value={longitude}
            onChange={e => setLongitude(e.target.value)}
            >
          </input>
        </div>
      </div>

      <button type="submit">Salvar</button>
    </form>
  );
}

export default DevUpdate;