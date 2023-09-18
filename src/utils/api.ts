import axios from "axios";


interface PropsRequest {
    url: string;
    method: 'GET' | 'POST' | 'PATCH' | 'PUT' | 'DELETE';
    payload?: any;
    params?: any;
}

const BASE_URL = 'https://data.jabarprov.go.id/api-backend/bigdata/disesdm/';

export const API = {
    getDataGalian : `${BASE_URL}od_18374_jml_prdks_bahan_galian_tambang__jenis_bahan_galian`
}

export const axiosRequest = async ({
    url,
    method,
    params,
}: PropsRequest) => {
    try {
        const response = await axios(
            {
                method,
                url,
                params
            }
        )

        return response;
    } catch (e: any) {
        window.alert('Error Data')
    }
}