import { useEffect } from 'react';
import './App.css';
import userApi from './api/userApi';
import ListUser from './components/ListUser';
function App() {

  return (
    <div className="App">
      <h1>LOL TÂM CODE ĐI</h1>
      <ListUser />
    </div>
  );
}

export default App;
