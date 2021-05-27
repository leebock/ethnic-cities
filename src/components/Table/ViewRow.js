export const ViewRow = ({city, onDelete}) => {
    const handleClick = (event) => {onDelete(city.id)};
    return (
        <tr>
            <td>{city.id}</td>
            <td>{city.name}</td>
            <td>{city.state}</td>
            <td>{city.lat}</td>
            <td>{city.lon}</td>
            <td>
                <button className="btn btn-secondary">Edit</button>
                <button className="btn btn-danger" onClick={handleClick}>Remove</button>
            </td>
        </tr>        
    );
}