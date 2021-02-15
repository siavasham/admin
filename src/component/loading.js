import React from 'react';

export default function Loading(props) {
    return (
        <div class={"loading " + props?.color}>
            <div></div>
            <div></div>
            <div></div>
            <div></div>
        </div>
    )
}