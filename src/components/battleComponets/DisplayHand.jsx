import { useState } from "react";
import { useNavigate } from "react-router-dom";

function DisplayHand(props) {
 
  return (
    <div className="row">
      <div className="col-4"><p>1</p></div>
      <div className="col-4"><p>2</p></div>
      <div className="col-4"><p>3</p></div>
      <div className="col-4"><p>4</p></div>
    </div>
  );
}


export {DisplayHand};