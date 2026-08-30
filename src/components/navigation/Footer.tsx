import { Link } from 'react-router-dom';
import { Logo } from './Logo';

const columns = [
{
  title: 'Platform',
  links: [
  { label: 'Home', to: '/' },
  { label: 'Services', to: '/services' },
  { label: 'How It Works', to: '/how-it-works' },
  { label: 'Health Tips', to: '/health-information' }]

},
{
  title: 'Workspaces',
  links: [
  { label: 'For Patients', to: '/patient' },
  { label: 'For Doctors', to: '/doctor' },
  { label: 'For Specialists', to: '/specialist' },
  { label: 'Login', to: '/login' }]

},
{
  title: 'Company',
  links: [
  { label: 'About Us', to: '/about' },
  { label: 'Contact Us', to: '/contact' }]

}];


export function Footer() {
  return (
    <footer className="mt-16 border-t border-line bg-white">
      <div className="mx-auto max-w-shell px-6 py-10">
        <div className="grid gap-8 md:grid-cols-[1.4fr_repeat(3,1fr)]">
          <div>
            <Logo />
            <p className="mt-3 max-w-xs text-2xs leading-5 text-ink-500">
              Swastya Sathi helps people find the right healthcare services, manage
              referrals and follow-up care, and stay informed about their healthcare
              journey.
            </p>
          </div>
          {columns.map((column) =>
          <div key={column.title}>
              <h3 className="text-2xs font-semibold text-navy">{column.title}</h3>
              <ul className="mt-3 space-y-2">
                {column.links.map((link) =>
              <li key={link.to + link.label}>
                    <Link
                  to={link.to}
                  className="text-2xs text-ink-500 transition-colors duration-150 ease-out hover:text-brand">
                  
                      {link.label}
                    </Link>
                  </li>
              )}
              </ul>
            </div>
          )}
        </div>

        <div className="mt-8 flex flex-col gap-2 border-t border-line-soft pt-5 text-2xs text-ink-400 md:flex-row md:items-center md:justify-between">
          <p>© {new Date().getFullYear()} Swastya Sathi. Prototype interface.</p>
          <p>
            UI shown is for demonstration purposes of the Swastya Sathi project. All
            data is illustrative.
          </p>
        </div>
      </div>
    </footer>);

}