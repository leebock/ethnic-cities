export const ListItem = ({city, selected, onSelect}) => {
    const handleItemClick = (event) => {
        onSelect(city.id);
    };    
    const className = "list-group-item list-group-item-action flex-column align-items-start"+(selected ? " active" : "");
    return (
        <button key={city.id} className={className} onClick={handleItemClick}>
          <div className="d-flex w-100 justify-content-between">
            <h5 className="mb-1">{city.name}</h5>
            <small>Unread</small>
          </div>
          <p className="mb-1">Donec id elit non mi porta gravida at eget metus. Maecenas sed diam eget risus varius blandit.</p>
          <small>Donec id elit non mi porta.</small>
        </button>                        
    );
};