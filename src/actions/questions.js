export const GET_QAS = 'GET_QAS';
export const CREATE_QA = 'CREATE_QA';
export const REPLY_QA = 'REPLY_QA';

export function addQuestion (question) {
  return {
    type: CREATE_QA,
    question
  }
}

export function receiveQuestions(questions){
  return{
    type: GET_QAS,
    questions
  }
}

export function saveQuestionAnswer(authedUser, qid, answer) {
  return {
    type: REPLY_QA,
    authedUser,
    qid,
    answer
  }
}