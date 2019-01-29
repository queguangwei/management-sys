import { GLOBAL_SET_CARD_BIND_DIALOG } from '../constants/ActionTypes'
import { Map } from 'immutable'

const initialState = Map({
    showCardBindDialog: false
})

export default function global(state = initialState, action) {
    switch (action.type) {
        case GLOBAL_SET_CARD_BIND_DIALOG:
            return state.set('showCardBindDialog', action.visible)
        default:
            return state
    }
}
