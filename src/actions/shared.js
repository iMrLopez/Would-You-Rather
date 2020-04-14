import { getInitialData } from '../utils/api'
import { addUserQuestion, saveUserAnswer, receiveUsers } from './users'
import { addQuestion, receiveQuestions, saveQuestionAnswer } from './questions'
import { _saveQuestionAnswer, _saveQuestion } from '../utils/_DATA'

export function handleInitialData() {
    return (dispatch) => {
        return getInitialData()
            .then(({ users, questions})=> {
                dispatch(receiveUsers(users));
                dispatch(receiveQuestions(questions))
        })
    }
}

export function handleAddQuestion (optionOneText, optionTwoText){
    return (dispatch, getState) => {
        const { loggedUser } = getState();
        return _saveQuestion({
            optionOneText,
            optionTwoText,
            author: loggedUser
        })
        .then((question) => {
            dispatch(addQuestion(question));
            dispatch(addUserQuestion(loggedUser, question.id))
        })

    }
}

export function handleAnswer (qid, option) {
    return (dispatch, getState) => {
      const { loggedUser } = getState();
      const info = {
        loggedUser: loggedUser,
        qid,
        answer: option
      };
      _saveQuestionAnswer(info)
          .then(() => {
              dispatch(saveQuestionAnswer(loggedUser, qid, option));
              dispatch(saveUserAnswer(loggedUser, qid, option))
          })
    }
}