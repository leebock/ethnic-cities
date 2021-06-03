import './App.css';
import {LocationTable} from './components/Table/LocationTable';
import {MyMap} from './components/MyMap';
import {useState} from "react";    


function App() {

    const [cities, setCities] = useState([
        {id: 1, name: "Portland", state: "OR", lat: 45.5, lon: -122.7},
        {id: 2, name: "Nashville", state: "TN", lat: 36.1, lon: -86.78},
        {id: 3, name: "Boston", state: "MA", lat: 42.36, lon: -71.05}
    ]);
    
    const [editId, setEditId] = useState(-1);

    const deleteCity = (idToDelete) => {
        setCities(cities.filter((city) => city.id !== idToDelete));
        setEditId(-1);
    }
    
    const editCity = (idToEdit) => {
        setEditId(idToEdit);
    }
    
    const cancelEditable = () => {
        setEditId(-1);
    }
    /*
    const appendCity = (city) => {
        setCities([
            ...cities,
            {
                ...city,
                id: Math.max(...cities.map((city)=> city.id),0)+1
            }
        ]);
        setEditId(-1);
    }
    */
    const replaceCity = (cityToSave) => {
        var copy = cities.slice();
        var idx = copy.findIndex((element)=> element.id === cityToSave.id);
        copy.splice(idx, 1, cityToSave);
        setCities(copy);
        setEditId(-1);
    }
    
    return (
        <div className="vh-100 d-flex flex-column">
            <header className="container mt-5"><h1>My First React App</h1></header>
            <div className="container d-flex flex-column flex-grow-1">
                <div className="row flex-grow-1">
                    <MyMap cities={cities}/>
                </div>
                <div className="row">
                        <LocationTable cities={cities} 
                                    editId={editId} onEdit={editCity}
                                    onSave={replaceCity} 
                                    onDelete={deleteCity}
                                    onCancel={cancelEditable}/>                    
                </div>
            </div>
            <footer className="container mb-5">This is the footer.</footer>
        </div>
    );

}

export default App;
