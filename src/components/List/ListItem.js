export const ListItem = ({city, selected, sortField, fieldAliases, onSelect}) => {

    const handleItemClick = (event) => {onSelect(city.id);};    
    const className = "list-group-item list-group-item-action d-flex flex-column align-items-start"+(selected ? " active" : "");
    const formatValue = (field) => {
        return (city[field] * (field.includes("pct") ? 100 : 1)).toLocaleString() + 
                (field.includes("pct") ? "%" : "");
    }

    return (
        <button key={city.id} className={className} onClick={handleItemClick}>
            <div className="d-flex w-100 justify-content-between">
                <h4 className="mb-1">{city.name}, {city.state}</h4>
                <small>Rank: <strong>{(city.rank)}</strong></small>
            </div>
            <div className="mb-1">
                {fieldAliases[sortField]}: <strong>{formatValue(sortField)}</strong>
            </div>
            <div className="chart"></div>
        </button>                        
    );
};