import React from 'react'
import './card.css'
import { FaCircle } from "react-icons/fa6";
import { PiDotsThreeBold } from "react-icons/pi";

export default function Card(props) {
  return (
    <div className='card-con'>
        <span className='tit'>{props.title}</span>

        <div className='card-con2'>
            <input
            type="radio"
            value="option1"
            />
            <span>{props.desc}</span>
        </div>
        <div className='card-con3'>
            <div className='exc'>
                {/* <BsExclamationSquareFill color='grey'/> */}
                <PiDotsThreeBold />
            </div>
            <div className='cir'>
                <FaCircle color='grey'/>
                <span>Feature Request</span>
            </div>
        </div>
    </div>
  )
}
