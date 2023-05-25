import React from 'react';
import { Link } from 'react-router-dom';

export const NotFound = () => {

    return (
        <>
            <p>
                <Link to="/login">GO TO LOGIN</Link>
            </p>
            <p>
                <Link to="/">GO TO MAIN</Link>
            </p>
            <p>Sorry, page not found</p>
        </>
    )
}