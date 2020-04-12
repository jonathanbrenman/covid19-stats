import React from 'react';
import './App.css';
import CovidStats from './components/covidstats/covidStats'

function App() {
  return (
    <div className="layout">
      <div className="App">
        <header className="App-header">
          <h1>CoVid19</h1>
        </header>
        <div className="wrap-container">
          <CovidStats />
        </div>
      </div>
    </div>
  );
}

export default App;
