import React from 'react'
import './card_priority.css'
import { FaCircle } from "react-icons/fa6";
import { PiDotsThreeBold } from "react-icons/pi";

export default function Cardpriority(props) {
  return (
    <div className='card-con'>
        <div className='card-con1'>
            <span>{props.title}</span>
            <div className='img_div'>
                {/* <img src={user_pic} alt="user"/> */}
                <span>{props.user}</span>
            </div>
        </div>
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
