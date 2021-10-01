import { Action, ApplicationState, initialState } from "./ApplicationState";

export const reducer: (state: ApplicationState, action: Action) => ApplicationState = (
    state: ApplicationState,
    action: Action
) => {
    switch (action) {
        case "stop":
            return initialState;
        case "start":
            return {
                ...state,
                phase: "running",
                currentStepIndex: 0,
                currentStep: state.steps[0]
            };
        case "timerFinished":
            return onTimerFinished(state);
        default:
            assertNever(action);
    }
};

function onTimerFinished(state: ApplicationState): ApplicationState {
    if (state.phase === "stopped") {
        // TODO: This is an error
        return state;
    }

    if (state.phase === "running") {
        if (state.currentStepIndex >= state.steps.length - 1) {
            return initialState;
        }

        const nextStepIndex = state.currentStepIndex + 1;

        return {
            ...state,
            currentStepIndex: nextStepIndex,
            currentStep: state.steps[nextStepIndex]
        };
    }

    return assertNever(state);
}

function assertNever(x: never): never {
    return x;
}
