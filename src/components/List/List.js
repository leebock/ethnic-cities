import {useEffect} from 'react';
import {ListItem} from './ListItem';

export const List = ({
    cities, 
    selectedId, 
    sortField, 
    sortOrder,
    fieldAliases,
    className, 
    onSelect, 
    onCancelSelect
}) => {
    
    console.log("--> updating list");

    useEffect(
        () => {
            const el = document.querySelector("button.list-group-item.active");
            if (el) {
                el.scrollIntoView({behavior: "smooth", inline: "nearest"});
            } else {
                document.querySelector(".list-group").scroll({top:0, behavior: "smooth"});
            }
        },
        [selectedId]
    )
    
    useEffect(
        () => {
            document.querySelector(".list-group").scroll({top:0, behavior: "smooth"});
        },
        [sortField]
    )
    
    const sorted = cities
        .slice()
        .sort(
            (a,b) => {
                if (a[sortField] > b[sortField]) {
                    return -1;
                }
                if (a[sortField] < b[sortField]) {
                    return 1
                }
                return 0;
            }
        )
        .map((item, idx)=>{return {...item, rank: idx+1};});
    
    if (sortOrder === "desc") {
        sorted.reverse();
    }
    
    return (
        <div className={className}>
        {
            sorted.map(
                (city) => {
                    return <ListItem 
                            key={city.id} 
                            city={city} 
                            selected={city.id === selectedId}
                            sortField={sortField}
                            fieldAliases={fieldAliases}
                            onSelect={onSelect}/>
                }
            )
        }
        </div>    
    );
}