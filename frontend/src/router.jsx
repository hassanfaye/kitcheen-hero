import { Router, Route, Navigate } from '@solidjs/router';
import { createSignal } from 'solid-js';
import SignIn from './SignIn.jsx';
import SignUp from './SignUp.jsx';
import Dashboard from './Dashboard.jsx';
import Profile from './Profile.jsx';
import HeroScreen from './HeroScreen.jsx';
import RecipeScreen from './RecipeScreen.jsx';
import DashboardPreviewScreen from './DashboardPreviewScreen.jsx';

// Demo: simple auth state (should use context in real app)
export const [isSignedIn, setIsSignedIn] = createSignal(
  localStorage.getItem('signedIn') === 'true'
);

export default function AppRouter() {
  return (
    <Router>
      <Route path="/" component={() => (isSignedIn() ? <Navigate href="/dashboard" /> : <HeroScreen />)} />
      <Route path="/signin" component={SignIn} />
      <Route path="/signup" component={SignUp} />
      <Route path="/dashboard" component={() => (isSignedIn() ? <Dashboard /> : <Navigate href="/" />)} />
      <Route path="/profile" component={() => (isSignedIn() ? <Profile /> : <Navigate href="/" />)} />
      <Route path="/recipe" component={() => (isSignedIn() ? <RecipeScreen /> : <Navigate href="/" />)} />
      <Route path="/preview" component={DashboardPreviewScreen} />
      <Route path="*" component={() => <Navigate href="/" />} />
    </Router>
  );
}