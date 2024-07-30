import React, { useEffect, useRef, useState } from 'react';
import { YMaps, Map, RoutePanel, ZoomControl, Polygon } from 'react-yandex-maps';
import axios from 'axios';

const DELIVERY_API_KEY = 'a3c06cbf-017a-41e0-95cc-be6de4a66ccc';

const YandexMap = () => {
  const mapRef = useRef(null);
  const [deliveryZones, setDeliveryZones] = useState([]);

  useEffect(() => {
    const fetchDeliveryZones = async () => {
      try {
        const response = await axios.get('/delivery-zones.json');
        setDeliveryZones(response.data);
      } catch (error) {
        console.error('Error loading delivery zones:', error);
      }
    };

    fetchDeliveryZones();
  }, []);

  useEffect(() => {
    if (window.ymaps && deliveryZones.length) {
      const map = mapRef.current;

      deliveryZones.forEach((zone) => {
        const polygon = new window.ymaps.Polygon(
          zone.geometry.coordinates,
          zone.properties,
          zone.options
        );

        map.geoObjects.add(polygon);
      });
    }
  }, [deliveryZones]);

  return (
    <YMaps query={{ apikey: DELIVERY_API_KEY }}>
      <Map
        defaultState={{
          center: [55.755826, 37.6172999],
          zoom: 12,
          controls: [],
        }}
        width="100%"
        height="100%"
        instanceRef={(map) => (mapRef.current = map)}
        onLoad={() => console.log('Map loaded')}
      >
        <RoutePanel
          options={{
            showHeader: false,
            title: '',
          }}
          routePanel={{
            types: { auto: true },
          }}
        />
        <ZoomControl
          options={{
            size: 'small',
            float: 'none',
            position: {
              bottom: 145,
              right: 10,
            },
          }}
        />
        {deliveryZones.map((zone, index) => (
          <Polygon
            key={index}
            geometry={zone.geometry.coordinates}
            options={{
              fillColor: zone.options.fillColor,
              strokeColor: zone.options.strokeColor,
              strokeWidth: 2,
            }}
            properties={zone.properties}
          />
        ))}
      </Map>
    </YMaps>
  );
};

export default YandexMap;
