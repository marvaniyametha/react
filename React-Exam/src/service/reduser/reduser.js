const initialState = {
  blogs: [],
  blog: null,
  isError: null,
  isCreated: false,
  isUpdated: false,
};

export const blogReducer = (state = initialState, action) => {
  switch (action.type) {
    case "ADD_BLOG_SUC":
      return {
        ...state,
        blogs: [...state.blogs, action.payload],
        isCreated: true,
        isError: null,
      };
      case "GET_SINGLE_BLOG_SUCCESS":
  return {
    ...state,
    blog: action.payload,
  };


    case "ADD_BLOG_REJ":
      return {
        ...state,
        isCreated: false,
        isError: action.message,
      };

    case "GET_ALL_BLOG_SUC":
      return {
        ...state,
        blogs: action.payload,
        isError: null,
      };

    case "GET_ALL_BLOG_REJ":
      return {
        ...state,
        isError: action.message,
      };

    case "UPDATE_BLOG_SUC":
      return {
        ...state,
        isUpdated: true,
        isError: null,
      };

    case "UPDATE_BLOG_REJ":
      return {
        ...state,
        isUpdated: false,
        isError: action.message,
      };

    default:
      return state;
  }
  
};
