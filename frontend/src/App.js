import './App.css';
import {BrowserRouter, Switch, Route, Redirect} from 'react-router-dom';
import {Home} from './pages/Home/Home';
import Navigation from './components/shared/Navigation/Navigation';
import Authenticate from './pages/Authenticate/Authenticate'
import Active from './pages/Active/Active';
import Room from './pages/Rooms/Rooms';
import {useSelector}  from 'react-redux';
import {userLoadingWithRefresh} from './hooks/userLoadingWithRefresh';
import { Loader } from "./components/shared/Loader/Loader";

function App() {
  const {loading} = userLoadingWithRefresh();
  return loading ? (
    <Loader message="Loading, please wait"/>
  ): (
    <BrowserRouter>
      <Navigation/>
      <Switch>
        <GuestRoute path="/" exact>
          <Home />
        </GuestRoute>
        <GuestRoute path="/authenticate">
          <Authenticate/>
        </GuestRoute>
        <SemiProtectedRoute>
          <Active/>
        </SemiProtectedRoute>
        <Protected path="/rooms">
          <Rooms/>
        </Protected>
      </Switch>
    </BrowserRouter>
  )
}


const GuestRoute = ({children, ...rest}) => {
  const {isAuth} = useSelector(state => state.auth);
  return (
    <Route
      {...rest}
      render = {({location}) => {
        return isAuth ? (
          <Redirect to = {{
            pathname =  "/rooms",
            state : {from : location},
          }}
          />
        ):(
          children
        )
      }}
    ></Route>
  )
}


const SemiProtected = ({children, ...rest}) => {
  const {user, isAuth} = useSelector(state => state.auth);
  return (
    <Route
      {...rest}
      render={({location}) => {
        return !isAuth ? (
          <Redirect to = {{
            pathname =  "/",
            state : {from : location},
          }}
          />
        ): isAuth && !user.activated ? (
          children
        ):(
          <Redirect to = {{
            pathname =  "/rooms",
            state : {from : location},
          }}
          />
        )
      }}
      ></Route>
  )
}


const ProtectedRoute = ({ children, ...rest }) => {
  const { user, isAuth } = useSelector((state) => state.auth);
  return (
      <Route
          {...rest}
          render={({ location }) => {
              return !isAuth ? (
                  <Redirect
                      to={{
                          pathname: '/',
                          state: { from: location },
                      }}
                  />
              ) : isAuth && !user.activated ? (
                  <Redirect
                      to={{
                          pathname: '/activate',
                          state: { from: location },
                      }}
                  />
              ) : (
                  children
              );
          }}
      ></Route>
  );
};


export default App;