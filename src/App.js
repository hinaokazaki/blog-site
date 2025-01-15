import react from 'react';
import { Routes, Route } from 'react-router-dom';
import './css/App.css';
import Header from './components/Header';
import Home from './components/Home';
import Contact from './components/Contact';
import Details from './components/Details';
import { posts } from './data/posts';

function App() {
  return (
    <div className="App">
      <Header />
        <Routes>
          <Route path='/' element={<Home />} /> 
          <Route path='/posts/:id' element={<Details src={posts}/>}/>
          <Route path='/contact' element={<Contact />}/>
        </Routes>
    </div>
  );
}

export default App;
