import React from "react";
import './Instruments.css'
import { Guitar } from "./Guitar/Guitar";
import { Ukulele } from "./Ukulele/Ukulele";
import { Piano } from "./Piano/Piano";

export default function Instruments() {
    return (
      <div className="home-page-instruments">
        <Guitar/>
        <Piano/>
        <Ukulele/>
      </div>
      
    )
}