"use client";

import { EmptyState } from "@/components/ui/EmptyState";
import { ThemeToggle } from "@/components/ui/ThemeToggle";
import { useLogout } from "@/hooks/auth/useLogout";
import { useUpdateTheme } from "@/hooks/user/useUpdateTheme";
import type { Theme } from "@/server/dtos/UserDTOs/user.dto";

const STATS = [
  { label: "Total tasks",  value: "0", valueClass: "text-slate-900 dark:text-slate-100" },
  { label: "Completed",    value: "0", valueClass: "text-emerald-600 dark:text-emerald-400" },
  { label: "Pending",      value: "0", valueClass: "text-amber-600 dark:text-amber-400" },
];

export default function HomePage() {
  const { mutate: logout, isPending: isLoggingOut } = useLogout();
  const { mutate: updateTheme } = useUpdateTheme();

  function handleThemeChange(theme: Theme) {
    updateTheme({ theme });
  }

  return (
    <div className="flex min-h-screen flex-col bg-slate-50 dark:bg-slate-900">
      {/* Navbar */}
      <header className="sticky top-0 z-10 border-b border-slate-200 bg-white/80 backdrop-blur-md dark:border-slate-700/60 dark:bg-slate-900/80">
        <div className="mx-auto flex h-16 max-w-5xl items-center justify-between px-6">
          <div className="flex items-center gap-2.5">
            <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-indigo-600">
              <svg className="h-4 w-4 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5}>
                <path strokeLinecap="round" strokeLinejoin="round" d="M4.5 12.75l6 6 9-13.5" />
              </svg>
            </div>
            <span className="text-lg font-bold text-slate-900 dark:text-slate-100">Taski</span>
          </div>

          <div className="flex items-center gap-3">
            <ThemeToggle onThemeChange={handleThemeChange} />

            <div className="hidden h-6 w-px bg-slate-200 dark:bg-slate-700 sm:block" />

            <div className="hidden h-8 w-8 items-center justify-center rounded-full bg-indigo-100 dark:bg-indigo-900/50 sm:flex">
              <span className="text-xs font-bold text-indigo-600 dark:text-indigo-400">U</span>
            </div>

            <button
              onClick={() => logout()}
              disabled={isLoggingOut}
              className="flex items-center gap-2 rounded-lg border border-slate-200 bg-white px-3 py-1.5 text-sm font-medium text-slate-600 transition hover:border-slate-300 hover:bg-slate-50 hover:text-slate-900 disabled:opacity-50 dark:border-slate-700 dark:bg-slate-800 dark:text-slate-400 dark:hover:border-slate-600 dark:hover:bg-slate-700 dark:hover:text-slate-200"
            >
              {isLoggingOut ? (
                <div className="h-3.5 w-3.5 animate-spin rounded-full border-2 border-slate-300 border-t-slate-600 dark:border-slate-600 dark:border-t-slate-300" />
              ) : (
                <svg className="h-3.5 w-3.5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                  <path strokeLinecap="round" strokeLinejoin="round" d="M15.75 9V5.25A2.25 2.25 0 0013.5 3h-6a2.25 2.25 0 00-2.25 2.25v13.5A2.25 2.25 0 007.5 21h6a2.25 2.25 0 002.25-2.25V15M12 9l-3 3m0 0l3 3m-3-3h12.75" />
                </svg>
              )}
              {isLoggingOut ? "Signing out…" : "Sign out"}
            </button>
          </div>
        </div>
      </header>

      <main className="mx-auto w-full max-w-5xl flex-1 px-6 py-10">
        {/* Page header */}
        <div className="mb-8">
          <h1 className="text-2xl font-bold text-slate-900 dark:text-slate-100">My Tasks</h1>
          <p className="mt-1 text-slate-500 dark:text-slate-400">Manage and track everything you need to do</p>
        </div>

        {/* Stats */}
        <div className="mb-8 grid grid-cols-1 gap-4 sm:grid-cols-3">
          {STATS.map(({ label, value, valueClass }) => (
            <div
              key={label}
              className="rounded-2xl border border-slate-200 bg-white p-5 shadow-sm dark:border-slate-700/60 dark:bg-slate-800"
            >
              <p className="text-sm font-medium text-slate-500 dark:text-slate-400">{label}</p>
              <p className={`mt-1.5 text-3xl font-bold ${valueClass}`}>{value}</p>
            </div>
          ))}
        </div>

        {/* Toolbar skeleton */}
        <div className="mb-5 flex items-center justify-between">
          <div className="flex items-center gap-2">
            <div className="h-9 w-24 animate-pulse rounded-lg bg-slate-200 dark:bg-slate-700" />
            <div className="h-9 w-24 animate-pulse rounded-lg bg-slate-200 dark:bg-slate-700" />
          </div>
          <button className="flex items-center gap-2 rounded-xl bg-indigo-600 px-4 py-2 text-sm font-semibold text-white shadow-sm transition hover:bg-indigo-700">
            <svg className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5}>
              <path strokeLinecap="round" strokeLinejoin="round" d="M12 4.5v15m7.5-7.5h-15" />
            </svg>
            Add task
          </button>
        </div>

        {/* Todo list area */}
        <div className="rounded-2xl border border-slate-200 bg-white shadow-sm dark:border-slate-700/60 dark:bg-slate-800">
          <EmptyState
            title="No tasks yet"
            description="Add your first task and start getting things done."
            action={
              <button className="flex items-center gap-2 rounded-xl bg-indigo-600 px-4 py-2 text-sm font-semibold text-white transition hover:bg-indigo-700">
                <svg className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5}>
                  <path strokeLinecap="round" strokeLinejoin="round" d="M12 4.5v15m7.5-7.5h-15" />
                </svg>
                Add your first task
              </button>
            }
          />
        </div>
      </main>
    </div>
  );
}