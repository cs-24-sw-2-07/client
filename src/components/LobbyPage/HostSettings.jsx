import { socket } from "../../socket";
import { useState, useEffect } from "react";
export { HostSettings, ReturnSettingObject } //TODO: Move function into seperate file

//TODO: Currently you cannot change the number --> maybe because the setting has been implemented? 

function HostSettings({ lobbyState, roomID }) {
  //Setting states:
  const [settingsState, setSettingsState] = useState({
    cardCount: lobbyState.deckSize,
    handSize: lobbyState.handSize,
    maxLife: lobbyState.life,
    lobbySize: lobbyState.lobbySize,
  });

  //Event handler
  useEffect(() => {
    socket.on("cantChangeSettings", (data) => {
      alert("Setting is not allowed. Reverting change");
      const setting = data.key; 
      setSettingsState(ReturnSettingObject(data[setting], settingsState, setting));
    });

    return () => {
      socket.off("cantChangeSettings"); 
    };
  }, []);
  
  //Timer and object for onChange event
  const [eventObject, setEventObject] = useState({});
  useEffect(() => {
    const timer = setTimeout(() => {
      socket.emit("changeSettings", eventObject);
    }, 3000);

    return () => clearTimeout(timer); 
  }, [eventObject]);

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
            setEventObject={setEventObject}
          />
          <CreateSetting
            label="Hand Size:"
            id="handSize"
            settingsState={settingsState}
            setSettingsState={setSettingsState}
            lobbyid={roomID}
            setEventObject={setEventObject}
          />
          <CreateSetting
            label="Life:"
            id="life"
            settingsState={settingsState}
            setSettingsState={setSettingsState}
            lobbyid={roomID}
            setEventObject={setEventObject}
          />
          <CreateSetting
            label="Lobby Size:"
            id="lobbySize"
            settingsState={settingsState}
            setSettingsState={setSettingsState}
            lobbyid={roomID}
            setEventObject={setEventObject}
          />
        </div>
      </form>
    </div>
  );
}

function CreateSetting({ label, id, settingsState, setSettingsState, lobbyid, setEventObject }) {
  return (
    <div>
      <label htmlFor={id}>{label}</label>
      <input
        type="number"
        className="form-control"
        id={id}
        value={settingsState[getValue(id)]}
        onChange={(e) => { 
          setSettingsState(ReturnSettingObject(e.target.value, settingsState, id));
          setEventObject(setSendObj(e.target.value, id, lobbyid));
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

function setSendObj(event, key, roomID) {
  const obj = {
    "key": key,
    [key]: event.target.value,
    "id": roomID
  }
  console.log(obj); 
  return obj; 
}

/*
"deckSize": 15, 
"handSize" : 5,
"life": 3,
"lobbySize": 2 
*/