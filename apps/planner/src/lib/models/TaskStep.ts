export interface TaskStep {
    type: "NONE" | "EARLY" | "LATE" | "EXPECTED";
    weeks: number;
}