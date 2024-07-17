//KPIS TYPES
export type kpisCarrierTypes = {
  [key: string]: {
    label: string
    margin_abs: number
    margin_abs_per_order: number
    margin_abs_perc_on_tot: number
    margin_perc: number
    order_count: number
    order_count_perc_on_tot: number
    revenue: number
    revenue_per_order: number
    revenue_perc_on_tot: number
  }
}

export type KpisclientTypes = {
  [key: string]: {
    label: string
    margin_abs: number
    margin_abs_per_order: number
    margin_abs_perc_on_tot: number
    margin_perc: number
    order_count: number
    order_count_perc_on_tot: number
    revenue: number
    revenue_per_order: number
    revenue_perc_on_tot: number
  }
}

export type KpisTypes = {
  carrier: kpisCarrierTypes
  client: KpisclientTypes
}

//SCALARS TYPES

export type ScalarsTypes = {
  active_carriers: number
  active_clients: number
  average_margin_perc: number
  avg_order_margin_abs: number
  avg_order_revenue: number
  new_carriers: number
  new_clients: number
  total_assigned_count: number
  total_margin_abs: number
  total_order_count: number
  total_revenue: number
}

//HISTOGRAMS TYPES

export type MarginPercTypes = {
  date: string
  margin_perc: number
}

export type OrderCountTypes = {
  date: string
  order_count: number
}

export type RevenueTypes = {
  date: string
  margin_abs: number
  revenue: number
}

export type TimeTypes<T> = {
  data: T[]
  index_by: string
}

export type HistoTypes = {
  time_margin_perc: TimeTypes<MarginPercTypes>
  time_order_count: TimeTypes<OrderCountTypes>
  time_revenue: TimeTypes<RevenueTypes>
}

//TABLE DATA TYPES

export type TableDataTypes = {
  active_carrier: number
  active_client: number
  aggregate_date: string
  assigned_count: number
  margin_abs: number
  margin_abs_per_order: number
  margin_perc: number
  new_carriers: number
  new_clients: number
  order_count: number
  order_per_period: number
  revenue: number
  revenue_assigned: number
  revenue_per_order: number
}

//DATA types

export type dataTypes = {
  data_table: TableDataTypes[]
  histograms: HistoTypes
  kpis: KpisTypes
  scalars: ScalarsTypes
}
