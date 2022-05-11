export const pledgeReducer = (state, action) => {
  switch (action.type) {
    case "reset":
      return action.payload || [];
    case "add": {
      return [
        ...state,
        {
          id: Date.now(),
          text: "The same text every time…",
          active: false,
        },
      ];
    }
    case "delete":
      return state.filter((item) => item.id !== action.payload);
    case "activated":
      return state.map((item) => {
        if (item.id === action.payload) {
          return {
            ...item,
            active: !item.active,
          };
        }
        return item;
      });
    default:
      break;
  }
};
