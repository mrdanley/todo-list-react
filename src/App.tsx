import React, { Component } from "react";
import "./App.css";
import TitleBar from "./components/TitleBar/TitleBar";
import TodoInput from "./components/TodoInput/TodoInput";
import TodoList from "./components/TodoList/TodoList";
import autobind from "autobind-decorator";

interface State {
    todos: TodoItem[];
}

export interface TodoItem {
    todoString: string;
    checked: boolean;
    id: string;
}

@autobind
class App extends Component<{}, State> {
    constructor(props: any) {
        super(props);
        this.state = {
            todos: []
        };
    }

    public componentDidMount() {
        const todoJSON = localStorage.getItem("todos");
        if (todoJSON) {
            this.setState({ todos: JSON.parse(todoJSON) });
        }
    }

    public render() {
        const { todos } = this.state;
        return (
            <div className="App">
                <TitleBar />
                <TodoInput
                    addTodo={todo => this.handleSetTodos([...todos, todo])}
                />
                <TodoList todos={todos} setTodos={this.handleSetTodos} />
            </div>
        );
    }

    private handleSetTodos(todos: TodoItem[]) {
        this.setState({ todos });

        localStorage.setItem("todos", JSON.stringify(todos));
    }
}

export default App;
