import { Map, List } from 'immutable'
import {
    OPERATOR_LOAD_INFO,
} from '../constants/ActionTypes'

const initialState = Map({
    operator: Map({}),
    dashbord: Map({}),
    logined: true
})

export default function user(state = initialState, action) {
    switch (action.type) {
        case OPERATOR_LOAD_INFO:
            if(action.data)
                return state.set('operator', Map(action.data))
        default:
            return state
    }
}
