import { useEffect } from "react";

const User = ({name}) => {
    useEffect(()=>{
        // console.log("use effect called")

        return (()=>{
            // console.log("use effect unmounted")
        });
    },[]);

    // console.log("return html")
    return <div className="user-card">
            <h2>{name}</h2>
            {/* <h3>Location: Manglorek</h3> */}
            {/* <h4>Contact: </h4> */}
    </div>
}

export default User;