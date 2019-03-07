import React, { Component } from "react";
import { Button, FormGroup, Form, Row, Col, ModalBody } from "react-bootstrap";
import "./TodoInput.css";
import autobind from "autobind-decorator";
import { TodoItem } from "../../App";
import uuid from "uuid";
import { Modal } from "react-bootstrap";
import PopupWindow from "../PopupWindow/PopupWindow";

interface Props {
  addTodo: (todo: TodoItem) => void;
}
interface State {
  todoInput: string;
  showInputError: boolean;
}

@autobind
class TodoInput extends Component<Props, State> {
  constructor(props: any) {
    super(props);
    this.state = {
      todoInput: "",
      showInputError: false
    };
  }

  public render() {
    const { todoInput, showInputError } = this.state;
    return (
      <React.Fragment>
        <Form onSubmit={this.handleSubmit} className="todo-input-bar">
          <FormGroup>
            <Row>
              <Col sm={8} md={9} lg={10} className="input-col">
                <Form.Control
                  type="input"
                  placeholder="Ex. Buy groceries"
                  value={todoInput}
                  onChange={(e: any) =>
                    this.setState({ todoInput: e.target.value })
                  }
                  className="todo-form-input"
                />
              </Col>
              <Col sm={4} md={3} lg={2} className="button-col">
                <Button
                  variant="primary"
                  type="submit"
                  block
                  className="add-todo-button"
                >
                  Add
                </Button>
              </Col>
            </Row>
          </FormGroup>
        </Form>

        <PopupWindow
          message="Empty input!"
          show={showInputError}
          onClose={() => this.setState({ showInputError: false })}
        />
      </React.Fragment>
    );
  }

  private handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();

    if (this.state.todoInput !== "") {
      const newTodo: TodoItem = {
        todoString: this.state.todoInput,
        checked: false,
        id: uuid.v4()
      };
      this.props.addTodo(newTodo);
      this.setState({ todoInput: "" });
    } else {
      this.setState({ showInputError: true });
    }
  }
}

export default TodoInput;
