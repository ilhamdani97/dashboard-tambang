import { API, axiosRequest } from "../../utils/api";
import { PropsParams } from "./type";

export const getDataMining = async (params: PropsParams) => {
    const response = await axiosRequest({
        method: 'GET',
        url: API.getDataGalian,
        params
    });

    return response?.data || null;
}   