import { Table, Card, } from 'antd'
import {  kpisCarrierTypes, KpisclientTypes, KpisTypes } from './interfaces';
import { ColumnType } from 'antd/es/table';

type KpisProps = {
  data: KpisTypes;
};
const Kpis = ({ data }:KpisProps) => {
  // Destructure data object
  const { carrier, client } = data

  // Function to format percentage
  const formatPercentage = (value:number) => {
    if (typeof value === 'number') {
      return `${(value * 100).toFixed(2)}%`
    }
    return value // handle non-numeric values if necessary
  }

  // Prepare data for Ant Design Table
  const prepareDataSource = (dataSource:kpisCarrierTypes|KpisclientTypes) => {
    return Object.keys(dataSource).map((key) => ({
      key,
      label: dataSource[key].label,
      marginAbs: dataSource[key].margin_abs,
      marginPerc: formatPercentage(dataSource[key].margin_perc),
      orderCount: dataSource[key].order_count,
      revenue: dataSource[key].revenue,
    }))
  }

  const carrierDataSource = prepareDataSource(carrier)
  const clientDataSource = prepareDataSource(client)

  // Columns for Ant Design Table
  const columns: ColumnType<{
    key: string;
    label: string;
    marginAbs: number;
    marginPerc: string;
    orderCount: number;
    revenue: number;
  }>[]  = [
    {
      title: 'Label',
      dataIndex: 'label',
      key: 'label',
      fixed: 'left',
    },
    {
      title: 'Margin Abs',
      dataIndex: 'marginAbs',
      key: 'marginAbs',
    },
    {
      title: 'Margin %',
      dataIndex: 'marginPerc',
      key: 'marginPerc',
    },
    {
      title: 'Order Count',
      dataIndex: 'orderCount',
      key: 'orderCount',
    },
    {
      title: 'Revenue',
      dataIndex: 'revenue',
      key: 'revenue',
    },
  ]

  return (
    <div>
      <Card title="Carrier Data" style={{ marginBottom: '20px' }}>
        <Table dataSource={carrierDataSource} columns={columns} pagination={{ pageSize: 10 }}  scroll={{
            x: 'calc(300px + 50%)',
            
          }}
          style={{ width: '100%' }}
          sticky/>
      </Card>
      <Card title="Client Data" style={{ marginBottom: '20px' }}>
        <Table dataSource={clientDataSource} columns={columns} pagination={{ pageSize: 10 }}  scroll={{
            x: 'calc(300px + 50%)',
            
          }}
          style={{ width: '100%' }}
          sticky/>
      </Card>
    </div>
  )
}

export default Kpis
