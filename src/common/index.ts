import { DefinePlugin } from 'webpack'
import merge from 'webpack-merge'

import configProd from './production'
import configDev from './development'

import { IProps, EEnv } from '../types'

export default (props: IProps) => {
    const { env = EEnv.DEVELOPMENT } = props

    return merge(env === EEnv.PRODUCTION ? configProd(props) : configDev(props), {
        plugins: [
            new DefinePlugin({
                NODE_ENV: JSON.stringify(env === EEnv.PRODUCTION ? EEnv.PRODUCTION : EEnv.DEVELOPMENT)
            })
        ]
    })
}
