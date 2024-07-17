import React, { useState } from 'react';
import { YMaps, Map, RouteEditor, Placemark, Polygon } from 'react-yandex-maps';

const YandexMap = () => {
  const [route, setRoute] = useState([]);

  const mapOptions = {
    center: [55.751574, 37.573856],
    zoom: 10,
  };

  const handleRouteChange = (newRoute) => {
    setRoute(newRoute);
  };

  const zones = [
    {
      geometry: {
        coordinates: [
          [
            [55.795, 37.565],
            [55.795, 37.595],
            [55.775, 37.610],
            [55.755, 37.595],
            [55.740, 37.580],
            [55.755, 37.560],
            [55.775, 37.560],
          ],
        ],
      },
      properties: {
        hintContent: 'Зона 1',
        balloonContent: 'Северная зона',
      },
      options: {
        fillColor: `rgba(255, 99, 71, 0.4)`,
        strokeColor: `#FF6347`,
      },
    },
    {
      geometry: {
        coordinates: [
          [
            [55.735, 37.610],
            [55.735, 37.650],
            [55.715, 37.670],
            [55.695, 37.650],
            [55.695, 37.610],
            [55.715, 37.590],
            [55.735, 37.590],
          ],
        ],
      },
      properties: {
        hintContent: 'Зона 2',
        balloonContent: 'Центральная зона',
      },
      options: {
        fillColor: `rgba(100, 149, 237, 0.4)`,
        strokeColor: `#4169E1`,
      },
    },
    {
      geometry: {
        coordinates: [
          [
            [55.715, 37.550],
            [55.715, 37.590],
            [55.695, 37.610],
            [55.675, 37.590],
            [55.675, 37.550],
            [55.695, 37.530],
            [55.715, 37.530],
          ],
        ],
      },
      properties: {
        hintContent: 'Зона 3',
        balloonContent: 'Южная зона',
      },
      options: {
        fillColor: `rgba(60, 179, 113, 0.4)`,
        strokeColor: `#3CB371`,
      },
    },
  ];

  return (
    <YMaps query={{ apikey: 'a3c06cbf-017a-41e0-95cc-be6de4a66ccc' }}>
      <Map defaultState={mapOptions} style={{ width: '100%', height: '100vh' }}>
        <RouteEditor
          onRouteChange={handleRouteChange}
          state={{
            active: true,
            options: {
              autoFitToViewport: true,
            },
          }}
        />
        {route.length > 0 && (
          <Placemark
            geometry={route[route.length - 1].geometry.coordinates}
            options={{ preset: 'islands#greenIcon' }}
          />
        )}
        {zones.map((zone, index) => (
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
