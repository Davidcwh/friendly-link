import { Route, Switch, Redirect } from 'react-router';
import { useAuth0 } from '@auth0/auth0-react';
import LandingPage from './pages/LandingPage.tsx';
import UserDashboardPage from './pages/UserDashboardPage.tsx';
import LoadingPage from './pages/LoadingPage.tsx';
import LinkValidationPage from './pages/LinkValidationPage.tsx';
import ProtectedRoute from './auth/protected-route';
import { Styles } from './styles/styles';

function App() {
    const { isLoading, isAuthenticated } = useAuth0();

    return (
        <>
            <Styles/>
            <Switch>
                <Route exact path="/">
                    {isAuthenticated 
                        ? <Redirect to='/dashboard'/>
                        : (
                            isLoading ? <LoadingPage/> : <LandingPage/>
                        )
                    }
                </Route>
                <ProtectedRoute exact path="/dashboard" component={UserDashboardPage}/>
                <Route path="/goto/:shortcode" component={LinkValidationPage}/>
            </Switch>
        </>
    );
}

export default App;
