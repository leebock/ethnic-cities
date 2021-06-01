import {ViewRow} from "./ViewRow";
import {EditRow} from "./EditRow";
import PropTypes from 'prop-types';

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
                                row = <EditRow key={city.id} city={city} 
                                        onSave={onSave} 
                                        onCancel={onCancel}/>;
                            } else {
                                row = <ViewRow key={city.id} city={city} 
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

LocationTable.propTypes = {
    cities: PropTypes.array.isRequired,
    editId: PropTypes.number.isRequired,
    onEdit: PropTypes.func.isRequired,
    onDelete: PropTypes.func.isRequired,
    onSave: PropTypes.func.isRequired,
    onCancel: PropTypes.func.isRequired
}