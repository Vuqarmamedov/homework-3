import React from 'react'

class MyComponent extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            error: null,
            isLoaded: false,
            items: [],
            allTodos: [],
            todos: []
        };

        this.handleChange = this.handleChange.bind(this);
    }

    componentDidMount() {
        fetch("https://jsonplaceholder.typicode.com/users")
            .then(res => res.json())
            .then(
                (result) => {
                    this.setState({
                        isLoaded: true,
                        items: result
                    });
                },
                (error) => {
                    this.setState({
                        isLoaded: true,
                        error
                    });
                }
            )

        fetch("https://jsonplaceholder.typicode.com/todos")
            .then(res => res.json())
            .then(
                (result) => {
                    this.setState({
                        isLoaded: true,
                        todos: result,
                        allTodos: result
                    });
                },
                (error) => {
                    this.setState({
                        isLoaded: true,
                        error
                    });
                }
            )

    }

    handleChange(event){
        let newTodos = [];
        let todosList = this.state;
        let selectedId = event.target.value;
        for (var i=0; i < todosList.allTodos.length;i++){
            if (selectedId == todosList.allTodos[i].userId){
                newTodos.push(todosList.allTodos[i]);
                this.setState({
                    todos:newTodos
                });
            }
            if (selectedId ==0){
                newTodos.push(todosList.allTodos[i]);
                this.setState({
                    todos:newTodos
                })
            }
        }
    }


    render() {
        const { error, isLoaded, items, todos } = this.state;
        if (error) {
            return <div>Ошибка: {error.message}</div>;
        } else if (!isLoaded) {
            return <div>Загрузка...</div>;
        } else {
            return (
                <div>
                    <select onChange={ this.handleChange }>
                        <option value="0" >All</option>
                        {items.map(item => (
                            <option key={item.id} value={item.id}>
                                {item.name}
                            </option>
                        ))}
                    </select>
                    <ul>
                        {todos.map(todo => (
                            <li key={todo.id}>{todo.id} {todo.title}</li>
                        ))}
                    </ul>
                </div>
            );
        }
    }

}

export default MyComponent