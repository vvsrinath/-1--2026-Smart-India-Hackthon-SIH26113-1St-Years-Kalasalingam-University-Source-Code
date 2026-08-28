import Navbar from './components/Navbar/Navbar.jsx';
import AppRoutes from './routes/AppRoutes.jsx';

export default function App() {
  return (
    <div className="min-h-screen flex flex-col bg-background text-text">
      <Navbar />
      <AppRoutes />
    </div>
  );
}
