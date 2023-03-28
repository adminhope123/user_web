import React, { CSSProperties } from 'react'
import './AttendanceList.css'

export default function ProgressBar({ width }) {

    const styledata  = {
        backgroundColor: '#121625',
        borderRadius: '4px',
        display: 'flex',
        height: '.8rem',
        margin: '1em 0',
        ':before': {
            background: "linear-gradient(to right, #fa3756 0%, #fecb2f 50%, #00bb98 100%)",
            content: "",
            width: "100%",
            animation: "spin 1s ease-in-out forwards",
          }
    };

    return (
        <div>
            <div  style={styledata }>
            <style>{`
            @keyframes spin {
                from {  clip-path: polygon(0 0, 0 0, 0 100%, 0 100%) }
                to {clip-path: polygon(0 0, calc(${width} * 1%) 0, calc(${width} * 1%) 100%, 0 100%) }
            }
        `}</style>
            </div>
        </div>
    )
}
