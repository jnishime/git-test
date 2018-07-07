import React, { Component } from 'react';

export default class Input extends Component {
  constructor(props){
    super(props);
    this.state = {
      textValue: ''
    };

    this.handleAddTodo = this.handleAddTodo.bind(this)
    this.handleChange = this.handleChange.bind(this)
  }
  handleAddTodo(){
    this.props.onClick(this.state.textValue)
    this.state.textValue = ''
  }

  handleChange(e){
    this.setState({textValue: e.target.value})
  }

  render() {
    return (
      <div>
        <input type="text" onChange={this.handleChange} value={this.state.textValue}/>
        <input type="button" value="追加" onClick={this.handleAddTodo}/>
      </div>
    );
  }
}
