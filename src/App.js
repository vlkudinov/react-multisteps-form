import React, { Component } from 'react';
import Form from 'components/Form';
import 'styles/index.scss';

class App extends Component {
  render() {
    return (
      <div className="App">
        <div className="container">
          <h1>Multi-Step Form</h1>
          <Form/>
        </div>
      </div>
    );
  }
}

export default App;
