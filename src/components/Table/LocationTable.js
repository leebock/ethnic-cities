import {ViewRow} from "./ViewRow";

export const LocationTable = ({cities, onDelete}) => {
    return (
        <table className="table">
            <thead>
                <tr>
                  <th>Id</th>
                  <th>City</th>
                  <th>State</th>
                  <th>Lat</th>
                  <th>Lon</th>
                  <th>Actions</th>
                </tr>            
            </thead>
            <tbody>
                {
                    cities.map((city) => <ViewRow city={city} onDelete={onDelete}/>)
                }
            </tbody>
        </table>          
    );
}