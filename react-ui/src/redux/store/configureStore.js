import {createStore, applyMiddleware} from 'redux';//https://www.thegreatcodeadventure.com/react-redux-tutorial-part-iii-async-redux/
import rootReducer from '../reducers/rootReducer';
import thunk from 'redux-thunk';//https://medium.com/@gethylgeorge/understanding-how-redux-thunk-works-72de3bdebc50
//https://github.com/rajdee/redux-in-russian/blob/master/docs/advanced/AsyncActions.md
//https://github.com/rajdee/redux-in-russian/blob/master/docs/advanced/Middleware.md
//https://medium.com/fullstack-academy/thunks-in-redux-the-basics-85e538a3fe60
// redux-thunk позволяет генераторам действий инвертировать управление вызывая функции.

export default function configureStore() {
    return createStore(
        rootReducer,
        applyMiddleware(thunk)
    );
};

