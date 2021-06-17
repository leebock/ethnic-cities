import React from 'react';

export const Legend = ({breaks, sortField, fieldAliases, colors, className}) => {

    const breakInfo = breaks[sortField] || [];
    console.log("legend::updating");
    console.log(breakInfo);
    return (
        <div className={className} 
            style={{
                "zIndex": "1000", 
                "bottom": "0px", 
                "backgroundColor": "white", 
                "opacity": "0.7"
            }}>
            <h5>{fieldAliases[sortField]}</h5>
            <ul className="d-flex" style={{"padding": "0px"}}>
                {
                    breakInfo.map(
                        (item, idx)=> 
                        (
                            <li key={idx} className="d-flex align-items-center" style={{"listStyleType": "none"}}>
                                <div className="swatch flex-shrink-0" 
                                    style={{
                                        "backgroundColor": colors[idx],
                                        "width": "20px",
                                        "height": "20px",
                                        "borderRadius": "20px",
                                        "border": "solid",
                                        "borderWidth": "1px",
                                        "marginLeft": "4px",
                                        "marginRight": "5px"
                                    }}/>
                                <span>{(item.minValue*100).toFixed(2)+" - "+(item.maxValue*100).toFixed(2)}</span>
                            </li>
                        )
                    )
                }
            </ul>        
        </div>
    );
}