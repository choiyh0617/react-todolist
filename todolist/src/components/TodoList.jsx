import { useState } from "react";
import TodoItem from './TodoItem';
import "./TodoList.css";

const TodoList = ({ todo, onUpdate, onDelete }) => {
  const [search, setSearch] = useState("");
  
  const onChangeSearch = (e) => {
    setSearch(e.target.value);
  };

  const getSearchResult = () => {
    return search === ""
      ? todo
      : todo.filter((it) =>
          it.content.toLowerCase().includes(search.toLowerCase())
        );
  };

  const analyzeApp = () => {
    console.log('analyzeApp')
    const totalCount = todo.length;
    const doneCount = todo.filter((it) => it.isDone).length;
    const notDoneCount = totalCount-doneCount;

    return {
      totalCount,
      doneCount,
      notDoneCount
    }
  }

  const {totalCount , doneCount, notDoneCount }= analyzeApp();
  return (
    <div className="TodoList">
      <h4>Todo List 🌱</h4>
      <div>
        <div>총개수 : {totalCount}</div>
        <div>완료 : {doneCount}</div>
        <div>미완료 : {notDoneCount}</div>
      </div>
      <input
        value={search}
        onChange={onChangeSearch}
        className="searchbar"
        placeholder="검색어를 입력하세요"
      />
      <div className="list_wrapper">
        {getSearchResult().map((it) => (
          <TodoItem
            key={it.id}
            {...it}
            onUpdate={onUpdate}
            onDelete={onDelete}
          />
        ))}
      </div>
    </div>
  );
};
export default TodoList;