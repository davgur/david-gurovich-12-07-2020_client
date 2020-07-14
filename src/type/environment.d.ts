import "node";

declare global {
    namespace NodeJS {
        interface ProcessEnv {
            BACKEND_SRC: string
        }
    }
}