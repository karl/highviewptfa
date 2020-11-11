import queryString from "query-string";

const divider = "•";

const initialState = {
  title: "",
  names: [],
  selectedIndex: null,
  revolutions: 0,
};

const reducer = (state = initialState, action) => {
  switch (action.type) {
    case "INITIALISE":
      return {
        ...initialState,
        title: action.payload.title,
        names: action.payload.names,
        selectedIndex: null,
        revolutions: 0,
      };
    case "SET_TITLE":
      return {
        ...state,
        title: action.payload,
      };
    case "SET_NAMES":
      return {
        ...state,
        names: action.payload,
        selectedIndex: null,
        revolutions: 0,
      };

    case "SHUFFLE":
      const index = Math.floor(Math.random() * state.names.length);
      return {
        ...state,
        selectedIndex: index,
        revolutions: state.revolutions + 1,
      };

    default:
      return state;
  }
};

const initialise = (payload) => {
  return { type: "INITIALISE", payload };
};

const setTitle = (title) => {
  return { type: "SET_TITLE", payload: title };
};

const setNames = (names) => {
  return { type: "SET_NAMES", payload: names };
};

const shuffle = () => {
  return { type: "SHUFFLE" };
};

export { divider, reducer, initialise, setTitle, setNames, shuffle };
