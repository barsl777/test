import { createStore } from "redux";

export function addViewColums(item) {
    return {
      type: "ADD",
      item
    };
}

 export function deleteViewColums(item) {
    return {
      type: "DELETE",
      item
    };
}

export const initialState = {
  data: [
    { id: 1, name: "Bob", surname: "Brayn", age: "32", salary: "10000" },
    { id: 2, name: "Kevin", surname: "Sayli", age: "25", salary: "8000" },
    { id: 3, name: "Bil", surname: "Casie", age: "52", salary: "5000" },
    { id: 4, name: "Genny", surname: "Wise", age: "25", salary: "7000" },
    { id: 5, name: "Arnold", surname: "Fox", age: "55", salary: "25000" }
  ],
  allColumns: ["age", "salary"],
  viewColumns: ["id", "name", "surname"]
};

const reducer = (state = initialState, action) => {
  switch (action.type) {
    case "ADD":
      return () => {
        state.allColumns.filter((e) => e !== action.item);
        state.viewColumns.push(action.item);
      };
    case "DELETE":
      return () => {
        state.viewColumns.filter((e) => e !== action.item);
        state.allColumns.push(action.item);
      };
    default:
      return state;
  }
};

const store = createStore(reducer);

export default store;