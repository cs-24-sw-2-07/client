import { socket } from "../../socket";
import { useState } from "react";
export { JoinedSettings }

function JoinedSettings({ lobbyState }) {
  //Setting states:
  const [settingsState, setSettingsState] = useState({
    deckSize: lobbyState.deckSize,
    handSize: lobbyState.handSize,
    maxLife: lobbyState.life,
    lobbySize: lobbyState.lobbySize,
  });

  //TODO: Implement event here 

  return (
    <div>
      <h2>Settings</h2>
      <ShowSetting label="Deck Size:" setting={settingsState.deckSize}/>
      <ShowSetting label="Hand Size:" setting={settingsState.handSize}/>
      <ShowSetting label="Life:" setting={settingsState.life}/>
      <ShowSetting label="lobbySize:" setting={settingsState.lobbySize}/>
    </div>
  );
}

function ShowSetting(label, setting) {
  return (
    <div className="row">
      <div className="col"><p>{label}</p></div>
      <div className="col text-end"><p>{setting}</p></div>
    </div>
  );
}