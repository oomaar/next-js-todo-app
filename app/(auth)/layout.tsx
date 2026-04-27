import { ThemeToggle } from "@/components/ui/ThemeToggle";

export default function AuthLayout({ children }: { children: React.ReactNode }) {
  return (
    <div className="flex min-h-screen">
      {/* Decorative left panel — always dark gradient, no dark mode variant needed */}
      <div className="hidden lg:flex lg:w-1/2 flex-col justify-between bg-gradient-to-br from-indigo-600 via-indigo-700 to-violet-800 p-12 text-white">
        <div className="flex items-center gap-3">
          <div className="flex h-9 w-9 items-center justify-center rounded-xl bg-white/20 backdrop-blur-sm">
            <svg className="h-5 w-5 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5}>
              <path strokeLinecap="round" strokeLinejoin="round" d="M4.5 12.75l6 6 9-13.5" />
            </svg>
          </div>
          <span className="text-xl font-bold tracking-tight">Taski</span>
        </div>

        <div className="space-y-6">
          <div className="space-y-3">
            <h2 className="text-4xl font-bold leading-tight">
              Organize your life,<br />one task at a time.
            </h2>
            <p className="text-lg text-indigo-200">
              Stay productive, focused, and never miss a deadline again.
            </p>
          </div>

          <div className="space-y-3">
            {[
              "Create and manage todos effortlessly",
              "Track your progress in real time",
              "Switch between dark, light, or system theme",
            ].map((feature) => (
              <div key={feature} className="flex items-center gap-3">
                <div className="flex h-6 w-6 shrink-0 items-center justify-center rounded-full bg-white/20">
                  <svg className="h-3.5 w-3.5 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={3}>
                    <path strokeLinecap="round" strokeLinejoin="round" d="M4.5 12.75l6 6 9-13.5" />
                  </svg>
                </div>
                <span className="text-sm text-indigo-100">{feature}</span>
              </div>
            ))}
          </div>
        </div>

        <p className="text-sm text-indigo-300">© {new Date().getFullYear()} Taski. All rights reserved.</p>
      </div>

      {/* Right form panel */}
      <div className="flex flex-1 flex-col bg-slate-50 dark:bg-slate-900">
        {/* Top bar with theme toggle */}
        <div className="flex justify-end px-6 pt-5">
          <ThemeToggle />
        </div>

        <div className="flex flex-1 flex-col items-center justify-center px-6 pb-12">
          {/* Mobile logo */}
          <div className="mb-10 flex items-center gap-2 lg:hidden">
            <div className="flex h-9 w-9 items-center justify-center rounded-xl bg-indigo-600">
              <svg className="h-5 w-5 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5}>
                <path strokeLinecap="round" strokeLinejoin="round" d="M4.5 12.75l6 6 9-13.5" />
              </svg>
            </div>
            <span className="text-xl font-bold text-slate-900 dark:text-slate-100">Taski</span>
          </div>

          <div className="w-full max-w-sm">{children}</div>
        </div>
      </div>
    </div>
  );
}