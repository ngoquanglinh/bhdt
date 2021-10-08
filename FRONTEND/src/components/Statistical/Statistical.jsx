import React, { Fragment } from 'react'
import { formatPriceVN } from '../../Helper/formatNumberHelper'
import CardOverview from '../CardOverview/CardOverview'

function Statistical(props) {
  return (
    <Fragment>
      <div className="row">
        <div className="col-12 col-xl-12 stretch-card">
          <div className="row flex-grow">
            <div className="col-md-3 grid-margin stretch-card pr-2">
              <CardOverview
                title="Doanh thu"
                bagde="badge badge-success"
                type="+"
                total={formatPriceVN(props.data.totalDiscount ?? 0)}
                ratio={50}
              />
            </div>
            <div className="col-md-3 grid-margin stretch-card px-1">
              <CardOverview
                title="Khách hàng"
                bagde="badge badge-primary"
                type="new"
                total={props.data.totalNewCustomer ?? 0}
                ratio={50}
              />
            </div>
            <div className="col-md-3 grid-margin stretch-card px-1">
              <CardOverview
                title="Đơn hàng"
                bagde="badge badge-warning"
                type="active"
                total={props.data.countNewOrder ?? 0}
                ratio={50}
              />
            </div>
            <div className="col-md-3 grid-margin stretch-card pl-2">
              <CardOverview
                title="Liên hệ"
                bagde="badge badge-danger"
                type="delay"
                total={props.data.countContact ?? 0}
                ratio={50}
              />
            </div>
          </div>
        </div>
      </div>

    </Fragment>
  )
}

export default Statistical
