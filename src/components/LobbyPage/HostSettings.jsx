import { socket } from "../../socket";
import { useState, useEffect } from "react";
export { HostSettings, ReturnSettingObject } //TODO: Move function into seperate file

function HostSettings({ lobbyState, roomID }) {
  //Setting states:
  const [settingsState, setSettingsState] = useState({
    cardCount: lobbyState.deckSize,
    handSize: lobbyState.handSize,
    maxLife: lobbyState.life,
    lobbySize: lobbyState.lobbySize,
  });
  console.log(settingsState);
  //Event handler
  useEffect(() => {
    socket.on("cantChangeSettings", (data) => {
      const setting = data.key; 
      setSettingsState(ReturnSettingObject(data[setting], settingsState, setting));
      console.log(settingsState);
    });
    socket.on("changeSetting", (data) => {
      const setting = data.key; 
      setSettingsState(ReturnSettingObject(data[setting], settingsState, setting));
      console.log("Accepted", settingsState);
    });

    return () => {
      socket.off("cantChangeSettings"); 
    };
  }, []);

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
            lobbyid={roomID}
            min="15"
            max="50"
          />
          <CreateSetting 
            label="Hand Size:"
            id="handSize"
            settingsState={settingsState}
            setSettingsState={setSettingsState}
            lobbyid={roomID}
            min="5"
            max="7"
          />
          <CreateSetting
            label="Life:"
            id="life"
            settingsState={settingsState}
            setSettingsState={setSettingsState}
            lobbyid={roomID}
            min="1"
            max="5"
          />
          <CreateSetting
            label="Lobby Size:"
            id="lobbySize"
            settingsState={settingsState}
            setSettingsState={setSettingsState}
            lobbyid={roomID}
            min="2"
            max="30"
          />
        </div>
      </form>
    </div>
  );
}

function CreateSetting({ label, id, settingsState, setSettingsState, lobbyid, min, max }) {
  let value = settingsState[getValue(id)]; 
  return (
    <div>
      <label htmlFor={id}> {label} <span className="text-danger">{checkValue(value, min, max)}</span></label>
      <input
        type="number"
        className="form-control"
        id={id}
        min={min}
        max={max}
        value={settingsState[getValue(id)]}
        onChange={(e) => { 
          setSettingsState(ReturnSettingObject(e.target.value, settingsState, id));
          socket.emit("changeSettings", setSendObj(e.target.value, id, lobbyid));
        }}
      ></input>
    </div>
  );
}

function ReturnSettingObject(value, settingsState, key) {
  switch (key) {
  case "deckSize":
    return {
      ...settingsState,
      cardCount: value
    };
  case "handSize":
    return {
      ...settingsState,
      handSize: value
    };
  case "life":
    return {
      ...settingsState,
      maxLife: value
    };
  case "lobbySize":
    return {
      ...settingsState,
      lobbySize: value
    };
  }
}

function getValue(key) {
  switch (key) {
  case "deckSize": 
    return "cardCount";
  case "handSize":
    return "handSize"; 
  case "life": 
    return "maxLife";
  case "lobbySize": 
    return "lobbySize";
  }
}

function setSendObj(value, key, roomID) {
  const obj = {
    "key": key,
    [key]: value,
    "id": roomID
  }
  console.log(obj); 
  return obj; 
}


function checkValue(value, min, max) {
  if (value > Number(max)) {
    return "Setting is set too large";
  } else if (value < Number(min)) {
    return "Setting is set too small";
  } else {
    return ""; 
  }
}
/*
"deckSize": 15, 
"handSize" : 5,
"life": 3,
"lobbySize": 2 
*/