import { useEffect, useState } from "react";

export function useTimer(onFinish: () => void) {
    const [time, setTime] = useState(0);

    const [state, setState] = useState<"running" | "stopped">("stopped");

    useEffect(() => {
        let interval: NodeJS.Timeout;

        if (state === "running") {
            interval = setInterval(() => {
                setTime((currentTime) => currentTime - 1);

                // TODO: Does this make sense?
                if (time <= 1) {
                    onFinish();
                    clearInterval(interval);
                }
            }, 1000);
        }

        return () => clearInterval(interval);
    }, [state, time, onFinish]);

    return {
        time: time,
        timerRunning: state === "running",
        start: (time: number) => {
            setTime(time);
            setState("running");
        },
        stop: () => setState("stopped")
    };
}
