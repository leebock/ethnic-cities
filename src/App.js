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
                                    population_2010: feature.attributes.POP2010,
                                    rank: idx+1,
                                    white: feature.attributes.WHITE,
                                    black: feature.attributes.BLACK,
                                    native_american: feature.attributes.AMERI_ES,
                                    asian: feature.attributes.ASIAN,
                                    pacific_islander: feature.attributes.HAWN_PI,
                                    hispanic: feature.attributes.HISPANIC,
                                    other: feature.attributes.OTHER,
                                    multi_race: feature.attributes.MULT_RACE,
                                    pct_white: feature.attributes.WHITE/feature.attributes.POP2010,
                                    pct_black: feature.attributes.BLACK/feature.attributes.POP2010,
                                    pct_native_american: feature.attributes.AMERI_ES/feature.attributes.POP2010,
                                    pct_asian: feature.attributes.ASIAN/feature.attributes.POP2010,
                                    pct_pacific_island: feature.attributes.HAWN_PI/feature.attributes.POP2010,
                                    pct_hispanic: feature.attributes.HISPANIC/feature.attributes.POP2010,
                                    pct_other: feature.attributes.OTHER/feature.attributes.POP2010,
                                    pct_multi_race: feature.attributes.MULT_RACE/feature.attributes.POP2010,
                                    male: feature.attributes.MALES,
                                    female: feature.attributes.FEMALES                                     
                                }
                            }  
                          )
                      );
                  }
              );
        },
        []
    );

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
                <div className="col col-xl-3 h-100 overflow-hidden d-flex pb-1 pb-md-0 pt-2 pt-md-0">
                    <List className="list-group w-100 overflow-auto pt-1 pt-md-0"
                        cities={cities}
                        selectedId={selectedId}
                        onSelect={selectCity} 
                        onCancelSelect={cancelSelect}/>
                </div>
            </div>
            <footer className="row mt-3 mb-3">
                <small className="text-muted">This is the footer.</small>
            </footer>
        </div>
    );

}

export default App;
