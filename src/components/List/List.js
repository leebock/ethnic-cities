import {ListItem} from './ListItem';

export const List = ({cities, selectedId, className, onSelect, onCancelSelect}) => {
    return (
        <div className={className}>
        {
            cities.map(
                (city) => {
                    return <ListItem 
                            key={city.id} 
                            city={city} 
                            selected={city.id === selectedId}
                            onSelect={onSelect}/>
                }
            )
        }
        </div>    
    );
}
