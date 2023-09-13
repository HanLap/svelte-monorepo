
declare global {
    interface Document {
        startViewTransition: (callback: () => Promise<any>) => Promise<any>;
    }
}

export {}