import { useState } from "react";
import { useNavigate } from "react-router-dom";

function DisplayLives(props) {
 
  return (
    <div className="row">
      <div className="col-6">
        <h1>MyLives: {props.myLives}❤{[props.myLives-props.maxLives]}🖤</h1>
      </div>
      <div className="col-6 text-end">
        <h1>OppLives: {props.oppLives}❤{props.oppLives-props.maxLives}🖤</h1>
      </div>
    </div>
  );
}


export {DisplayLives};