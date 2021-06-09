import './App.css';
import {List} from './components/List/List';
import {MyMap} from './components/MyMap';
import {useState} from "react";    


function App() {
    
    const [cities] = useState(
        [
            {id: 1, name: "Beantown", state: "MA", lat: 42.36, lon: -71.05},
            {id: 2, name: "Motown", state: "MI", lat: 42.33, lon: -83.05},
            {id: 3, name: "Naptown", state: "IN", lat: 39.77, lon: -86.16},
            {id: 4, name: "Stumptown", state: "OR", lat: 45.5, lon: -122.7},
            {id: 5, name: "Tinseltown", state: "CA", lat: 34.09, lon: -118.33},
            {id: 6, name: "Twangtown", state: "TN", lat: 36.1, lon: -86.78}
        ]
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
                <h1>Prototype: React / Bootstrap / Leaflet</h1>
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
            <footer className="container mt-3 mb-3">This is the footer.</footer>
        </div>
    );

}

export default App;
