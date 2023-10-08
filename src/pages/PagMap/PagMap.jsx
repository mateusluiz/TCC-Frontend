import React, { useState, useEffect} from 'react';

import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.min.css';

import { 
  GoogleMap, 
  InfoWindow, 
  Marker, 
  useLoadScript, 
  OverlayView,
} from "@react-google-maps/api";

import './PagMap.css';
import api from '../../services/api'
import DevItemMap from '../../components/DevItemMap/index';

import iconPin from '../../assets/icon/icon-pin.png';

toast.configure()

function PagMap(){
  const { isLoaded } = useLoadScript({
    googleMapsApiKey: 'AIzaSyCq_G95xLNpKljzvuJUWf02ITUy6IFEx3E',
  });

  const [devs, setDevs] = useState([]);
  const [center, setCenter] = useState({ lat: -23.61592812734173, lng: -46.62983447938454 });

  const [isOpen, setIsOpen] = useState(false);
  const [infoWindowData, setInfoWindowData] = useState();

  useEffect(() => {
    loadDevs();
    getLocation();
  }, []);

  async function loadDevs(){
    const response = await api.get('/devs');

    setDevs(response.data);
  }

  async function getLocation(){
    navigator.geolocation.getCurrentPosition(
      (position) => {
        const { latitude, longitude } = position.coords;

        setCenter({ lat: latitude, lng: longitude });
      },
      (err) => {
        console.log(err);
      },
      {
        timeout: 30000,
      }
    );
  }
  
  const handleMarkerClick = (_id, bio) => {
    setInfoWindowData({ _id, bio });
    setIsOpen(true);
  } 

  return (
    <div className="Maps">
      {!isLoaded ? (
        <h1>Loading...</h1>
      ) 
      : 
      ( 
        <GoogleMap
          mapContainerClassName="map-container"
          center={center}
          zoom={12}
          options={{styles: [
            {
              featureType: 'poi',
              stylers: [{ visibility: 'off' }]
            }
          ]}}
          onClick={() => setIsOpen(false)} // Fecha a janela ao clicar em qualquer parte do mapa
        >
          {
            devs.map(function (dev) {
              const latitude = dev.location.coordinates[1];
              const longitude = dev.location.coordinates[0];

              return (
                <div className='icon-map' key={dev._id}>
                  <Marker
                    position={{ lat: latitude, lng: longitude }}
                    icon={{
                      url: iconPin,
                      scaledSize: new window.google.maps.Size(60, 60),
                    }}
                    onClick={() => {
                      handleMarkerClick(dev._id, dev.bio);
                    }}
                  >
                    {isOpen && infoWindowData?._id === dev._id && (
                      <InfoWindow onCloseClick={() => setIsOpen(false)}>
                        <DevItemMap dev={dev} />
                      </InfoWindow>
                    )}
                  </Marker>
    
                  <OverlayView
                    position={{ lat: latitude, lng: longitude }}
                    mapPaneName={OverlayView.OVERLAY_MOUSE_TARGET}
                    onClick
                  >
                    <div className="custom-marker-label">
                      <img
                        src={dev.avatar_url}
                        alt="Icon"
                        className="custom-marker-icon"
                        onClick={() => {
                          handleMarkerClick(dev._id, dev.bio);
                        }}
                      />
                    </div>
                  </OverlayView>
                </div>
              );
            })
          }
        </GoogleMap>
      )}
    </div>
  );
}

export default PagMap;