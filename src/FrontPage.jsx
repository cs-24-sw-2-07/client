import { useNavigate } from "react-router-dom";

function FrontPage(){ 
  const navigate = useNavigate();
  function navigateTo(path){
    navigate(path);
  }
  
  return (
    <>
      <div className="container text-center">
        <h1 className="p-5">Flashcard Versus Game</h1>
        <div className="p-5"></div>
        <div className="row">
          <div className="d-grid gap-2 col">
            <button type="button" className="btn btn-primary btn-lg" onClick={()=>{navigateTo("/LobbyPage");}}>Join Game</button>
          </div>
          <div className="d-grid gap-2 col">
            <button type="button" className="btn btn-primary btn-lg" onClick={()=>{navigateTo("/HostGamePage");}}>Host Game</button>
          </div>
          <div className="row p-5">
            <div className="d-grid gap-2 col-8 mx-auto">
              <button type="button" className="btn btn-primary btn-lg" onClick={()=>{navigateTo("/CreateDeckPage");}}>Create or Edit Decks</button>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

export default FrontPage;