import { Actions } from "../actions";

const initialState = {
  items: null,
  itemCopy:null,
  total: 0
};
function dataUserRec(state = initialState, action) {
  switch (action.type) {
    case Actions.GET_LIST_USER_REC_SUCCESS:
      const { items, total } = action.payload.res;
      const {vip } = action.payload;
      console.log(vip,'vip');
      if (vip) return { ...state, items, total,itemCopy:items };
      else { 
        const itemsNovip = items.filter(item=>!item.verify);
        return { ...state, items:itemsNovip, total,itemCopy:itemsNovip };
      }

    
    case Actions.FILTER_USER:
      const { key } = action.payload;
      const listData = [...state.itemCopy];
      console.log(listData);
      const listFilter = listData?.filter(item=>{
        let show = false;
        item.skills?.forEach(i=>{
          if(i.toString()===key) show=true;
        })
        if (show) return item;
        else return;
      })
      return {...state,items:listFilter} 
    case Actions.FILTER_USER_USERNAME:
      const { name } = action.payload;
      const dataString = [...state.itemCopy];
      const dataFiltered = dataString.filter(item=>item.userName.includes(name))
      return {...state,items:dataFiltered}
    default:
      return { ...state };
  }
}
export default dataUserRec;
