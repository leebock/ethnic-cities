import './App.css';
import {AttConverter} from './components/AttConverter';
import {List} from './components/List/List';
import {MyMap} from './components/MyMap';
import {Legend} from './components/Legend';
import {useState, useEffect} from "react";    
import FeatureLayer from "@arcgis/core/layers/FeatureLayer";
import classBreaks from "@arcgis/core/smartMapping/statistics/classBreaks";

function App() {
    
    const [cities, setCities] = useState([]);
    const [selectedId, setSelectedId] = useState(-1);
    const [sortField, setSortField] = useState("population_2010");
    const [sortAscending, setSortAscending] = useState(true);
    const [breaks, setBreaks] = useState({});
    
    const service_url  = "https://services.arcgis.com/P3ePLMYs2RVChkJx/ArcGIS/rest/services/USA_Major_Cities/FeatureServer/0/query";
    
    const fieldAliases = {
        population_2010: "Total Population",
        pct_black: "Percent Black",
        pct_hispanic: "Percent Hispanic",
        pct_asian: "Percent Asian",
        pct_pacific_islander: "Percent Pacific Islander",
        pct_native_american: "Percent Native American"
    };
    
    const MIN_POP = 350000;
    const COLORS = ["#feebe2", "#fbb4b9", "#f768a1", "#c51b8a", "#7a0177"];

    useEffect(
        () => {
            fetch(
                service_url+
                "?where="+encodeURIComponent("POP2010 > "+MIN_POP)+
                "&orderByFields="+encodeURIComponent("POP2010 DESC")+
                "&outFields=*"+
                "&outSR=4236"+
                "&f=pjson"
            )
              .then(response => response.json())
              .then(data => {setCities(AttConverter(data.features));});    
              
          const layer = new FeatureLayer({
              url: "https://services.arcgis.com/P3ePLMYs2RVChkJx/ArcGIS/rest/services/USA_Major_Cities/FeatureServer/0",
              definitionExpression: "POP2010 > "+MIN_POP
          });
      
          const params = {
              layer: layer,
              field: "",
              normalizationField: "POP2010",
              classificationMethod: "natural-breaks",
              numClasses: 5		
          };    
          
          const correspondences = {
              pct_black: "BLACK", 
              pct_hispanic: "HISPANIC", 
              pct_asian: "ASIAN",
              pct_pacific_islander: "HAWN_PI",
              pct_native_american: "AMERI_ES"
          };
          Object.keys(correspondences).forEach((item, i) => {
              classBreaks({...params, field: correspondences[item]})
              .then(
                  (response)=>{
                      const newEntry = {};
                      newEntry[item] = response.classBreakInfos;
                      setBreaks(prevState=>Object.assign(prevState, newEntry));
                  }
              );
          });
        
        },
        []
    );

    const selectCity = (id) => {
        setSelectedId(id);
    }
    
    const cancelSelect = () => {
        setSelectedId(-1);
    }
    
    const handleSortChange = (e) => {
        setSortField(e.target.value);
        setSelectedId(-1);
    }
    
    const handleOrderButtonClick = (e) => {
        setSortAscending(!sortAscending);
        const bgImg = sortAscending ? "./sort-down.svg" : "./sort-up.svg" ;
        document.getElementById("buttonSortOrder").style.backgroundImage = "url('"+bgImg+"')";
    }

    return (
        <div className="container-fluid vh-100 d-flex flex-column">
            <header className="row mt-4 mb-3">
                <h1 className="h2 d-none d-md-block">
                Ethnicity and America's 50 most populous cities
                </h1>
                <h1 className="h4 d-block d-md-none">
                Ethnicity and America's 50 most populous cities
                </h1>
            </header>
            <div className="row flex-grow-1 d-flex flex-column flex-md-row overflow-hidden">
                <div className="col h-100 d-flex flex-column px-0 position-relative">
                    <MyMap className="flex-grow-1" 
                        cities={cities}
                        breaks={breaks} 
                        colors={COLORS}
                        selectedId={selectedId}
                        sortField={sortField}                    
                        onSelect={selectCity} 
                        onCancelSelect={cancelSelect}/>
                    {
                        breaks[sortField] &&
                        <Legend className="position-absolute d-flex flex-column p-2 pb-0" 
                                breaks={breaks} 
                                sortField={sortField}
                                fieldAliases={fieldAliases}
                                colors={COLORS} />
                    }
                </div>
                <div className="col col-xl-4 h-100 overflow-hidden d-flex flex-column pb-1 pb-md-0 pt-2 pt-md-0">
                    <div className="d-flex mb-2 pt-1">
                        <label className="input-group-text bg-white d-none d-sm-block" 
                                style={{"border": "none"}}
                                htmlFor="inputSort">Showing:</label>
                        <select id="inputSortField"
                                name="sortField" 
                                className="custom-select flex-grow-1 mr-2"
                                onChange={handleSortChange}>
                            {
                                Object.keys(fieldAliases).map(
                                    (key,idx) => <option key={idx} value={key}>
                                        {fieldAliases[key]}
                                        </option>
                                )
                            }
                        </select>        
                        <button type="button"
                                id="buttonSortOrder"
                                className="btn btn-outline-secondary"
                                style={
                                    {
                                        "backgroundImage": "url('./sort-up.svg')", 
                                        "backgroundRepeat": "no-repeat",
                                        "backgroundSize": "contain",
                                        "backgroundPosition": "center",
                                        "minWidth": "50px",
                                        "marginLeft": "7px"
                                    }
                                }
                                onClick={handleOrderButtonClick}>
                        </button>
                    </div>
                    <List className="list-group w-100 overflow-auto pt-1 pt-md-0"
                        cities={cities}
                        selectedId={selectedId}
                        sortField={sortField}
                        sortAscending={sortAscending}
                        fieldAliases={fieldAliases}
                        onSelect={selectCity} 
                        onCancelSelect={cancelSelect}/>
                </div>
            </div>
            <footer className="row mt-3 mb-3">
                <small className="text-muted">All data based on 2010 Census (via Esri's Living Atlas).  This application was built using React, Bootstrap, ArcGIS API for Javascript, and Leaflet.</small>
            </footer>
        </div>
    );

}

export default App;