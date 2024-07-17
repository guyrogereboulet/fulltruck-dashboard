import { Row, Col } from 'antd'
import { ScalarsTypes } from './interfaces'


type scalarsProps = {
  data: ScalarsTypes
}
const Scalars = ({ data }: scalarsProps) => {
  // console.log('Scalars', data)
  const {
    active_carriers,
    active_clients,
    average_margin_perc,
    avg_order_margin_abs,
    avg_order_revenue,
    new_carriers,
    new_clients,
    total_assigned_count,
    total_margin_abs,
    total_order_count,
    total_revenue,
  } = data

  const cardData = [
    { title: 'Active Carriers', value: active_carriers, bg: '#f28705' },
    { title: 'Active Clients', value: active_clients, bg: '#d363ff' },
    { title: 'New Carriers', value: new_carriers, bg: '#0755ba' },
    { title: 'New Clients', value: new_clients, bg: '#005c53' },
    { title: 'Total Assigned Count', value: total_assigned_count, bg: '#29cc39' },
    { title: 'Total Order Count', value: total_order_count, bg: '#cc7429' },
    { title: 'Total Revenue', value: `$${total_revenue.toLocaleString()}`, bg: '#15b1cc' },
    { title: 'Total Margin Abs', value: `$${total_margin_abs.toLocaleString()}`, bg: '#b32828' },
    { title: 'Avg Margin %', value: `${(average_margin_perc * 100).toFixed(2)}%`, bg: '#604265' },
    { title: 'Avg Order Margin Abs', value: `$${avg_order_margin_abs.toFixed(2)}`, bg: '#e62e7b' },
    { title: 'Avg Order Revenue', value: `$${avg_order_revenue.toFixed(2)}`, bg: '#e6b12d' },
  ]

  return (
    <div className="flex justify-center items-center max-h-[270x] overflow-y-auto px-3 pt-2 w-full">
      <Row className="flex justify-start forCards:justify-center items-center w-full" gutter={[20, 20]}>
        {cardData.map((card, index) => (
          <Col
            key={index}
            xs={12}
            sm={12}
            md={8}
            lg={4}
            xl={4}
            xxl={4}
            // style={{ marginTop:  '20px' }}
            className="max-w-[206px]"
          >
            <div
              className="flex justify- items-center w-full h-[120px] pt-1 px-[10px] rounded-[10px] flex-col "
              style={{
                backgroundColor: card?.bg,
                color: '#ffffff',
              }}
            >
              <div className={`text-center w-full font-[700] min-h-[50px] text-[14px]} pt-2`}>
                {card?.title}
              </div>

              <div className="flex justify-center items-center w-full gap-x-[15px]">
                <div>
                  <div
                    className={`flex justify-center items-center w-full max-w-[60px] hover:!text_color py-[5px] px-[15px] font-[700] bg-white rounded-[21px] cursor-pointer !border-none  text-[12px]`}
                    style={{ color: card?.bg }}
                  >
                    {card?.value}
                  </div>
                </div>
              </div>
            </div>
          </Col>
        ))}
      </Row>
    </div>
  )
}

export default Scalars
