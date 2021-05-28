import {ViewRow} from "./ViewRow";
import {EditRow} from "./EditRow";

export const LocationTable = ({cities, editId, onEdit, onDelete, onSave, onCancel}) => {
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
                    cities.map(
                        (city) => {
                            let row;
                            if (city.id === editId) {
                                row = <EditRow city={city} 
                                        onSave={onSave} 
                                        onCancel={onCancel}/>;
                            } else {
                                row = <ViewRow city={city} 
                                    onEdit={onEdit} 
                                    onDelete={onDelete}/>;
                            }
                            return row;
                        }
                    )
                }
            </tbody>
        </table>          
    );
}