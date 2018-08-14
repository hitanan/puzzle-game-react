import * as types from './actionTypes';
import firebase, { auth, provider } from '../firebase.js';

const TableDB = 'users';
const usersRef = firebase.database().ref(TableDB);


function loginUserSuccess(user) {
    return {type: types.LOGIN_USER_SUCCESS, user};
}

function logoutUserSuccess(user) {
    return {type: types.LOGOUT_USER_SUCCESS, user};
}
function updateUserScore(user) {
    return {type: types.UPDATE_USER_SCORE, user};
}

export function loginUser(result) {
    return function (dispatch) {
        auth.signInWithPopup(provider) 
        .then((data) => {
            const user = data.user;
            user.scores = {};
            user.scores[result.game] = result.score;
            dispatch(loginUserSuccess(user));
            result.firstTimeLogin = true;
            dispatch(saveScore(result));
        });
    }
}

export function logoutUser() {
    return function (dispatch) {
        auth.signOut();
        dispatch(logoutUserSuccess(null));
        return;
    }
}

export function saveScore(result) {
    return function (dispatch, getState) {
        const user = getState().user;
        if (!user) {
            return;
        }
        // Add uid to save later
        result.user = user;

        if (!result.firstTimeLogin) {
            if (result.score > user.scores[result.game]) {
                user.scores[result.game] = result.score;
                dispatch(updateUserScore(user));
                updateDatabase(result);
            }
        } else  {
            // update store
            user.scores = {};
            user.scores[result.game] = result.score;
            dispatch(updateUserScore(user));
            usersRef.once('value', (snapshot) => {
                let users = snapshot.val();
                // console.log(users);
                let dbUser = findUser(users, user.uid);
                if (dbUser) {
                    if (result.score > dbUser.score) {
                        updateDatabase(result);
                    } else {
                        user.scores[result.game] = dbUser.score;
                        dispatch(updateUserScore(user));
                    }
                } else {
                  // save new
                  const item = {
                    uid : user.uid, 
                    name: user.displayName,
                    score: result.score
                  }

                  // create a record
                  usersRef.push(item);
                }
              
            });
          }

        //dispatch(logoutUserSuccess(null));
    }
}

function findUser(users, uid) {
    for (const key in users) {
        if (users[key].uid === uid) {
            var user = Object.assign({}, users[key]);
            user.key = key;
            return user;
        }
    }
    return null;
}

function updateDatabase(result) {
    usersRef.once('value', (snapshot) => {
        let users = snapshot.val();
        let dbUser = findUser(users, result.user.uid);
        console.log(dbUser);
        if (dbUser != null) {
            firebase.database().ref(TableDB +'/' + dbUser.key).update({score: result.score});
        }
    });
}
