// Dùng để track loader
let activeRequests = 0;

const listeners = new Set<() => void>();

function notify() {
    listeners.forEach((listener) => listener());
}

export const loadingTracker = {
    subscribe(listener: () => void) {
        listeners.add(listener);

        return () => {
            listeners.delete(listener);
        };
    },

    getSnapshot() {
        return activeRequests > 0;
    },

    start() {
        activeRequests++;
        notify();
    },

    finish() {
        activeRequests = Math.max(0, activeRequests - 1);
        notify();
    },
};