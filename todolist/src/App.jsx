import "./App.css";
import React,{ useMemo,useCallback, useReducer, useRef } from "react";
import Header from './components/Header';
import TodoEditor from './components/TodoEditor';
import TodoList from './components/TodoList';
// import TestComp from "./components/TestComp";

const reducer = (state, action) => {
  switch (action.type) {
    case "CREATE": {
        return [action.newTodo,...state]
      }
    case "UPDATE": {
      return state.map((it) =>
        it.id === action.targetId ? { ...it, isDone: !it.isDone } : it)
    }
    case "DELETE":{
      return state.filter((it) => it.id !== action.targetId)
      }
    default:
      return state;
}
}

const mockTodo = [
  {
    id: 0,
    isDone: false,
    content: "React 공부하기",
    createdDate: new Date().getTime(),
  },
  {
    id: 1,
    isDone: false,
    content: "빨래 널기",
    createdDate: new Date().getTime(),
  },
  {
    id: 2,
    isDone: false,
    content: "노래 연습하기",
    createdDate: new Date().getTime(),
  },
];

const TodoStateContext = React.createContext();
const TodoDispatchContext = React.createContext();

const App = () => {
  const [todo, dispatch] = useReducer(reducer,mockTodo);
  // const [todo, setTodo] = useState(mockTodo);
  const idRef = useRef(3);

  const onCreate = (content) => {
    dispatch({
      type: "CREATE",
      newTodo: {
        id: idRef.current,
        content,
        isDone: false,
        createdDate: new Date().getTime(),
      },
    })
    idRef.current += 1;
  };

  const onUpdate = useCallback((targetId) => {
    dispatch ({
      type: "UPDATE",
      targetId,
    });
  }, []);

  const onDelete = useCallback((targetId) => {
    dispatch ({
      type: "DELETE",
      targetId,
    });
  },[])

  const memoizedDispatches = useMemo(() => {
    return { onCreate, onUpdate, onDelete}
  }, [onUpdate, onDelete]);

  return (
    <div className="App">
      <TodoStateContext.Provider value={todo}>
        <TodoDispatchContext.Provider value={memoizedDispatches}>        
        {/* <TestComp /> */}
        <Header />
        <TodoEditor/>
        <TodoList/>
        </TodoDispatchContext.Provider>
      </TodoStateContext.Provider>
    </div>
  );
}

export default App;