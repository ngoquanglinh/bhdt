import React from 'react'
import * as sly from './footer.style'
export default function Foodter() {
  return (
    <sly.Footer>
      <div className="container">
        <sly.Footer1>
          <div>© 2021</div>
          <sly.Language>
            Ngôn ngữ
            <span>Tiếng Anh</span>
            <span>Tiếng Trung</span>
            <span>Tiếng Việt</span>
          </sly.Language>
        </sly.Footer1>
        <sly.Footer2>
          <div>Cửa hàng Thành Công mobile</div>
          <div>610 Đê La Thành Giảng Võ, Ba Đình, Hà Nội  Email:thanhcong@gmail.com</div>
        </sly.Footer2>
      </div>
    </sly.Footer>
  )
}
