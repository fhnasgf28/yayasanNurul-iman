import ReactDOM from 'react-dom';
import MyButton from './components/myButton';
import Navbar from './components/Navbar';
import App from './App';

function App() {
  return (
    <div>
      <Navbar />
      <MyButton label="Klik Saya" onClick={() => alert('Hello World')} />
    </div>
  );
}

ReactDOM.render(<App />, document.getElementById('root'));
