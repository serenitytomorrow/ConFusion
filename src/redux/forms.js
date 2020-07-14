import * as ActionTypes from './ActionTypes';

export const InitialFeedback = {
    firstname: '',
    lastname: '',
    telnum: '',
    email: '',
    agree: false,
    contactType: 'Tel.',
    message: ''
};


export const Feedback = (state = { errMess: null, feedback: InitialFeedback}, action) => {
  switch (action.type) {
    case ActionTypes.FEEDBACK_LOADING:
      return {...state, errMess: null, feedback: action.payload};

    case ActionTypes.FEEDBACK_FAILED:
      return {...state, errMess: action.payload};

      case ActionTypes.POST_FEEDBACK:
          var feedback = action.payload;
          return { ...state, feedback: state.feedback.concat(feedback)};

    default:
      return state;
  }
};
