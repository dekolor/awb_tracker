import { Breadcrumbs } from '@/components/breadcrumbs';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Button } from '@/components/ui/button';
import { DropdownMenu, DropdownMenuContent, DropdownMenuTrigger } from '@/components/ui/dropdown-menu';
import { Sheet, SheetContent, SheetHeader, SheetTitle, SheetTrigger } from '@/components/ui/sheet';
import { UserMenuContent } from '@/components/user-menu-content';
import { useInitials } from '@/hooks/use-initials';
import { cn } from '@/lib/utils';
import { type BreadcrumbItem, type SharedData } from '@/types';
import { Link, router, usePage } from '@inertiajs/react';
import { Menu, Plus, RefreshCw } from 'lucide-react';

interface TopNavProps {
    breadcrumbs?: BreadcrumbItem[];
}

export function TopNav({ breadcrumbs = [] }: TopNavProps) {
    const page = usePage<SharedData>();
    const { auth } = page.props;
    const getInitials = useInitials();

    const handleRefresh = () => router.reload({ only: ['packages'] });
    const isActive = (href: string) => (href === '/dashboard' ? page.url === '/dashboard' : page.url.startsWith(href));

    return (
        <>
            <div className="sticky top-0 z-50 w-full border-b border-white/10 bg-background/60 backdrop-blur-md supports-[backdrop-filter]:bg-background/40">
                <div className="relative mx-auto flex h-16 max-w-7xl items-center px-4">
                    <div className="pointer-events-none absolute inset-x-0 bottom-0 h-px bg-gradient-to-r from-violet-600/40 via-indigo-400/40 to-cyan-400/40" />

                    {/* Mobile menu */}
                    <div className="md:hidden mr-2">
                        <Sheet>
                            <SheetTrigger asChild>
                                <Button variant="ghost" size="icon" className="h-9 w-9" aria-label="Open menu">
                                    <Menu className="h-5 w-5" />
                                </Button>
                            </SheetTrigger>
                            <SheetContent side="left" className="w-80">
                                <SheetHeader className="text-left">
                                    <SheetTitle className="text-base">AWB Tracker</SheetTitle>
                                </SheetHeader>
                                <div className="mt-6 space-y-2">
                                    {[
                                        { title: 'Dashboard', href: '/dashboard' },
                                        { title: 'Packages', href: '/packages' },
                                    ].map((item) => (
                                        <Link
                                            key={item.href}
                                            href={item.href}
                                            className={cn(
                                                'block rounded-md px-3 py-2 text-sm transition-colors hover:bg-accent hover:text-accent-foreground',
                                                isActive(item.href) && 'bg-accent text-accent-foreground font-medium'
                                            )}
                                        >
                                            {item.title}
                                        </Link>
                                    ))}
                                </div>
                            </SheetContent>
                        </Sheet>
                    </div>

                    {/* Brand */}
                    <Link href="/dashboard" className="inline-flex items-center gap-2" aria-label="Go to dashboard">
                        <span className="bg-gradient-to-r from-violet-300 via-indigo-200 to-cyan-200 bg-clip-text text-lg font-semibold tracking-tight text-transparent">
                            AWB Tracker
                        </span>
                    </Link>

                    {/* Desktop nav */}
                    <nav className="ml-6 hidden md:flex items-center gap-2">
                        {[
                            { title: 'Dashboard', href: '/dashboard' },
                            { title: 'Packages', href: '/packages' },
                        ].map((item) => (
                            <Link
                                key={item.href}
                                href={item.href}
                                className={cn(
                                    'rounded-full px-4 py-2 text-sm transition-all hover:bg-accent/60 hover:text-accent-foreground/90',
                                    isActive(item.href) && 'bg-accent text-accent-foreground shadow-inner'
                                )}
                                aria-current={isActive(item.href) ? 'page' : undefined}
                            >
                                {item.title}
                            </Link>
                        ))}
                    </nav>

                    {/* Right actions */}
                    <div className="ml-auto flex items-center gap-2">
                        <Button asChild size="sm" className="hidden sm:flex shadow-md hover:shadow-lg">
                            <Link href="/packages/create">
                                <Plus className="mr-2 h-4 w-4" /> Add Package
                            </Link>
                        </Button>
                        <Button variant="ghost" size="icon" onClick={handleRefresh} className="h-9 w-9" aria-label="Refresh">
                            <RefreshCw className="h-4 w-4" />
                        </Button>
                        <DropdownMenu>
                            <DropdownMenuTrigger asChild>
                                <Button variant="ghost" className="h-9 w-9 rounded-full p-0" aria-label="User menu">
                                    <Avatar className="h-8 w-8">
                                        <AvatarImage src={auth.user.avatar} alt={auth.user.name} />
                                        <AvatarFallback className="bg-muted">{getInitials(auth.user.name)}</AvatarFallback>
                                    </Avatar>
                                </Button>
                            </DropdownMenuTrigger>
                            <DropdownMenuContent align="end" className="w-56">
                                <UserMenuContent user={auth.user} />
                            </DropdownMenuContent>
                        </DropdownMenu>
                    </div>
                </div>
            </div>

            {/* Breadcrumbs */}
            {breadcrumbs.length > 1 && (
                <div className="border-b bg-muted/30">
                    <div className="mx-auto max-w-7xl px-4">
                        <div className="flex h-12 items-center">
                            <Breadcrumbs breadcrumbs={breadcrumbs} />
                        </div>
                    </div>
                </div>
            )}
        </>
    );
}

