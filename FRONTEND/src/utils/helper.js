// chứa cá fn hay dùng đi dùng lại ?

export const isEmail = value => /^[a-zA-Z0-9]+@(?:[a-zA-Z0-9]+\.)+[A-Za-z]+$/.test(value)

// Currying HOC

export const payloadCreator = asynFunc => async (arg, thunkApi) => {
  try {
    const res = await asynFunc(arg)
    return res
  } catch (error) {
    return thunkApi.rejectWithValue(error)
  }
}
//encodeURIComponent mã hóa String khi đưa lên url
export const generaNameId = ({ name, id }) =>
  encodeURIComponent(`${name.replace(/\s/g, '-').replace(/%/g, '')}-i.${id}`)
// Conver Id từ Name
export const getIdToNameId = url => {
  const arr = url.split('-i.')
  return arr[arr.length - 1]
}
//Tính Sales % giá
export const rateSales = (original, sale) => Math.round(((original - sale) / original) * 100) + '%'

export const formatMoney = (value, charater = '.') => String(value).replace(/\B(?=(\d{3})+(?!\d))/g, charater)

export const formatK = value => {
  const price = Number((Number(value) / 1000).toFixed(2))
  if (price > 1) {
    return price + 'k'
  }
}
