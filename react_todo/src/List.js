import React, { Component } from 'react';

export default class List extends Component {
  constructor(props){
    super(props);
  }
  render() {
    const list = this.props.todo.map((todo, i) => {
      return <li key={i}>
               <input type="button" value="x" 
	              onClick={() => this.props.onClick(i)}/>{todo.title}
             </li>
    });
    return (
      <ul>
        {list}
      </ul>
    );
  }
}
