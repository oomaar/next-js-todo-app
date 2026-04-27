type LoadingStateProps = {
  message?: string;
};

export function LoadingState({ message = "Loading..." }: LoadingStateProps) {
  return (
    <div className="flex flex-col items-center justify-center gap-4 py-20">
      <div className="relative h-10 w-10">
        <div className="absolute inset-0 rounded-full border-4 border-indigo-100 dark:border-indigo-900" />
        <div className="absolute inset-0 animate-spin rounded-full border-4 border-transparent border-t-indigo-600 dark:border-t-indigo-400" />
      </div>
      <p className="text-sm font-medium text-slate-500 dark:text-slate-400">{message}</p>
    </div>
  );
}