import {BrowserRouter, Switch, Route, Redirect} from 'react-router-dom';
import Home from './pages/Home/Home';
import Navigation from './components/shared/Navigation/Navigation';
import Authenticate from './pages/Authenticate/Authenticate'
import './App.css';
import Rooms from './pages/Rooms/Rooms';
import {useSelector}  from 'react-redux';
import userLoadingWithRefresh from './hooks/useLoadingWithRefresh';
import Loader  from "./components/shared/Loader/Loader";
import Active from "./pages/Steps/StepPhoneEmail/StepPhoneEmail"
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
        <ProtectedRoute path="/rooms">
          <Rooms/>
        </ProtectedRoute>
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
            pathname :  "/rooms",
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


const SemiProtectedRoute= ( {children, ...rest}) => {
  const {user, isAuth} = useSelector(state => state.auth);
  return (
    <Route
      {...rest}
      render={({location}) => {
        return !isAuth ? (
          <Redirect to = {{
            pathname :  "/",
            state : {from : location},
          }}
          />
        ): isAuth && !user.activated ? (
          children
        ):(
          <Redirect to = {{
            pathname :  "/rooms",
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