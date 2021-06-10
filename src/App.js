import './App.css';
import {List} from './components/List/List';
import {MyMap} from './components/MyMap';
import {useState, useEffect} from "react";    


function App() {
    
    const [cities, setCities] = useState([]);
    
    const service_url  = "https://services.arcgis.com/P3ePLMYs2RVChkJx/ArcGIS/rest/services/USA_Major_Cities/FeatureServer/0/query";

    useEffect(
        () => {
            fetch(
                service_url+
                "?where="+encodeURIComponent("POP_CLASS >= 9")+
                "&orderByFields="+encodeURIComponent("POPULATION DESC")+
                "&outFields=*"+
                "&outSR=4236"+
                "&f=pjson"
            )
              .then(response => response.json())
              .then(
                  data => {
                      setCities(
                          data.features.map(
                            (feature, idx) => {
                                return {
                                    id: feature.attributes.FID, 
                                    name: feature.attributes.NAME, 
                                    lat: feature.geometry.y, 
                                    lon: feature.geometry.x,
                                    state: feature.attributes.ST,
                                    population: feature.attributes.POPULATION,
                                    rank: idx+1 
                                }
                            }  
                          )
                      );
                  }
              );
        },
        []
    )



    const [selectedId, setSelectedId] = useState(-1);

    const selectCity = (id) => {
        setSelectedId(id);
    }
    
    const cancelSelect = () => {
        setSelectedId(-1);
    }

    return (
        <div className="container-fluid vh-100 d-flex flex-column">
            <header className="row mt-4 mb-3">
                <h1 className="d-none d-md-block">Prototype: React / Bootstrap / Leaflet</h1>
                <h1 className="h4 d-block d-md-none">Prototype: React / Bootstrap / Leaflet</h1>
            </header>
            <div className="row flex-grow-1 d-flex flex-column flex-md-row overflow-hidden">
                <MyMap className="col h-100" 
                    cities={cities} 
                    selectedId={selectedId}
                    onSelect={selectCity} 
                    onCancelSelect={cancelSelect}/>
                <List className="col col-xl-3 h-100 list-group overflow-auto"
                    cities={cities}
                    selectedId={selectedId}
                    onSelect={selectCity} 
                    onCancelSelect={cancelSelect}/>
            </div>
            <footer className="row mt-3 mb-3"><small className="text-muted">This is the footer.</small></footer>
        </div>
    );

}

export default App;
