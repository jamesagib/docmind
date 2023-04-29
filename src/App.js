import { useState } from 'react';
import TopBar from './components/topbar'
import Features from './components/features';
import MainChat from './components/mainchat';

function App() {

  const [darkMode, setDarkMode] = useState(JSON.parse(localStorage.getItem('darkMode')) || false)

  const changeTheme = () => {
    if(darkMode) {
        setDarkMode(false)
    }
    else {
        setDarkMode(true)
    }
  }

  return (
    <div className="App">
      <header className="App-header" style={{ backgroundColor: darkMode ? '#1e1e1e' : 'white' }}>
        <TopBar darkMode={darkMode} changeTheme={changeTheme} />
        <Features darkMode={darkMode} />
        <MainChat darkMode={darkMode} setDarkMode={setDarkMode} />
      </header>
    </div> 
  );
}


export default App;

