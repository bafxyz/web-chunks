import { WebpackOptions } from 'webpack/declarations/WebpackOptions'

export enum EMode {
    CLIENT = 'client',
    SERVER = 'server'
}

export enum EEnv {
    PRODUCTION = 'production',
    DEVELOPMENT = 'development'
}

export interface IProps {
    mode: EMode
    env: EEnv
    options: WebpackOptions
}
