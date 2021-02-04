import logo from './logo.svg';
import './App.css';
import { createStore } from 'redux';
import { Provider } from 'react-redux';
import configStore from './reducers/index.js';
import TodoApp from './components/TodoApp';

const store=configStore();
function App() {
  return (
  <Provider store={store}> 
    <div className="App">
      <TodoApp />
    </div>
  </Provider>
  );
}

export default App;
