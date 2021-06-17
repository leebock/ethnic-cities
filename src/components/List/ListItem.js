export const ListItem = ({city, selected, sortField, fieldAliases, onSelect}) => {

    const handleItemClick = (event) => {onSelect(city.id);};    
    const className = "list-group-item list-group-item-action d-flex flex-column align-items-start"+(selected ? " active" : "");
    const formatValue = (field) => {
        let formatted = city[field];
        if (field.includes("pct")) {
            formatted = (formatted * 100).toFixed(2)+"%";
        } else {
            formatted = formatted.toLocaleString();
        }
        return formatted;
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