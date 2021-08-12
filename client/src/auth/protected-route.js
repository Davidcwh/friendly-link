import React from "react";
import { Route } from "react-router-dom";
import { withAuthenticationRequired } from "@auth0/auth0-react";
import LoadingPage from '../pages/LoadingPage.tsx';

const ProtectedRoute = ({ component, ...args }) => (
  <Route
    component={withAuthenticationRequired(component, {
      onRedirecting: () => <LoadingPage />,
    })}
    {...args}
  />
);

export default ProtectedRoute;