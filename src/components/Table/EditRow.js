import {useState} from "react";
export const EditRow = ({city, onSave: saveEdit, onCancel: cancelEdit}) => {
    const [editForm, setEditForm] = useState(
        {
            id: city.id,
            name: city.name,
            state: city.state,
            lat: city.lat,
            lon: city.lon
        }
    );
    const handleChange = (e) => {
        setEditForm({...editForm, [e.target.name]: e.target.value});
    }
    return (
        <tr>
            <td>{editForm.id}</td>
            <td><input name="name" type="text" value={editForm.name} onChange={handleChange}/></td>
            <td><input name="state" type="text" value={editForm.state} onChange={handleChange}/></td>
            <td><input name="lat" type="text" value={editForm.lat} onChange={handleChange}/></td>
            <td><input name="lon" type="text" value={editForm.lon} onChange={handleChange}/></td>
            <td>
                <button className="btn btn-primary" onClick={()=>{saveEdit(editForm);}}>Save</button>
                <button className="btn" onClick={()=>{cancelEdit();}}>Cancel</button>
            </td>
        </tr>        
    );
}