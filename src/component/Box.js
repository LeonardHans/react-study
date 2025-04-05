import React from 'react'

const Box = (props) => {
    let fahrenheit;
    if (props.data?.main.temp) {
        fahrenheit = (props.data?.main.temp * 9 / 5 + 32).toFixed(2);
    }
    return (
        <div className="box">
            <div style={{ fontSize: '40px' }}>{props.data?.weather[0].description}</div>
            <p></p>
            <div style={{ fontWeight: 'bold', color: 'orange', fontSize: '20px' }}>{props.data?.name}</div>
            <p></p>
            <div style={props.data?.main.temp < 10 ? { color: 'blue' } : { color: 'firebrick' }}>{props.data && props.data?.main.temp}°C</div>
            <div style={props.data?.main.temp < 10 ? { color: 'blue' } : { color: 'firebrick' }}>{fahrenheit}°F</div>
        </div>
    )
}

export default Box
