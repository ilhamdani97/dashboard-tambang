export interface PropsParams {
    limit: number;
    search?: string;
}

export interface GetMiningRes {
    message: string;
    error: number;
    data: GetMiningData[]
}

export interface GetMiningData {
    id: number;
    kode_provinsi: number;
    nama_provinsi: string;
    jenis_bahan_galian: string;
    jumlah_produksi: 20577780.27;
    satuan: string;
    tahun: number;
}