export const ViewRow = ({city, onDelete, onEdit}) => {
    const handleDeleteClick = (event) => {onDelete(city.id)};
    const handleEditClick = (event) => {onEdit(city.id)};
    return (
        <tr>
            <td>{city.id}</td>
            <td>{city.name}</td>
            <td>{city.state}</td>
            <td>{city.lat}</td>
            <td>{city.lon}</td>
            <td>
                <button className="btn" onClick={handleEditClick}>Edit</button>
                <button className="btn btn-danger" onClick={handleDeleteClick}>Remove</button>
            </td>
        </tr>        
    );
}