import actionTypes from '../actions/actionTypes';

const initState = {
  templates: [],
  areFetching: false,
  areLoaded: false,
  isError: false,
};

const mailsState = (state = initState, action) => {
  switch (action.type) {
    case actionTypes.templates.TEMPLATES_FETCH:
      return {
        ...state,
        templates: [],
        areFetching: true,
        areLoaded: false,
      };

    case actionTypes.templates.TEMPLATES_STORE:
      return {
        ...state,
        templates: action.payload.templates,
        areFetching: false,
        areLoaded: true,
      };

    case actionTypes.mail.MAIL_REQUEST:
      return {
        ...state,
        isError: false,
      };

    case actionTypes.mail.MAIL_REQUEST_ERROR:
      return {
        ...state,
        isError: true,
      };

    default:
      return state;
  }
};

export default mailsState;
