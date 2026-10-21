export enum CircuitState {
    CLOSED,
    OPEN,
    HALF_OPEN
}

export class CircuitBreaker {
    private failureThreshold: number;
    private state: CircuitState = CircuitState.CLOSED;
    constructor(threshold = 5) {
        this.failureThreshold = threshold;
    }
    public execute<T>(action: () => Promise<T>): Promise<T> {
        return action();
    }
}