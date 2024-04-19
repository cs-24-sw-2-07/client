import { useState } from "react";
import { useNavigate } from "react-router-dom";

function DisplayHand(props) {
 
  return (
    <div className="row">
      <DisplayCardInHand/>
    </div>
  );
}

function DisplayCardInHand(props) {
  return (<>
    {props.hand.map(()=>{<div className="col-4"></div>})}
  </>
  );
}

export {DisplayHand};