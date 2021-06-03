import React, { useEffect } from 'react';
import L from 'leaflet';

import iconUrl from 'leaflet/dist/images/marker-icon.png';
import iconRetinaUrl from 'leaflet/dist/images/marker-icon-2x.png';
import shadowUrl from 'leaflet/dist/images/marker-shadow.png';

delete L.Icon.Default.prototype._getIconUrl;

L.Icon.Default.mergeOptions({
    iconRetinaUrl: iconRetinaUrl, 
    iconUrl: iconUrl, 
    shadowUrl: shadowUrl
});


export const MyMap = ({cities}) => {
    
    const _mapRef = React.useRef(null);
    const _layerGroupRef = React.useRef(null);

    useEffect(
        () => {
            _mapRef.current = L.map('map', {
                  center: [40, -100],
                  zoom: 3,
                  layers: [
                    L.tileLayer(
                        'http://{s}.tile.osm.org/{z}/{x}/{y}.png', 
                        {
                            attribution: '&copy; <a href="http://osm.org/copyright">OpenStreetMap</a> contributors'
                        }
                    )
                  ]
              });
            return () => {_mapRef.current.remove();};
        },
        []
    );    
    
    useEffect(
        () => {
            const layerGroup = _layerGroupRef.current;
            const map = _mapRef.current;
            if (layerGroup) {
                layerGroup.clearLayers();
                map.removeLayer(layerGroup);
            }
            _layerGroupRef.current = L.layerGroup(
                cities.map((city)=>L.marker([city.lat,city.lon]))
            ).addTo(map);
            map.invalidateSize();
        },
        [cities]
    )
    
    return (<div id="map"></div>);
    
}