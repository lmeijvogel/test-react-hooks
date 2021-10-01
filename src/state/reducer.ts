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
                phase: "prepare",
                count: 4
            };
        case "tick":
            return reduceTick(state);
        default:
            assertNever(action);
    }
};

function reduceTick(state: ApplicationState): ApplicationState {
    if (state.phase === "stopped") {
        // TODO: This is an error
        return state;
    }

    if (state.phase === "prepare" && state.count <= 1) {
        return {
            ...state,
            phase: "running",
            currentStepIndex: 0,
            count: state.steps[0].initialCount
        };
    }
    if (state.phase === "running") {
        if (state.count <= 1) {
            if (state.currentStepIndex >= state.steps.length - 1) {
                return initialState;
            }

            const nextStepIndex = state.currentStepIndex + 1;
            const nextStep = state.steps[nextStepIndex];

            return {
                ...state,
                currentStepIndex: nextStepIndex,
                count: nextStep.initialCount
            };
        }

        return {
            ...state,
            count: state.count - 1
        };
    }

    return {
        ...state,
        count: state.count - 1
    };
}

function assertNever(x: never): never {
    return x;
}
