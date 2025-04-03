import React, { useEffect } from "react";

const Timer = () => {
    useEffect( () => {
        const interval = setInterval(() => {
            console.log("Run count");
        }, 1000);

        return () => { /********** Unmount 시에 호출되는 함수 *******/
            console.log("Timer is down");
            clearInterval( interval );
        }; 
    }, []);
    return <div>Timer</div>;
}

export default Timer;