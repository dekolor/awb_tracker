import { SidebarProvider } from '@/components/ui/sidebar';
import { Background } from '@/components/ui/background';
import { SharedData } from '@/types';
import { usePage } from '@inertiajs/react';

interface AppShellProps {
    children: React.ReactNode;
    variant?: 'header' | 'sidebar';
}

export function AppShell({ children, variant = 'header' }: AppShellProps) {
    const isOpen = usePage<SharedData>().props.sidebarOpen;

    if (variant === 'header') {
        return (
            <div className="relative flex min-h-screen w-full flex-col">
                <Background />
                {children}
            </div>
        );
    }

    return (
        <SidebarProvider defaultOpen={isOpen}>
            <Background />
            {children}
        </SidebarProvider>
    );
}
