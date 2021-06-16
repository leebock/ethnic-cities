import React, { useEffect } from 'react';
import L from 'leaflet';

export const MyMap = ({
        cities,
        breaks, 
        selectedId, 
        sortField, 
        onSelect, 
        onCancelSelect, 
        className
    }) => {
    
    const _mapRef = React.useRef(null);
    const _layerGroupRef = React.useRef(null);
    const _selectCity = React.useRef(onSelect);
    const _cancelSelect = React.useRef(onCancelSelect);
    
    useEffect(
        () => {
            console.log("map::creating map");
            _mapRef.current = L.map('map', {
                  center: [40, -100],
                  zoom: 3,
                  layers: [
                    L.tileLayer(
                        'https://{s}.tile.osm.org/{z}/{x}/{y}.png', 
                        {
                            attribution: '&copy; <a href="https://osm.org/copyright">OpenStreetMap</a> contributors'
                        }
                    )
                  ]
              }).on("click", ()=>{_cancelSelect.current();});
            return () => {_mapRef.current.remove();};
        },
        []
    );
    
    useEffect(
        () => {

            if (cities.length === 0) {
                return;
            }

            console.log("map::creating layerGroup");
            
            const sorted = cities
                .slice()
                .sort(
                    (a,b) => {
                        if (a[sortField] > b[sortField]) {
                            return -1;
                        }
                        if (a[sortField] < b[sortField]) {
                            return 1
                        }
                        return 0;
                    }
                )
                .map((item, idx)=>{return {...item, rank: idx+1};})
                .sort(
                    (a,b) => {
                        if (a.population_2010 > b.population_2010) {
                            return -1;
                        }
                        if (a.population_2010 < b.population_2010) {
                            return 1
                        }
                        return 0;
                    }
                );

            const MAX_POP = cities[0].population_2010;

            if (_layerGroupRef.current) {
                _mapRef.current.removeLayer(_layerGroupRef.current);
            }

            const breakInfo = breaks[sortField];

            _layerGroupRef.current = L.featureGroup(
                sorted.map((city)=>{
                    let range = null;
                    if (breakInfo) {
                        range = breakInfo.reduce(
                            (accumulator, current, idx)=>{
                                if (city[sortField]>current.minValue) {
                                    accumulator = idx;
                                }
                                return accumulator;
                            },
                            0
                        );
                    }
                    const colors = ["#feebe2", "#fbb4b9", "#f768a1", "#c51b8a", "#7a0177"];
                    const color = range === null ? "gray" : colors[range];
                    const marker = L.circleMarker(
                        [city.lat,city.lon],
                        {
							radius: calcRadius(city.population_2010),
                            color: "black",
							weight: 1,
							opacity: 1,
							fillOpacity: 0.8,
                            fillColor: color
						}                        
                    );
                    marker.properties = city;
                    marker.bindTooltip(city.name+": "+city.rank);
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
            
            _mapRef.current.fitBounds(_layerGroupRef.current.getBounds());
            
            function calcRadius(confirmed)
			{
				var r = 1;
				var R = 35;
				var x = confirmed / MAX_POP;
				return ( (R - r) * Math.pow(x-1,5) + R );
			}
            
        },
        [cities, breaks, sortField]
    );    

    useEffect(
        () => {
            console.log("map::updating selected marker ", selectedId);
            const layerGroup = _layerGroupRef.current;
            if (selectedId !== -1) {
                const marker = layerGroup.getLayers()
                    .filter((layer)=>{return layer.properties.id === selectedId})
                    .shift();
                marker.openPopup();
                _mapRef.current.flyToBounds(
                    L.latLng(marker.properties.lat, marker.properties.lon).toBounds(2000000)
                );
            } else {
                _mapRef.current.closePopup();
            }
        },
        [selectedId]
    )
        
    return (<div id="map" className={className}></div>);
    
}