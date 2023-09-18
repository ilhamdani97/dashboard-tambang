import { GetMiningData } from "../../services/mining/type";

interface AppReducerState {
    dataMining: GetMiningData[],
}
export type AppReducerAction = 
| { type: 'SET_DATA_MINING' ; dataMining: GetMiningData[] }

const defaultState = {
    dataMining: [],
} as AppReducerState;

export default function dashboardReducer(
    state = defaultState,
    action: AppReducerAction
) {
    switch (action.type) {
        case 'SET_DATA_MINING':
            return {
                ...state,
                dataMining: action.dataMining
            }
        default:
            return state;
    }
}