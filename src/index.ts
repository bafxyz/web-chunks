import merge from 'webpack-merge'

import common from './common'
import client from './client'
import server from './server'

import { IProps, EMode } from './types'

const config = (props: IProps) => {
    const { mode = EMode.CLIENT } = props

    return merge(common(props), mode === EMode.SERVER ? server(props) : client(props), props.options)
}

module.exports = config
