import logo from './logo.svg';
import './App.css';
import {Knob} from 'react-rotary-knob';
import {useState} from 'react';

function App() {
  const [value, setValue] = useState(0);

  return (
    <div className="App">
      <Knob onChange={setValue} min={0} max={100} value={value} />
     </div>
  );
}

export default App;
