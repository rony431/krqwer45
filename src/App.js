import React, { Component } from 'react';

/// Modifica el componente para que se puedan agregar tareas, tachar y destacharlas y error de validacion en el input

class App extends Component {
  constructor() {
    super()
    this.state = {
      tasks: [
        { id: 1, name: "Sacar la ropa", done: false },
        { id: 2, name: "Hacer la cama", done: true },
        { id: 3, name: "Leer un rato", done: false }
      ],
      newTask: '',
      fetchSuccess: false
    }
  }
  handleValue = (e) => { 
    return this.setState ({newTask: e.target.value}) };
  toggleStatus = (idClicked) => {
    var items = this.state.tasks.filter( (item)=> {
      if (item.id === idClicked){
        item.done = !item.done
      }
      return item
    });
    
    return  this.setState ({tasks: items})
  };  

  keyPressed = (e) =>{
    if (this.state.newTask!== '') {
      e.preventDefault();
        this.state.tasks[this.state.tasks.length] = {
        id : this.state.tasks.length +1,
        name: this.state.newTask,
        done: false
      }
      e.target.value = '';
      this.state.newTask = "";
      this.setState({
        fetchSuccess: false
      });
      return this.setState ({tasks: this.state.tasks})
    }else if ( this.state.newTask == '') {
      e.preventDefault();
      this.setState({
        fetchSuccess: true
      });
    }else {

    }
  } ;
  render() {
    return (
      <div className="wrapper">
        <div className="list">
          <h3>Por hacer:</h3>
          <ul className="todo">
            {this.state.tasks.map((task, index) => <li onClick ={() => this.toggleStatus(task.id)} className={(task.done? "done":"")} key={task.id}>{task.name}</li>)}
          </ul>
          <form onSubmit={this.keyPressed}>
            <input type="text" className={(this.state.fetchSuccess? "error":"")} onChange = {this.handleValue} value= {this.state.newTask}  id="new-task" placeholder="Ingresa una tarea y oprime Enter" value={this.state.newTask} />
          </form>
        </div>
      </div>
    )
  }
}

export default App;
