import { Button } from '../../components/common/Button';

export function NotFound() {
  return (
    <div className="mx-auto flex max-w-shell flex-col items-start px-6 py-24">
      <p className="text-2xs font-medium text-ink-400">Page not found</p>
      <h1 className="mt-2 text-[32px] font-semibold leading-tight tracking-[-0.02em] text-navy">
        We couldn&apos;t find that page
      </h1>
      <p className="mt-3 max-w-md text-[13px] leading-6 text-ink-500">
        The link may be outdated. Head back to the home page or explore the patient
        workspace.
      </p>
      <div className="mt-6 flex gap-2">
        <Button to="/">Back to home</Button>
        <Button variant="secondary" to="/patient">
          Patient workspace
        </Button>
      </div>
    </div>);

}