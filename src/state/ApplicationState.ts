export type Action = "start" | "stop" | "tick";

export type ExercisePhase = "stopped" | "prepare" | "running";

export type ApplicationState = {
    steps: ExerciseStep[];
} & (
    | {
          phase: "stopped";
      }
    | {
          phase: "prepare";
          count: number;
      }
    | RunningPhase
);

export type RunningPhase = {
    phase: "running";
    currentStepIndex: number;
    count: number;
};

export type ExerciseStep = {
    phase: "exercise" | "break";
    initialCount: number;
};

export const initialState: ApplicationState = { steps: buildExerciseSteps(), phase: "stopped" };

function buildExerciseSteps(): ExerciseStep[] {
    return [
        { phase: "exercise", initialCount: 3 },
        { phase: "break", initialCount: 5 },
        { phase: "exercise", initialCount: 3 }
    ];
}
