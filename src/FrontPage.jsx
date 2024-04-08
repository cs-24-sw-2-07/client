import { useNavigate } from "react-router-dom";

function FrontPage(){ 
  const navigate = useNavigate();
  function handleClick(path){
    navigate(path);
  }
  
  return (
    <>
      <div className="container text-center">
        <div className="row">
          <div className="text-center p-5"><h1>Flashcard Versus Game</h1></div>
        </div>
        <div className="row p-5"></div>
        <div className="row">
          <div className="col">
            <button type="button" className="btn btn-primary btn-lg" onClick={()=>{handleClick("/LobbyPage");}}>Join Game</button>
          </div>
          <div className="col">
            <button type="button" className="btn btn-primary btn-lg" onClick={()=>{handleClick("/HostGamePage");}}>Host Game</button>
          </div>
          <div className="row p-5">
            <div className="d-grid gap-2 col-8 mx-auto">
              <button type="button" className="btn btn-primary btn-lg" onClick={()=>{handleClick("/CreateDeckPage");}}>Create or Edit Decks</button>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

export default FrontPage;