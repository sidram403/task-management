// src/App.jsx
import {
  BrowserRouter as Router,
  Route,
  Routes,
  Navigate,
} from "react-router-dom";
import { Dashboard } from "./components/Dashboard";
import Signup from "./components/SignUp";
import { AuthProvider, useAuth } from "./context/AuthContext";
import Signin from "./components/SignIn";
import { Toaster } from "react-hot-toast";

const PrivateRoute = ({ children }) => {
  const { user , loading} = useAuth();
  console.log(user);
  
  
  return user ? children : <Navigate to="/signin" />;
};

const PublicRoute = ({ children }) => {
  const { user, loading } = useAuth();
 

  return user ? <Navigate to="/" /> : children; // Redirect to home if authenticated
};

function App() {
 

  return (
    <Router>
      <Toaster position="top-right" />
      <Routes>
        <Route
          path="/signin"
          element={
            <PublicRoute>
              <Signin />
            </PublicRoute>
          }
        />
        <Route
          path="/signup"
          element={
            <PublicRoute>
              <Signup />
            </PublicRoute>
          }
        />
        <Route
          path="/"
          element={
            <PrivateRoute>
              <Dashboard />
            </PrivateRoute>
          }
        />
      </Routes>
    </Router>
  );
}

export default App;
