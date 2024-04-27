import { socket } from "../../socket";
import { useState } from "react";
export { HostSettings }

//TODO: Currently you cannot change the number --> maybe because the setting has been implemented? 

function HostSettings({ lobbyState }) { 
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
          <CreateSetting 
            label="Deck Size:" 
            id="deckSize" 
            settingsState={settingsState} 
            setSettingsState={setSettingsState}
          />
          <CreateSetting 
            label="Hand Size:" 
            id="handSize" 
            settingsState={settingsState} 
            setSettingsState={setSettingsState}
          />
          <CreateSetting 
            label="Life:" 
            id="lifeSize" 
            settingsState={settingsState} 
            setSettingsState={setSettingsState}
          />
          <CreateSetting 
            label="Lobby Size:" 
            id="lobbySize" 
            settingsState={settingsState} 
            setSettingsState={setSettingsState}
          />
        </div>
      </form>
    </div>
  );
}

function CreateSetting({ label, id, settingsState, setSettingsState }) {
  return (
    <div>
      <label htmlFor={id}>{label}</label>
      <input
        type="number"
        className="form-control"
        id={id}
        value={settingsState.cardCount}
        onChange={(e) => setSettingsState(ReturnSettingObject(e, settingsState, id))}
      ></input>
    </div>
  );
}

function ReturnSettingObject(event, settingsState, key) {
  switch(key) {
    case "deckSize":
      return {
        ...settingsState, 
        deckSize: event.target.value
      };
    case "handSize": 
      return {
        ...settingsState, 
        handSize: event.target.value
      };
    case "lifeSize": 
      return {
        ...settingsState, 
        maxLife: event.target.value
      };
    case "lobbySize":
      return {
        ...settingsState, 
        lobbySize: event.target.value
      };
  }
}