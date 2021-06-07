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

export const MyMap = ({cities, selectedId, onSelect, onCancelSelect, className}) => {
    
    const _mapRef = React.useRef(null);
    const _layerGroupRef = React.useRef(null);
    const _selectCity = React.useRef(onSelect);
    const _cancelSelect = React.useRef(onCancelSelect);
    
    useEffect(
        () => {
            console.log("creating map");
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
              }).on("click", ()=>{_cancelSelect.current();});
              _layerGroupRef.current = L.featureGroup(
                  cities.map((city)=>{
                      const marker = L.marker([city.lat,city.lon]);
                      marker.properties = city;
                      marker.bindTooltip(city.name);
                      marker.bindPopup(city.name,{closeButton: false});
                      return marker;
                  })
              )
              .addTo(_mapRef.current)
              .on(
                  "click", 
                  (e)=> {
                      const el = document.querySelector(".leaflet-tooltip");
                      if (el) {el.remove();}
                      _selectCity.current(e.layer.properties.id);
                  }
              );              
            return () => {_mapRef.current.remove();};
        },
        [cities]
    );    

    useEffect(
        () => {
            console.log("updating selected marker ", selectedId);
            const layerGroup = _layerGroupRef.current;
            if (selectedId !== -1) {
                const marker = layerGroup.getLayers()
                    .filter((layer)=>{return layer.properties.id === selectedId})
                    .shift();
                marker.openPopup();
                _mapRef.current.flyToBounds(
                    L.latLng(marker.properties.lat, marker.properties.lon).toBounds(2000000)
                );
            }
        },
        [selectedId]
    )
        
    return (<div id="map" className={className}></div>);
    
}