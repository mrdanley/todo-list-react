import React, { Component } from "react";
import { Button, FormGroup, Form, Row, Col } from "react-bootstrap";
import "./TodoInput.css";
import autobind from "autobind-decorator";
import { TodoItem } from "../../App";
import uuid from "uuid";

interface Props {
  addTodo: (todo: TodoItem) => void;
}
interface State {
  todoInput: string;
}

@autobind
class TodoInput extends Component<Props, State> {
  constructor(props: any) {
    super(props);
    this.state = {
      todoInput: ""
    };
  }

  public render() {
    return (
      <Form onSubmit={this.handleSubmit} className="todo-input-bar">
        <FormGroup>
          <Row>
            <Col sm={8} md={9} lg={10} className="input-col">
              <Form.Control
                type="input"
                placeholder="Ex. Buy groceries"
                value={this.state.todoInput}
                onChange={(e: any) =>
                  this.setState({ todoInput: e.target.value })
                }
              />
            </Col>
            <Col sm={4} md={3} lg={2} className="button-col">
              <Button variant="primary" type="submit" block className="button">
                Add
              </Button>
            </Col>
          </Row>
        </FormGroup>
      </Form>
    );
  }

  private handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    const newTodo: TodoItem = {
      todoString: this.state.todoInput,
      checked: false,
      id: uuid.v4()
    };
    this.props.addTodo(newTodo);
    this.setState({ todoInput: "" });
  }
}

export default TodoInput;
