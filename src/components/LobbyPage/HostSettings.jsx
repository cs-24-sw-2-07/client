import { socket } from "../../socket";
export { Settings }

function Settings({ lobbyState }) {
  //Setting states:
  const [settingsState, setSettingsState] = useState({
    cardCount: lobbyState.deckSize,
    handSize: lobbyState.handSize,
    maxLife: lobbyState.life,
    lobbySize: lobbyState.lobbySize,
  });
    
  return (
    <div>
      <h2>Settings</h2>
      <form>
        <div className="form-group">
          <div className="col-4 bg-light text-dark">
            <label htmlFor="decksize">Deck Size:</label>
            <input
              type="number"
              className="form-control"
              id="decksize"
              value={settingsState.cardCount}
              onChange={(e) => setSettingsState({
                ...settingsState,
                cardCount: e.target.value
              })}
            ></input>
            <label htmlFor="handsize"> Hand Size:</label>
            <input
              type="number"
              className="form-control"
              id="handsize"
              value={settingsState.handSize}
              onChange={(e) => setSettingsState({
                ...settingsState,
                handSize: e.target.value
              })}
            ></input>
            <label htmlFor="Maxlife"> Life: </label>
            <input
              type="number"
              className="form-control"
              id="lifesize"
              value={settingsState.maxLife}
              onChange={(e) => setSettingsState({
                ...settingsState,
                maxLife: e.target.value
              })}
            ></input>
            <label htmlFor="lobbySize"> Lobby Size:</label>
            <input
              type="number"
              className="form-control"
              id="lobbySize"
              value={settingsState.lobbySize}
              onChange={(e) => setSettingsState({
                ...settingsState,
                LobbySize: e.target.value
              })}
            ></input>
          </div>
        </div>
      </form>
    </div>
  );
}
