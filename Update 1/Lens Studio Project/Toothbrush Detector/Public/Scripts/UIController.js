// -----JS CODE-----
// UIController.js
// Version: 0.0.1
// Event: Initialized
// Description: This script controls loader and hint ui elements depending on MLComponent state

//@input Component.MLComponent mlComponent
//@input SceneObject loader
//@input SceneObject hint

var turnOnEvent = script.createEvent("TurnOnEvent");
turnOnEvent.bind(onTurnOn);

var updateEvent = script.createEvent("UpdateEvent");
updateEvent.bind(onUpdate);

if (!script.mlComponent) {
    debugPrint("Error, ML Component is not set");
} else {
    script.mlComponent.onLoadingFinished = onLoadingFinished;
}


function onTurnOn() {
    if (script.loader) {
        script.loader.enabled = true;
    } else {
        debugPrint("Warning, loader is not set");
    }

    if (script.hint) {
        script.hint.enabled = false;
    } else {
        debugPrint("Warning, hint is not set");
    }
}

function onLoadingFinished() {
    if (script.loader) {
        script.loader.enabled = false;
    }

    if (script.hint) {
        script.hint.enabled = true;
    }
}

function onUpdate() {
    if (global.scene.isRecording()) {
        if (script.loader) {
            script.loader.enabled = false;
        }

        if (script.hint) {
            script.hint.enabled = false;
        }
        updateEvent.enabled = false;
    }
}

function debugPrint(text) {
    print("UIController, " + text);
}