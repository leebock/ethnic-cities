import {useEffect} from 'react';
import {ListItem} from './ListItem';

export const List = ({cities, selectedId, className, onSelect, onCancelSelect}) => {
    
    useEffect(
        () => {
            const el = document.querySelector("button.list-group-item.active");
            if (el) {
                el.scrollIntoView({behavior: "smooth", inline: "nearest"});
            }
        },
        [selectedId]
    )
    
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
