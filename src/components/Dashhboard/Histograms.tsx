import { Tabs } from 'antd'
import Chart from 'react-apexcharts'
import moment from 'moment'
import { ApexOptions } from 'apexcharts'
import { HistoTypes } from './interfaces'

const { TabPane } = Tabs

type HistogramsProps = {
  data: HistoTypes
}
const Histograms = ({ data }: HistogramsProps) => {
  const formatDate = (date: string) => moment(date, 'DD-MM-YYYY').format('MMM DD, YYYY')

  const chartOptions:ApexOptions = {
    chart: {
      type: 'line',
      height: 350,
      zoom: {
        enabled: false,
      },
    },
    xaxis: {
      type: 'datetime',
      categories: data.time_margin_perc.data.map((entry) => formatDate(entry.date)),
      labels: {
        datetimeFormatter: {
          year: 'yyyy',
          month: "MMM 'yy",
          day: 'dd MMM',
          hour: 'HH:mm',
        },
      },
    },
    yaxis: {
      labels: {
        formatter: function (value) {
          return value.toFixed(2) // Format y-axis labels as needed
        },
      },
    },
    dataLabels: {
      enabled: false,
    },
    stroke: {
      curve: 'smooth',
    },
  }

  // Series data for charts
  const seriesMarginPerc = [
    {
      name: 'Margin Percentage',
      type: 'line',
      data: data.time_margin_perc.data.map((entry) => entry.margin_perc),
    },
  ]

  const seriesOrderCount = [
    {
      name: 'Order Count',
      type: 'column',
      data: data.time_order_count.data.map((entry) => entry.order_count),
    },
  ]

  const seriesRevenueMarginAbs = [
    {
      name: 'Revenue',
      type: 'area',
      data: data.time_revenue.data.map((entry) => entry.revenue),
    },
    {
      name: 'Margin Absolute',
      type: 'area',
      data: data.time_revenue.data.map((entry) => entry.margin_abs),
    },
  ]

 
  return (
    <div className="flex justify-center items-center w-full bg-[#fcfcfc] p-[10px] rounded-[21px]">
      <div id="chart" className="flex justify-center items-center w-full flex-col">
        <Tabs defaultActiveKey="1" className="w-full">
          <TabPane tab="Order Count" key="1">
            <Chart options={chartOptions} series={seriesOrderCount} type="area" height={250} />
            
          </TabPane>
          <TabPane tab="Margin Percentage" key="2">
            <Chart options={chartOptions} series={seriesMarginPerc} type="line" height={250} />
           
          </TabPane>

          <TabPane tab="Revenue & Margin Absolute" key="3">
            <Chart options={chartOptions} series={seriesRevenueMarginAbs} type="line" height={250} />
            
          </TabPane>
        </Tabs>
      </div>
    </div>
  )
}

export default Histograms
