import logo from "./logo.svg";
import "./App.css";
import { FC, useEffect, useReducer, useRef } from "react";
import { reducer } from "./state/reducer";
import { ApplicationState, initialState, RunningApplicationState } from "./state/ApplicationState";
import { useTimer } from "./useTimer";

function App() {
    const [state, dispatch] = useReducer(reducer, initialState);

    const { time, timerRunning, start, stop } = useTimer(() => {
        dispatch("timerFinished");
    });

    const previousStepRef = useRef<number | null>(null);

    useEffect(() => {
        previousStepRef.current = state.phase === "running" ? state.currentStepIndex : null;
    }, [state.phase]);

    useEffect(() => {
        if (state.phase === "running") {
            if (state.currentStepIndex !== previousStepRef.current) {
                start(state.currentStep.initialCount);

                previousStepRef.current = state.currentStepIndex;
            }
        }

        if (state.phase === "stopped") {
            stop();
        }
    }, [state, start]);

    const startTimer = () => {
        dispatch("start");

        const firstStep = state.steps[0];

        start(firstStep.initialCount);
    };

    return (
        <div className="App">
            <header className="App-header">
                <StatusDisplay state={state} />
                <RunCounter timerRunning={timerRunning} time={time} />
                <ActionButton timerRunning={timerRunning} start={startTimer} stop={stop} />
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
        case "running":
            return getLabelForCurrentStep(state);
    }
}

function getLabelForCurrentStep(state: RunningApplicationState): string {
    switch (state.currentStep.phase) {
        case "prepare":
            return "Get ready!";
        case "break":
            return "Rest";
        case "exercise":
            return `Go! (${Math.floor(state.currentStepIndex / 2) + 1}/${Math.floor(state.steps.length / 2)})`;
    }
}

const RunCounter: FC<{ time: number; timerRunning: boolean }> = ({ time, timerRunning }) => {
    if (timerRunning) {
        return <p>{time}</p>;
    } else {
        return <p>-</p>;
    }
};

const ActionButton: FC<{ timerRunning: boolean; start: () => void; stop: () => void }> = ({
    timerRunning,
    start,
    stop
}) => {
    if (timerRunning) {
        return <button onClick={stop}>Stop</button>;
    } else {
        return <button onClick={start}>Start</button>;
    }
};

export default App;
