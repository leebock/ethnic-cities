import './App.css';
import {LocationTable} from './components/Table/LocationTable';
import {MyMap} from './components/MyMap';
import {useState} from "react";    


function App() {

    const [cities, setCities] = useState([
        {id: 1, name: "Portland", state: "OR", lat: 45.5, lon: 122.7},
        {id: 2, name: "Nashville", state: "TN", lat: 36.1, lon: 87.78}
    ]);

    const deleteCity = (idToDelete) => {
        setCities(cities.filter((city) => city.id !== idToDelete));
    }
    
    return (
        <>
            <header><h1>My First React App</h1></header>
            <MyMap/>
            <LocationTable cities={cities} onDelete={deleteCity}/>
            <footer>Thanks for looking at my app.</footer>
        </>
    );

}

export default App;
