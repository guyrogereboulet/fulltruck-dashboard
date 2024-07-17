import { Tabs } from 'antd'
import Chart from 'react-apexcharts'
import moment from 'moment'
import { ApexOptions } from 'apexcharts'
import { TableDataTypes } from './interfaces'
const { TabPane } = Tabs

type TableProps = {
  data: TableDataTypes[]
}
const TableComponent = ({ data }: TableProps) => {
  const chartData = {
    dates: data.map((item) => moment(item.aggregate_date).format('MMM DD')).reverse(),
    orderCounts: data.map((item) => item.order_count),
    revenues: data.map((item) => item.revenue),
    marginPercs: data.map((item) => (item.margin_perc * 100).toFixed(2)),
    // Add more series as needed
  }

  // ApexCharts options
  const marginPercsNumeric = chartData.marginPercs.map((perc) => parseFloat(perc.replace('%', '')))

  const options: ApexOptions = {
    chart: {
      type: 'area',
      height: 350,
      zoom: {
        enabled: false,
      },
    },
    xaxis: {
      categories: chartData.dates,
    },
    series: [
      {
        name: 'Order Count',
        data: chartData.orderCounts,
      },
      {
        name: 'Revenue',
        data: chartData.revenues,
      },
      {
        name: 'Margin %',
        data: marginPercsNumeric,
      },
      // Add more series as needed
    ],
    dataLabels: {
      enabled: false,
    },
    stroke: {
      curve: 'smooth',
    },

    markers: {
      size: 5,
    },
    grid: {
      row: {
        colors: ['#f3f3f3', 'transparent'],
        opacity: 0.5,
      },
    },
  }

  const clientChartData = {
    dates: data.map((item) => moment(item.aggregate_date).format('MMM DD')).reverse(),
    activeClients: data.map((item) => item.active_client).reverse(),
    newClients: data.map((item) => item.new_clients).reverse(),
    // Add more series as needed
  }

  // ApexCharts options
  const clientOptions: ApexOptions = {
    chart: {
      type: 'area',
      height: 350,
      zoom: {
        enabled: false,
      },
    },
    xaxis: {
      categories: clientChartData.dates,
    },
    series: [
      {
        name: 'Active Clients',
        data: clientChartData.activeClients,
      },
      {
        name: 'New Clients',
        data: clientChartData.newClients,
      },
      // Add more series as needed
    ],
    dataLabels: {
      enabled: false,
    },
    stroke: {
      curve: 'smooth',
    },

    markers: {
      size: 5,
    },
    grid: {
      row: {
        colors: ['#f3f3f3', 'transparent'],
        opacity: 0.5,
      },
    },
  }

  const transformedData = data.map((item) => ({
    x: moment(item.aggregate_date).format('MMM DD'),
    y: item.active_carrier,
  }))

  const transformedNewCarriersData = data.map((item) => ({
    x: moment(item.aggregate_date).format('MMM DD'),
    y: item.new_carriers,
  }))
  const carrierOptions: ApexOptions = {
    chart: {
      type: 'area',
      height: 350,
      zoom: {
        enabled: false,
      },
    },
    xaxis: {
      type: 'category',
      categories: data.map((item) => moment(item.aggregate_date).format('MMM DD, YYYY')),
    },
  }

  const carrierSeries = [
    {
      name: 'Active Carriers',
      data: transformedData,
    },
    {
      name: 'New Carriers',
      data: transformedNewCarriersData,
    },
  ]

  return (
    <div className="flex justify-center items-center w-full bg-[#fcfcfc] p-[10px] rounded-[21px]">
      <div id="chart" className="flex justify-center items-center w-full flex-col">
        <Tabs defaultActiveKey="1" className="w-full">
          <TabPane tab="Client Metrics" key="1">
            <Chart options={clientOptions} series={clientOptions.series} type="area" height={250} />
          </TabPane>
          <TabPane tab="Carrier Metrics" key="2">
            <Chart options={carrierOptions} series={carrierSeries} type="area" height={250} />
          </TabPane>
          <TabPane tab="Financial Metrics" key="3">
            <Chart options={options} series={options.series} type="area" height={250} />
          </TabPane>
        </Tabs>
      </div>
    </div>
  )
}

export default TableComponent
