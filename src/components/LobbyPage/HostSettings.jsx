import { socket } from "../../socket";
import { useState, useEffect } from "react";
export { HostSettings } 

function HostSettings({ lobbyState }) {
    //Setting states:
    const [settingsState, setSettingsState] = useState({
        deckSize: lobbyState.deckSize,
        handSize: lobbyState.handSize,
        life: lobbyState.life,
        lobbySize: lobbyState.lobbySize,
    });
    console.log(settingsState);
    //Event handler
    useEffect(() => {
        socket.on("cantChangeSettings", (data) => {
            const setting = data.key; 
            setSettingsState(ReturnSettingObject(data[setting], setting, settingsState));
            console.log(settingsState);
        });
        socket.on("changeSetting", (data) => {
            const setting = data.key; 
            setSettingsState(ReturnSettingObject(data[setting], setting, settingsState));
            console.log("Accepted", settingsState);
        });

        return () => {
            socket.off("cantChangeSettings"); 
            socket.off("changeSetting");
        };
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
                        min="5"
                    />
                    <CreateSetting 
                        label="Hand Size:"
                        id="handSize"
                        settingsState={settingsState}
                        setSettingsState={setSettingsState}
                        min="3"
                        max="15"
                    />
                    <CreateSetting
                        label="Life:"
                        id="life"
                        settingsState={settingsState}
                        setSettingsState={setSettingsState}
                        min="1"
                        max="10"
                    />
                    <CreateSetting
                        label="Lobby Size:"
                        id="lobbySize"
                        settingsState={settingsState}
                        setSettingsState={setSettingsState}
                        min="2"
                        max="30"
                    />
                </div>
            </form>
        </div>
    );
}

function CreateSetting({ label, id, settingsState, setSettingsState, min, max }) {
    let value = settingsState[id]; 
    return (
        <div>
            <label htmlFor={id}> {label} <span className="text-danger">{checkValue(value, min, max)}</span></label>
            <input
                type="number"
                className="form-control"
                id={id}
                min={min}
                max={max}
                value={settingsState[id]}
                onChange={(e) => { 
                    setSettingsState(ReturnSettingObject(e.target.value, id, settingsState));
                    socket.emit("changeSettings", setSendObj(e.target.value, id));
                }}
            ></input>
        </div>
    );
}

function setSendObj(value, key) {
    const obj = {
        "key": key,
        [key]: value,
    }
    console.log(obj); 
    return obj; 
}

function ReturnSettingObject(value, setting, settingsState) {
    return {
        ...settingsState, 
        [setting]: value
    }; 
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