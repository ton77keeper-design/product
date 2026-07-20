import { ReactNode } from 'react';
import { RoleSwitcher } from './RoleSwitcher';
import { BottomNav } from './BottomNav';

interface AppShellProps {
  children: ReactNode;
}

export function AppShell({ children }: AppShellProps) {
  return (
    <div className="flex flex-col h-screen bg-white dark:bg-gray-900">
      <RoleSwitcher />
      <main className="flex-1 overflow-auto pb-24">
        {children}
      </main>
      <BottomNav />
    </div>
  );
}
