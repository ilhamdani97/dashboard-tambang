import { PencilIcon } from "@heroicons/react/24/solid";
import {
  ArrowDownTrayIcon,
  MagnifyingGlassIcon,
} from "@heroicons/react/24/outline";
import {
  Card,
  CardHeader,
  Typography,
  Button,
  CardBody,
  Chip,
  CardFooter,
  Avatar,
  IconButton,
  Tooltip,
  Input,
} from "@material-tailwind/react";
import { getDataMining } from "./services/mining/mining";
import React, { useEffect, useState } from "react";
import { GetMiningData, GetMiningRes } from "./services/mining/type";
import ReactApexChart from 'react-apexcharts';
import Pagination from "./components/Paggination";
import TableLoading from "./components/TableLoading";
 
const TABLE_HEAD = ["Kode Provinsi","Nama Provinsi", "Jenis Galian", "Jumlah Produksi", "Stuan", "Tahun"];
const chartOptions = {
  options: {
    chart: {
      height: 350,
      dropShadow: {
        enabled: true,
        color: '#000',
        top: 18,
        left: 7,
        blur: 10,
        opacity: 0.2
      },
      toolbar: {
        show: false
      }
    },
    dataLabels: {
      enabled: true,
    },
    title: {
      text: 'Galian Tambang'
    },
    grid: {
      borderColor: '#e7e7e7',
      row: {
        colors: ['#f3f3f3', 'transparent'], // takes an array which will be repeated on columns
        opacity: 0.5
      },
    },
    markers: {
      size: 1
    },
    xaxis: {
      title: {
        text: 'Jenis Galian'
      },
      categories: ['ANDESIT, ANDESIT BAT', 'BATU GAMPING', 'BETONIT', 'FELDSPAR', 'FOSFAT', 'MARMER', 'PASIR/PASANG', 'SIRTU', 'PASIR KUARSA/BATU UR', 'TANAH LIAT', 'LEMPUNG', 'PASIT/TANAH URUG', 'TRASS', 'ZEOLIT', 'BATU BULAT/KALI/AL', 'PASIR BESI', 'BATU 1/2 PERMATA', 'DACITE', 'EMAS', 'PERAK', 'MANGAN', 'GIPSUM', 'BIJI BESI'],
    },
    yaxis: {
      title: {
        text: 'Jumlah Produksi'
      }
    }
    
  },
  series: [
    {
      name: '2014',
      data: [300, 400, 350, 500, 490, 600, 700, 910, 125, 112,333,222,222,222,222,222,222,222,222,333,333,333,333],
    },
    {
      name: '2015',
      data: [30, 40, 35, 50, 49, 60, 70, 91, 125],
    },
    {
      name: '2016',
      data: [30, 40, 35, 50, 49, 60, 70, 91, 125],
    },
  ],
};

interface PropsSeries {
  name: string;
  data: Array<number>
}
export default function App() {
  const [dataMining, setDataMining] = useState<GetMiningData[] | null>(null);
  const [dataMiningAll, setDataMiningAll] = useState<GetMiningData[] | null>(null);
  const [dataSeries, setDataSeries] = useState<PropsSeries[] | null>(null);
  const [totalPage, setTotalPage] = useState<number>(1);
  const [currentPage, setCurrentPage] = useState<number>(1)
  const [onPage, setOnPage] = useState<number>(1);
  const [loading, setLoading] = useState<boolean>(true);
  const [valueSearch, setValueSearch] = useState<string>('');

  const getDatasMining = () => {
    setLoading(true);
    const params = {
      limit: 100, 
      search: valueSearch
    }
    getDataMining(params).then((data: GetMiningRes) => {
      setDataMiningAll(data.data);
      setDataMining(data.data.slice(0,10));
      const totalData =  (data.data.length / 10).toFixed(0);
      setTotalPage(parseInt(totalData))
      handleSetDataChart(data.data)
    }).finally(() => {  
      setLoading(false);
    })
  }


  const handleSetDataChart = (datas: GetMiningData[]) => {
    const yearStart = 2014;
    const yearEnd = 2016;
    const data14 : PropsSeries = {
      name: '2014',
      data: []
    };
    const data15 : PropsSeries = {
      name: '2015',
      data: []
    };
    const data16 : PropsSeries = {
      name: '2015',
      data: []
    };
    for (let i = yearStart; i <= yearEnd; i++) {
      const filtered = datas.filter((data) => data.tahun === i);
      if(i === 2014)
        filtered.map((data) => {
          data14.data.push(data.jumlah_produksi)
        })
      if(i === 2015)
        filtered.map((data) => {
          data15.data.push(data.jumlah_produksi)
        })
      if(i === 2016)
        filtered.map((data) => {
          data16.data.push(data.jumlah_produksi)
        })
    }

    setDataSeries([data14, data15, data16])
    
  }

  const handleChangePage = (page: number) => {
    setOnPage(page);
    setCurrentPage(page);
    const indexStart = page === 0 ? 0 : (page - 1) * 10;
    const indexEnd = page * 10;
    const dataNavigation = dataMiningAll?.slice(indexStart, indexEnd)
    setDataMining(dataNavigation?? [])
  }

  useEffect(() => {
    const delaySearch = setTimeout(() => {
      getDatasMining();
    }, 1000)

    return () => clearTimeout(delaySearch)
  },[valueSearch])
  
  useEffect(() => {
    getDatasMining();
  },[])
  return (
    <div className={'p-6'}>
      {dataSeries && (
        <ReactApexChart
          options={chartOptions.options}
          series={dataSeries}
          type={'line'}
          height={350}
        />
      )}
      
    <Card className="h-full w-full pt-8">
      <CardHeader floated={false} shadow={false} className="rounded-none">
        <div className="mb-4 flex flex-col justify-between gap-8 md:flex-row md:items-center">
          <div>
            <Typography variant="h5" color="blue-gray">
              {'Data Tambang'}
            </Typography>
          </div>
          <div className="flex w-full shrink-0 gap-2 md:w-max">
            <div className="w-full md:w-72">
              <Input
                onChange={(e) => setValueSearch(e.target.value)}
                label="Search"
                icon={<MagnifyingGlassIcon className="h-5 w-5" />} crossOrigin={undefined}              />
            </div>
          </div>
        </div>
      </CardHeader>
      <CardBody className="overflow-scroll px-0">
        <table className="w-full min-w-max table-auto text-left">
          <thead>
            <tr>
              {TABLE_HEAD.map((head) => (
                <th
                  key={head}
                  className="border-y border-blue-gray-100 bg-blue-gray-50/50 p-4"
                >
                  <Typography
                    variant="small"
                    color="blue-gray"
                    className="font-normal leading-none opacity-70"
                  >
                    {head}
                  </Typography>
                </th>
              ))}
            </tr>
          </thead>
          <tbody>
            {loading ? <TableLoading row={6}/> : (
              <>
                {dataMining && dataMining.map(({
                    id,
                    nama_provinsi,
                    kode_provinsi,
                    jenis_bahan_galian,
                    jumlah_produksi,
                    satuan,
                    tahun
                  },
                  index,
                ) => {
                  const classes = "p-4 border-b border-blue-gray-50";
  
                  return (
                    <tr key={id}>
                      <td className={'p-4 border-b border-blue-gray-50'}>
                        <div className="flex items-center gap-2">
                          <Typography
                            variant="small"
                            color="blue-gray"
                            className="font-bold"
                          >
                            {kode_provinsi}
                          </Typography>
                        </div>
                      </td>
                      <td className={'p-4 border-b border-blue-gray-50'}>
                        <div className="flex items-center gap-3">
                          <Typography
                            variant="small"
                            color="blue-gray"
                            className="font-bold"
                          >
                            {nama_provinsi}
                          </Typography>
                        </div>
                      </td>
                      <td className={classes}>
                        <Typography
                          variant="small"
                          color="blue-gray"
                          className="font-normal"
                        >
                          {jenis_bahan_galian}
                        </Typography>
                      </td>
                      <td className={classes}>
                        <Typography
                          variant="small"
                          color="blue-gray"
                          className="font-normal"
                        >
                          {jumlah_produksi}
                        </Typography>
                      </td>
                      <td className={classes}>
                        <Typography
                          variant="small"
                          color="blue-gray"
                          className="font-normal"
                        >
                          {satuan}
                        </Typography>
                      </td>
                      <td className={classes}>
                        <Typography
                          variant="small"
                          color="blue-gray"
                          className="font-normal"
                        >
                          {tahun}
                        </Typography>
                      </td>
                    </tr>
                  );
                },
              )}
              </>
            )}
            
          </tbody>
        </table>
      </CardBody>
      <CardFooter className="flex items-center justify-between border-t border-blue-gray-50 p-4">
      {dataMining && (
        <Pagination
          onChange={handleChangePage}
          total={totalPage}
          current={currentPage}
        />
      )}
      
      </CardFooter>
    </Card>
    </div>
  );
}