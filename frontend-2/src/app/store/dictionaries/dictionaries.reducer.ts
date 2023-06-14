import { Dictionaries } from "./dictionaries.models";
import * as fromActions from './dictionaries.actions';


// stores data and current state of the data
export interface DictionaryState {
    entities: Dictionaries;
    loading: boolean;
    error: string
}

const initialState: DictionaryState = {
    entities: null,
    loading: null,
    error: null
}

export function reducer(state = initialState, action: fromActions.All): DictionaryState {

    switch (action.type) {
        case fromActions.Types.READ:
            return { ...state, loading: true, error: null }
        case fromActions.Types.READ_SUCCESS:
            return { ...state, loading: false, error: null, entities: (action as fromActions.ReadSuccess).dictionaries }
        case fromActions.Types.READ_ERROR:
            return { ...state, loading: false, error: (action as fromActions.ReadError).error, entities: null }
        default: {
            return state;
        }
    }

}