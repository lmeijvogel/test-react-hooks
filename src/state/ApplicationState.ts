export type Action = "start" | "stop" | "timerFinished";

export type ExercisePhase = "stopped" | "prepare" | "running";

export type ApplicationState =
    | {
          steps: ExerciseStep[];
          phase: "stopped";
      }
    | RunningApplicationState;

export type RunningApplicationState = {
    steps: ExerciseStep[];
    phase: "running";
    currentStepIndex: number;
    currentStep: ExerciseStep;
};

export type ExerciseStep = {
    phase: "prepare" | "exercise" | "break";
    initialCount: number;
};

export const initialState: ApplicationState = { steps: buildExerciseSteps(), phase: "stopped" };

function buildExerciseSteps(): ExerciseStep[] {
    const exerciseStep: ExerciseStep = { phase: "exercise", initialCount: 2 };
    const breakStep: ExerciseStep = { phase: "break", initialCount: 1 };

    const result: ExerciseStep[] = [{ phase: "prepare", initialCount: 3 }];

    const numberOfExercises = 2;
    for (let i = 0; i < numberOfExercises - 1; i++) {
        result.push(exerciseStep);
        result.push(breakStep);
    }
    result.push(exerciseStep);

    return result;
}
