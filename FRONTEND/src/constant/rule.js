import { isEmail } from './../utils/helper'

export const rule = {
  email: {
    require: {
      value: true,
      message: 'Emaul bắt buộc phải nhập'
    },
    minLength: {
      value: 5,
      message: 'Email phải có độ dài từ 5 - 160 ký tự'
    },
    maxLength: {
      value: 160,
      message: 'Email phải có độ dài từ 5 - 160 ký tự'
    },
    validate: {
      email: v => isEmail(v) || 'Email không đúng định dạng'
    }
  },
  name: {
    maxLength: {
      value: 160,
      message: 'Tên phải có độ dài từ 5 - 160 ký tự'
    }
  },
  phone: {
    maxLength: {
      value: 20,
      message: 'Số điện thoại phải có độ dài từ 5 - 160 ký tự'
    }
  },
  address: {
    maxLength: {
      value: 60,
      message: 'Địa chỉ phải có độ dài từ 5 - 160 ký tự'
    }
  },
  password: {
    require: {
      value: true,
      message: 'Mật khẩu bắt buộc phải nhập'
    },
    minLength: {
      value: 5,
      message: 'Mật khẩu phải có độ dài từ 5 - 160 ký tự'
    },
    maxLength: {
      value: 160,
      message: 'Mật khẩu phải có độ dài từ 5 - 160 ký tự'
    }
  },
  confirmpass: {
    require: {
      value: true,
      message: 'Nhập lại mật khẩu bắt buộc phải nhập'
    },
    minLength: {
      value: 5,
      message: 'Nhập lại mật khẩu phải có độ dài từ 5 - 160 ký tự'
    },
    maxLength: {
      value: 160,
      message: 'Nhập lại mật khẩu phải có độ dài từ 5 - 160 ký tự'
    }
  }
}
