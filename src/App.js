import logo from './logo.svg';
import './App.css';
import { createStore } from 'redux';
import { Provider } from 'react-redux';
import reducer from './reducers';

const store=createStore(reducer);

function App() {
  return (
  <Provider store={store}> 
    <div className="App">
      <label>What do you do?</label>
      <input name='skill' placeholder='nghe nghiep' />
      <br></br>
      <button>Add</button>
      <header className="App-header">
        <img src={logo} className="App-logo" alt="logo" />
        <p>
          Edit <code>src/App.js</code> and save to reload.
        </p>
        <a
          className="App-link"
          href="https://reactjs.org"
          target="_blank"
          rel="noopener noreferrer"
        >
          Learn React
        </a>
      </header>
    </div>
  </Provider>
  );
}

export default App;
