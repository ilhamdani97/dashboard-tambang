import { GetMiningData } from "../../services/mining/type"

export const setStoreDataMining = (dataMining: GetMiningData[]) => {
    return {
        type: 'SET_DATA_MINING',
        dataMining
    }
}