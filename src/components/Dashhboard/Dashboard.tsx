import { useEffect, useState, useMemo } from 'react'
import { Col, DatePicker, Row, Select, Spin } from 'antd'
import useStatistics from '../../hook/useStatistics'
import TableComponent from './Table'
import Histograms from './Histograms'
import Kpis from './Kpis'
import Scalars from './Scalars'
import 'antd/dist/reset.css' // Import Ant Design styles
// import dayjs from 'dayjs';
import dayjs, { Dayjs } from 'dayjs' // Import Dayjs and its type

import { dataTypes } from './interfaces'
const { RangePicker } = DatePicker
const { Option } = Select

// type resultProps = {
//   result: dataTypes
// }
const Dashboard = () => {
  const { fetchStatistics } = useStatistics()
  const [loading, setLoading] = useState<boolean>(true)
  const [data, setData] = useState<dataTypes | null>(null)
  const [startDate, setStartDate] = useState<Dayjs | null>(dayjs('2024-04-01'))
  const [endDate, setEndDate] = useState<Dayjs | null>(dayjs('2024-12-31'))
  const [timeTarget, setTimeTarget] = useState<'pickup_date' | 'created_at'>('pickup_date')
  const [aggregateBy, setAggregateBy] = useState<'day' | 'week' | 'month'>('day')

  const props = useMemo(
    () => ({
      aggregateBy: aggregateBy,
      timeTarget: timeTarget,
      startDate: startDate?.format('YYYY-MM-DD') || null,
      endDate: endDate?.format('YYYY-MM-DD') || null,
    }),
    // eslint-disable-next-line react-hooks/exhaustive-deps
    [startDate, endDate, timeTarget, aggregateBy]
  )
  const [windowWidth, setWindowWidth] = useState<number>(window.innerWidth)

  useEffect(() => {
    const handleResize = () => {
      setWindowWidth(window.innerWidth)
    }

    // Add event listener to update width when window is resized
    window.addEventListener('resize', handleResize)

    // Clean up event listener on component unmount
    return () => window.removeEventListener('resize', handleResize)
  }, []) // Empty dependency array means this effect runs only once
  useEffect(() => {
    const fetchData = async () => {
      setLoading(true)
      try {
        const result: unknown = await fetchStatistics(props)
        // console.log('Fetched Data:', result) // Debug log
        const typedResult = result as dataTypes

        setData(typedResult)
      } catch (error) {
        console.error('Error fetching statistics:', error)
      }
      setLoading(false)
    }

    fetchData()
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [props])
  const handleDateChange = (
    dates: [Dayjs | null, Dayjs | null] | null,
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    _: [string, string]
  ) => {
    if (dates && dates.length === 2) {
      setStartDate(dates[0] ? dates[0].clone() : null)
      setEndDate(dates[1] ? dates[1].clone() : null)
    }
  }
  const handleTargetChange = (value: 'pickup_date' | 'created_at') => {
    setTimeTarget(value)
  }
  const handleAggregateChange = (value: 'day' | 'week' | 'month') => {
    setAggregateBy(value)
  }
  return (
    <div className="">
      {loading ? (
        <Spin className="w-full h-[100vh] flex justify-center items-center" />
      ) : (
        <>
          <div className="forCards:justify-center mobile:bg-[#FFFFFF80] flex mobile:flex-col gap-3 px-5 fixed w-full max-w-[2400px] z-20">
            <RangePicker
              value={[startDate, endDate]}
              allowClear={false}
              format="DD-MM-YYYY"
              style={{
                // width: '100%',
                // height: 38,
                border: 'none',
                background: '#f94034',
                color: 'white',
              }}
              onChange={handleDateChange}
              suffixIcon={false}
            />
            <Select
              value={timeTarget}
              onChange={handleTargetChange}
              style={{
                // width: '100%',
                // height: 38,
                border: 'none',
                background: '#f94034',
                borderRadius: '6px',
              }}
            >
              <Option value="pickup_date">Pickup Date</Option>
              <Option value="create_at">Create Date</Option>
            </Select>
            <Select
              value={aggregateBy}
              onChange={handleAggregateChange}
              style={{
                // width: '100%',
                // height: 38,
                border: 'none',
                background: '#f94034',
                borderRadius: '6px',
              }}
            >
              <Option value="day">Day</Option>
              <Option value="week">Week</Option>
              <Option value="month">Month</Option>
            </Select>
          </div>
          <div className="w-full max-w-[2400px] pt-12 mobile:pt-[125px]">
            {data?.scalars && <Scalars data={data?.scalars} />}
          </div>
          <Row
            gutter={windowWidth > 990 ? [20, 20] : [0, 20]}
            className="flex justify-center items-center w-full max-w-[2400px] py-[30px] px-5"
          >
            <Col
              xs={24}
              sm={24}
              md={24}
              lg={12}
              xl={12}
              xxl={12}
              className="flex justify-center items-center w-full "
            >
              {data?.histograms && <Histograms data={data?.histograms} />}
            </Col>
            <Col
              xs={24}
              sm={24}
              md={24}
              lg={12}
              xl={12}
              xxl={12}
              className="flex justify-center items-center  w-full "
            >
              {data?.data_table && <TableComponent data={data?.data_table} />}
            </Col>
          </Row>
          <div className="w-full px-5 max-w-[2400px] ">{data?.kpis && <Kpis data={data?.kpis} />}</div>
        </>
      )}
    </div>
  )
}

export default Dashboard
