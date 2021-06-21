import React from 'react';

export const Legend = ({breaks, sortField, fieldAliases, colors, className, style, compact}) => {
    const breakInfo = breaks[sortField] || [];
    return (
        <div className={className} style={style}>
            {
                compact ? <h6>{fieldAliases[sortField]}</h6> : <h5>{fieldAliases[sortField]}</h5>
            }
            <ul className="d-flex" style={{"padding": "0px"}}>
                {
                    breakInfo.map(
                        (item, idx)=> 
                        (
                            <li key={idx} 
                                className="d-flex align-items-center" 
                                style={{"listStyleType": "none"}}>
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
                                <span style={{"fontSize": compact ? "0.75rem" : "1rem"}}>
                                    {
                                        (item.minValue*100).toFixed(2)+
                                        " - "+
                                        (item.maxValue*100).toFixed(2)
                                    }
                                </span>
                            </li>
                        )
                    )
                }
            </ul>        
        </div>
    );
}