import './App.css';
import {AttConverter} from './components/AttConverter';
import {List} from './components/List/List';
import {MyMap} from './components/MyMap';
import {useState, useEffect} from "react";    


function App() {
    
    const [cities, setCities] = useState([]);
    const [selectedId, setSelectedId] = useState(-1);
    const [sortField, setSortField] = useState("population_2010");
    const [sortAscending, setSortAscending] = useState(true);
    
    const service_url  = "https://services.arcgis.com/P3ePLMYs2RVChkJx/ArcGIS/rest/services/USA_Major_Cities/FeatureServer/0/query";
    
    const fieldAliases = {
        population_2010: "Total Population",
        pct_black: "Percent Black",
        pct_hispanic: "Percent Hispanic",
        pct_asian: "Percent Asian",
        pct_pacific_islander: "Percent Pacific Islander",
        pct_native_american: "Percent Native American"
    };

    useEffect(
        () => {
            fetch(
                service_url+
                "?where="+encodeURIComponent("1 = 1")+
                "&orderByFields="+encodeURIComponent("POPULATION DESC")+
                "&outFields=*"+
                "&resultRecordCount=50"+
                "&outSR=4236"+
                "&f=pjson"
            )
              .then(response => response.json())
              .then(data => {setCities(AttConverter(data.features));});
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
                <h1 className="d-none d-md-block">Prototype: React / Bootstrap / Leaflet</h1>
                <h1 className="h4 d-block d-md-none">Prototype: React / Bootstrap / Leaflet</h1>
            </header>
            <div className="row flex-grow-1 d-flex flex-column flex-md-row overflow-hidden">
                <MyMap className="col h-100" 
                    cities={cities} 
                    selectedId={selectedId}
                    sortField={sortField}                    
                    onSelect={selectCity} 
                    onCancelSelect={cancelSelect}/>
                <div className="col col-xl-4 h-100 overflow-hidden d-flex flex-column pb-1 pb-md-0 pt-2 pt-md-0">
                    <div className="d-flex mb-2 pt-1">
                        <label className="input-group-text bg-white" 
                                style={{"border": "none"}}
                                htmlFor="inputSort">Sort by:</label>
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
                <small className="text-muted">This is the footer.</small>
            </footer>
        </div>
    );

}

export default App;