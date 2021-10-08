export const path = {
  home: '/',
  login: '/login',
  register: '/register',
  user: '/user/account/profile',
  product: '/product',
  productdetail: '/product/:idProduct',
  purchase: '/user/purchase',
  checkout: '/checkout',
  cart: '/cart',
  get profile() {
    return this.user + '/profile'
  },
  get password() {
    return this.user + '/password'
  },
  notfound: '*',
}
