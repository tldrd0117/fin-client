import React from 'react';
import Button from './Button';

export default (props) => {
    const {onClick, iconColor, className} = props;
    return <>
        <style jsx>{`
        `}</style>
        <button onClick={onClick} className={`flex items-center justify-center pl-1
            focus:outline-none text-white text-sm rounded-md bg-blue-500 
            hover:bg-blue-600 hover:shadow-lg p-0 text-center 
            rounded-full w-10 h-10 ${className?className : ""}`}>
            <svg width="11px" height="14px" viewBox="0 0 11 14" >
                <title>play_arrow</title>
                <desc>Created with Sketch.</desc>
                <g id="Icons" stroke="none" strokeWidth="1" fill="none" fillRule="evenodd">
                    <g id="Rounded" transform="translate(-753.000000, -955.000000)">
                        <g id="AV" transform="translate(100.000000, 852.000000)">
                            <g id="-Round-/-AV-/-play_arrow" transform="translate(646.000000, 98.000000)">
                                <g>
                                    <rect id="Rectangle-Copy-50" x="0" y="0" width="24" height="24"></rect>
                                    <path d="M7,6.82 L7,17.18 C7,17.97 7.87,18.45 8.54,18.02 L16.68,12.84 C17.3,12.45 17.3,11.55 16.68,11.15 L8.54,5.98 C7.87,5.55 7,6.03 7,6.82 Z" id="🔹Icon-Color" fill={iconColor}></path>
                                </g>
                            </g>
                        </g>
                    </g>
                </g>
            </svg>
        </button>
    </>
}