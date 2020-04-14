import {GET_QAS, CREATE_QA, REPLY_QA} from '../actions/questions'

export default function questions (state = {}, action){
  switch(action.type){
    case GET_QAS:
      return {
        ...state,
        ...action.questions
      };
    case CREATE_QA:
      const { question } = action;
      return {
        ...state,
        [question.id]: question,
      };
    case REPLY_QA:
      const { authedUser, qid, answer } = action;
      return {
        ...state,
        [qid]: {
          ...state[qid],
          [answer]: {
            ...state[qid][answer],
            votes: state[qid][answer].votes.concat([authedUser])
          }
        }
      };
    default:
      return state
  }
}