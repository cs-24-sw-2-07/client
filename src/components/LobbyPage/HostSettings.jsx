import { socket } from "../../socket";
import { useState, useEffect } from "react";

export function HostSettings({ lobbyState }) {
    //Setting states:
    const [settingsState, setSettingsState] = useState({
        deckSize: lobbyState.deckSize,
        handSize: lobbyState.handSize,
        life: lobbyState.life,
        lobbySize: lobbyState.lobbySize,
    });
    const [settingNotify, setSettingNotify] = useState({
        deckSize: "",
        handSize: "",
        life: "",
        lobbySize: ""
    });

    useEffect(() => {
        socket.on("changeSetting", (data) => {
            setSettingNotify(ReturnSettingObject(data.value, data.key, settingNotify));
        });
        return () => socket.off("changeSetting");
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
                        settingNotify={settingNotify.deckSize}
                    />
                    <CreateSetting 
                        label="Hand Size:"
                        id="handSize"
                        settingsState={settingsState}
                        setSettingsState={setSettingsState}
                        settingNotify={settingNotify.handSize}
                    />
                    <CreateSetting
                        label="Life:"
                        id="life"
                        settingsState={settingsState}
                        setSettingsState={setSettingsState}
                        settingNotify={settingNotify.life}
                    />
                    <CreateSetting
                        label="Lobby Size:"
                        id="lobbySize"
                        settingsState={settingsState}
                        setSettingsState={setSettingsState}
                        settingNotify={settingNotify.lobbySize}
                    />
                </div>
            </form>
        </div>
    );
}

function CreateSetting({ label, id, settingsState, setSettingsState, settingNotify }) {
    return (
        <div>
            <label htmlFor={id}> {label} <span className="text-danger">{settingNotify}</span></label>
            <input
                type="number"
                className="form-control"
                id={id}
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
    return obj; 
}

function ReturnSettingObject(value, setting, settingsState) {
    return {
        ...settingsState, 
        [setting]: value
    }; 
}

/*function checkValue(value, min, max) {
    if (value > Number(max)) {
        return "Setting is set too large";
    } else if (value < Number(min)) {
        return "Setting is set too small";
    } else {
        return ""; 
    }
}*/