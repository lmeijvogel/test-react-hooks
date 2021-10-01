import logo from "./logo.svg";
import "./App.css";
import { FC, useEffect, useReducer } from "react";
import { reducer } from "./state/reducer";
import { Action, ApplicationState, initialState } from "./state/ApplicationState";

function App() {
    const [state, dispatch] = useReducer(reducer, initialState);

    useEffect(() => {
        const interval = setInterval(() => {
            dispatch("tick");
        }, 1000);

        return () => clearInterval(interval);
    }, [state.phase]);

    return (
        <div className="App">
            <header className="App-header">
                <StatusDisplay state={state} />
                <RunCounter state={state} />
                <ActionButton state={state} dispatch={(action: Action) => dispatch(action)} />
                <img src={logo} className="App-logo" alt="logo" />
            </header>
        </div>
    );
}

const StatusDisplay: FC<{ state: ApplicationState }> = ({ state }) => {
    return <h1>{getLabel(state)}</h1>;
};

function getLabel(state: ApplicationState): string {
    switch (state.phase) {
        case "stopped":
            return "Stopped";
        case "prepare":
            return "Get ready!";
        case "running":
            return getLabelForCurrentStep(state);
    }
}

function getLabelForCurrentStep(state: ApplicationState): string {
    if (state.phase !== "running") {
        throw new Error("Unexpected state!");
    }

    const currentStep = state.steps[state.currentStepIndex];

    switch (currentStep.phase) {
        case "break":
            return "Rest";
        case "exercise":
            return "Go!";
    }
}

const RunCounter: FC<{ state: ApplicationState }> = ({ state }) => {
    switch (state.phase) {
        case "stopped":
            return <p>-</p>;
        case "prepare":
            return <p>{state.count}</p>;
        case "running":
            return <p>{state.count}</p>;
    }
};

const ActionButton: FC<{ state: ApplicationState; dispatch: (action: Action) => void }> = ({ state, dispatch }) => {
    switch (state.phase) {
        case "stopped":
            return <button onClick={() => dispatch("start")}>Start</button>;
        default:
            return <button onClick={() => dispatch("stop")}>Stop</button>;
    }
};

export default App;
