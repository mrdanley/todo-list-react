import React, { Component } from "react";
import { Table, Form, Button } from "react-bootstrap";
import autobind from "autobind-decorator";
import "./TodoList.css";
import { TodoItem } from "../../App";

interface Props {
  todos: TodoItem[];
  setTodos: (todos: TodoItem[]) => void;
}
interface State {}

@autobind
class TodoList extends Component<Props, State> {
  public render() {
    const { todos } = this.props;
    return (
      <div className="todo-list">
        {todos.length === 0 ? (
          <div className="empty-list">No Todos</div>
        ) : (
          <React.Fragment>
            <Button
              variant="secondary"
              onClick={() => this.props.setTodos([])}
              block
              className="clear-todos-button"
            >
              Clear all items
            </Button>
            <Table striped bordered hover>
              <tbody>{this.createTodoList()}</tbody>
            </Table>
          </React.Fragment>
        )}
      </div>
    );
  }

  private createTodoList(): any {
    const { todos } = this.props;
    return todos.map(todo => (
      <tr key={todo.id}>
        <td>
          <Form.Check
            inline
            type="checkbox"
            checked={todo.checked}
            onChange={() => this.handleEditTodos("check", todo.id)}
          />
          {todo.todoString}
          <Button
            variant="danger"
            className="delete-button"
            onClick={() => this.handleEditTodos("delete", todo.id)}
            type="button"
          >
            X
          </Button>
        </td>
      </tr>
    ));
  }

  private handleEditTodos(type: string, id: string) {
    const { todos } = this.props;
    let newTodos: TodoItem[];
    newTodos =
      type === "check"
        ? todos.map(todo => {
            if (todo.id === id) {
              return { ...todo, checked: !todo.checked };
            }
            return todo;
          })
        : todos.filter(todo => todo.id !== id);

    this.props.setTodos(newTodos);
  }
}

export default TodoList;
