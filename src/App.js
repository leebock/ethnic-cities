import './App.css';
import {AttConverter} from './components/AttConverter';
import {List} from './components/List/List';
import {MyMap} from './components/MyMap';
import {useState, useEffect} from "react";    


function App() {
    
    const [cities, setCities] = useState([]);
    const [sortField, setSortField] = useState("population");
    const [sortOrder, setSortOrder] = useState("asc");
    
    const service_url  = "https://services.arcgis.com/P3ePLMYs2RVChkJx/ArcGIS/rest/services/USA_Major_Cities/FeatureServer/0/query";
    const fieldAliases = {
        population: "Total Population",
        pct_white: "Percent White (2010)",
        pct_black: "Percent Black (2010)",
        pct_asian: "Percent Asian (2010)"
    };

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
              .then(data => {setCities(AttConverter(data.features));});
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
    
    const handleSortChange = (e) => {
        setSortField(e.target.value);
        setSelectedId(-1);
    }
    
    const handleOrderChange = (e) => {
        setSortOrder(e.target.value);
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
                <div className="col col-xl-3 h-100 overflow-hidden d-flex flex-column pb-1 pb-md-0 pt-2 pt-md-0">
                    <div className="input-group mb-2">
                        <div className="input-group-prepend">
                            <label className="input-group-text bg-white" htmlFor="inputSort">Sort by:</label>
                        </div>
                        <select id="inputSortField"
                                name="sortField" 
                                className="custom-select flex-grow-1"
                                onChange={handleSortChange}>
                            <option value="population">Total Population</option>
                            <option value="pct_white">Percent White (2010)</option>
                            <option value="pct_black">Percent Black (2010)</option>
                            <option value="pct_asian">Percent Asian (2010)</option>
                        </select>        
                        <select id="inputSortOrder"
                                name="ascDesc" 
                                className="custom-select"
                                onChange={handleOrderChange}>
                            <option value="asc">Ascending</option>
                            <option value="desc">Descending</option>
                        </select>
                    </div>
                    <List className="list-group w-100 overflow-auto pt-1 pt-md-0"
                        cities={cities}
                        selectedId={selectedId}
                        sortField={sortField}
                        sortOrder={sortOrder}
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
