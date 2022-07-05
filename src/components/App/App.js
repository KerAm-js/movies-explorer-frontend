import './App.css';
import Main from '../Main/Main';
import Movies from '../Movies/Movies';
import SavedMovies from '../SavedMovies/SavedMovies';
import Register from '../Register/Register';
import LogIn from '../LogIn/LogIn';
import Profile from '../Profile/Profile';
import PageNotFound from '../PageNotFound/PageNotFound';
import { Route } from 'react-router-dom';

function App() {
  return (
    <div className="App">
      <Route path="/" component={Main} />
      {/* <Main /> */}
      {/* <Movies /> */}
      {/* <SavedMovies /> */}
      {/* <Register /> */}
      {/* <LogIn /> */}
      {/* <Profile /> */}
      {/* <PageNotFound /> */}
    </div>
  );
}

export default App;
