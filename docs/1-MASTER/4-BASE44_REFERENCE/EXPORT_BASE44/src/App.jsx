import { Toaster } from "@/components/ui/toaster"
import { QueryClientProvider } from '@tanstack/react-query'
import { queryClientInstance } from '@/lib/query-client'
import { BrowserRouter as Router, Route, Routes, Navigate } from 'react-router-dom';
import PageNotFound from './lib/PageNotFound';
import { AuthProvider, useAuth } from '@/lib/AuthContext';
import UserNotRegisteredError from '@/components/UserNotRegisteredError';
import ScrollToTop from './components/ScrollToTop';

// Shell
import AppShell from '@/components/shell/AppShell.jsx';

// Pages
import Login from '@/pages/Login.jsx';
import Dashboard from '@/pages/Dashboard.jsx';
import Planning from '@/pages/Planning.jsx';
import Utilisateurs from '@/pages/Utilisateurs.jsx';
import Vehicules from '@/pages/Vehicules.jsx';
import SuiviVehicules from '@/pages/SuiviVehicules.jsx';
import ModelesHoraires from '@/pages/ModelesHoraires.jsx';
import Societe from '@/pages/Societe.jsx';
import Depots from '@/pages/Depots.jsx';
import MiseEnRoute from '@/pages/MiseEnRoute.jsx';
import Audit from '@/pages/Audit.jsx';

const AuthenticatedApp = () => {
  const { isLoadingAuth, isLoadingPublicSettings, authError, navigateToLogin } = useAuth();

  if (isLoadingPublicSettings || isLoadingAuth) {
    return (
      <div className="fixed inset-0 flex items-center justify-center bg-background">
        <div className="w-8 h-8 border-4 border-slate-200 border-t-primary rounded-full animate-spin"></div>
      </div>
    );
  }

  if (authError) {
    if (authError.type === 'user_not_registered') {
      return <UserNotRegisteredError />;
    } else if (authError.type === 'auth_required') {
      navigateToLogin();
      return null;
    }
  }

  return (
    <Routes>
      <Route path="/login" element={<Login />} />
      <Route element={<AppShell />}>
        <Route path="/" element={<Dashboard />} />
        <Route path="/planning" element={<Planning />} />
        <Route path="/utilisateurs" element={<Utilisateurs />} />
        <Route path="/vehicules" element={<Vehicules />} />
        <Route path="/suivi-vehicules" element={<SuiviVehicules />} />
        <Route path="/modeles-horaires" element={<ModelesHoraires />} />
        <Route path="/societe" element={<Societe />} />
        <Route path="/depots" element={<Depots />} />
        <Route path="/mise-en-route" element={<MiseEnRoute />} />
        <Route path="/audit" element={<Audit />} />
      </Route>
      <Route path="*" element={<PageNotFound />} />
    </Routes>
  );
};

function App() {
  return (
    <AuthProvider>
      <QueryClientProvider client={queryClientInstance}>
        <Router>
          <ScrollToTop />
          <AuthenticatedApp />
        </Router>
        <Toaster />
      </QueryClientProvider>
    </AuthProvider>
  )
}

export default App