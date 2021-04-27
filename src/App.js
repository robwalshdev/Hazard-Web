import './App.css';
import { BrowserRouter, Route, Switch } from 'react-router-dom';
import Dashboard from "../src/components/Dashboard/Dashboard"
import Login from "../src/components/Login/Login";
import LandingPage from "../src/components/LandingPage/LandingPage"
import useToken from './useToken';

const App = () => {
  const { token, setToken } = useToken();

  return (
    <div className="App">
      <BrowserRouter>
        <Switch>
          <Route path="/dashboard">
            {token ? (
              <Dashboard token={token} />
            ) : <Login setToken={setToken} />}
          </Route>
          <Route path="/">
            <LandingPage></LandingPage>
          </Route>
        </Switch>
      </BrowserRouter>
    </div>

  );
}

export default App;
