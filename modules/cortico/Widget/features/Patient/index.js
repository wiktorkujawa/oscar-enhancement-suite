const initialState = {};

export function patientReducer(state = initialState, action) {
  switch (action.type) {
    case "patient/setAll":
      return { ...state, ...action.payload };
    default:
      return state;
  }
}
