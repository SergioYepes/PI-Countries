import React from "react";
import { Link } from "react-router-dom";

function Error(){
    return(
        <>
            <h1>404 NOT FOUND BABE</h1>
            <Link to={"/home"}></Link>
        </>
    )
}
export default Error