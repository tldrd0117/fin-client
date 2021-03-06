import { combineReducers } from "redux";
import todosReducer from "../todos/todosSlice";
import crawlingReducer from "../crawling/crawlingSlice";
import crawlingHistoryReducer from "../crawling/crawlingHistorySlice";
import socketReducer from "../socket/socketSlice"
import userReducer from "../user/userSlice"
import taskReducer from "../task/taskSlice"
import taskScheduleReducer from '../task/taskScheduleSlice'
import { connectRouter } from 'connected-react-router'
import { createBrowserHistory } from 'history'

export const history = createBrowserHistory()

const rootReducer = combineReducers({
    todos: todosReducer,
    crawling: crawlingReducer,
    crawlingHistory: crawlingHistoryReducer,
    socket: socketReducer,
    user: userReducer,
    router: connectRouter(history),
    task: taskReducer,
    taskSchedule: taskScheduleReducer
})

export default rootReducer
export type RootState = ReturnType<typeof rootReducer>

