import React, { Component } from 'react';
import './App.css';
import { AiOutlineDelete, AiOutlineEdit } from 'react-icons/ai';
import { BsCheckLg } from 'react-icons/bs';

class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      isCompleteScreen: false,
      allTodos: [],
      newTitle: '',
      completedTodos: [],
      currentEdit: "",
      currentEditedItem: "",
    };
  }

  handleAddTodo = () => {
    const { newTitle, allTodos } = this.state;
    const newTodoItem = {
      title: newTitle,
    };

    const updatedTodoArr = [...allTodos, newTodoItem];
    this.setState({ allTodos: updatedTodoArr, newTitle: '' });
  };

  handleDeleteTodo = (index) => {
    const { allTodos } = this.state;
    const reducedTodo = [...allTodos];
    reducedTodo.splice(index, 1);
    this.setState({ allTodos: reducedTodo });
  };

  handleComplete = (index) => {
    const { allTodos, completedTodos } = this.state;
    const now = new Date();
    const completedOn = `${now.toLocaleDateString()} at ${now.toLocaleTimeString()}`;

    const filteredItem = {
      ...allTodos[index],
      completedOn,
    };

    const updatedCompletedArr = [...completedTodos, filteredItem];
    this.setState({ completedTodos: updatedCompletedArr });
    this.handleDeleteTodo(index);
  };

  handleDeleteCompletedTodo = (index) => {
    const { completedTodos } = this.state;
    const reducedTodo = [...completedTodos];
    reducedTodo.splice(index, 1);
    this.setState({ completedTodos: reducedTodo });
  };

  handleEdit = (ind, item) => {
    this.setState({
      currentEdit: ind,
      currentEditedItem: item,
    });
  };

  handleUpdateTitle = (value) => {
    this.setState((prevState) => ({
      currentEditedItem: { ...prevState.currentEditedItem, title: value },
    }));
  };

  handleUpdateToDo = () => {
    const { allTodos, currentEdit, currentEditedItem } = this.state;
    const newToDo = [...allTodos];
    newToDo[currentEdit] = currentEditedItem;
    this.setState({ allTodos: newToDo, currentEdit: "" });
  };

  render() {
    const {
      isCompleteScreen,
      allTodos,
      newTitle,
      completedTodos,
      currentEdit,
      currentEditedItem,
    } = this.state;

    return (
      <div className="App">
        <h1>My Todos</h1>

        <div className="todo-wrapper">
          <div className="todo-input">
            <div className="todo-input-item">
              <label>Title</label>
              <input
                type="text"
                value={newTitle}
                onChange={(e) => this.setState({ newTitle: e.target.value })}
                placeholder="What's the task title?"
              />
            </div>
            <div className="todo-input-item">
              <button
                type="button"
                onClick={this.handleAddTodo}
                className="primaryBtn"
              >
                Add
              </button>
            </div>
          </div>

          <div className="btn-area">
            <button
              className={`secondaryBtn ${isCompleteScreen === false && 'active'}`}
              onClick={() => this.setState({ isCompleteScreen: false })}
            >
              Todo
            </button>
            <button
              className={`secondaryBtn ${isCompleteScreen === true && 'active'}`}
              onClick={() => this.setState({ isCompleteScreen: true })}
            >
              Completed
            </button>
          </div>

          <div className="todo-list">
            {isCompleteScreen === false &&
              allTodos.map((item, index) => {
                if (currentEdit === index) {
                  return (
                    <div className="edit__wrapper" key={index}>
                      <input
                        placeholder="Updated Title"
                        onChange={(e) => this.handleUpdateTitle(e.target.value)}
                        value={currentEditedItem.title}
                      />
                      <button
                        type="button"
                        onClick={this.handleUpdateToDo}
                        className="primaryBtn"
                      >
                        Update
                      </button>
                    </div>
                  );
                } else {
                  return (
                    <div className="todo-list-item" key={index}>
                      <div>
                        <h3>{item.title}</h3>
                      </div>

                      <div>
                        <AiOutlineDelete
                          className="icon"
                          onClick={() => this.handleDeleteTodo(index)}
                          title="Delete?"
                        />
                        <BsCheckLg
                          className="check-icon"
                          onClick={() => this.handleComplete(index)}
                          title="Complete?"
                        />
                        <AiOutlineEdit
                          className="check-icon"
                          onClick={() => this.handleEdit(index, item)}
                          title="Edit?"
                        />
                      </div>
                    </div>
                  );
                }
              })}

            {isCompleteScreen === true &&
              completedTodos.map((item, index) => (
                <div className="todo-list-item" key={index}>
                  <div>
                    <h3>{item.title}</h3>
                    <p>
                      <small>Completed on: {item.completedOn}</small>
                    </p>
                  </div>

                  <div>
                    <AiOutlineDelete
                      className="icon"
                      onClick={() => this.handleDeleteCompletedTodo(index)}
                      title="Delete?"
                    />
                  </div>
                </div>
              ))}
          </div>
        </div>
      </div>
    );
  }
}

export default App;
