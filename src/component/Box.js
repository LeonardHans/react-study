import React from 'react'

const Box = (props) => {
    
    let border = '5px solid black';
    if (props.status == 'Win') {
        border = '30px solid green';
    }
    else if (props.status == 'Lose') {
        border = '5px solid red';
    }
    else if (props.status == 'Draw') {
        border = '5px solid white';
    }

    return (
        <div className="box" style={{ border }}>
            <h1>{props.title}</h1>
            <img className="item-img" src={props.item?.image}></img>
            <h2>{props.status}</h2>
        </div>
    )
}

export default Box