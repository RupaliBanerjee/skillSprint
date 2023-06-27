import { createStore } from 'redux';
 
const dataReducer = (state = { filesList: [] }, action) => {
  if (action.type === 'UPLOAD') {
    return {
      filesList: [...action.payload] ,
    };
  }
//   if (action.type === 'decrement') {
//     return {
//       counter: state.counter - 1,
//     };
//   }
  return state;
};
 
const store = createStore(dataReducer);
 
export default store;