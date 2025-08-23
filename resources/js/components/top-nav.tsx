import { Breadcrumbs } from '@/components/breadcrumbs';
import { Icon } from '@/components/icon';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Button } from '@/components/ui/button';
import { DropdownMenu, DropdownMenuContent, DropdownMenuTrigger } from '@/components/ui/dropdown-menu';
import { NavigationMenu, NavigationMenuItem, NavigationMenuList, navigationMenuTriggerStyle } from '@/components/ui/navigation-menu';
import { Sheet, SheetContent, SheetHeader, SheetTitle, SheetTrigger } from '@/components/ui/sheet';
import { UserMenuContent } from '@/components/user-menu-content';
import { useInitials } from '@/hooks/use-initials';
import { cn } from '@/lib/utils';
import { type BreadcrumbItem, type NavItem, type SharedData } from '@/types';
import { Link, router, usePage } from '@inertiajs/react';
import { Folder, LayoutGrid, Menu, Plus, RefreshCw } from 'lucide-react';
import AppLogo from './app-logo';
import AppLogoIcon from './app-logo-icon';

const mainTabs: NavItem[] = [
    {
        title: 'Dashboard',
        href: '/dashboard',
        icon: LayoutGrid,
    },
    {
        title: 'Packages', 
        href: '/packages',
        icon: Folder,
    },
];

const activeItemStyles = 'text-neutral-900 bg-neutral-100 dark:bg-neutral-800 dark:text-neutral-100';

interface TopNavProps {
    breadcrumbs?: BreadcrumbItem[];
}

export function TopNav({ breadcrumbs = [] }: TopNavProps) {
    const page = usePage<SharedData>();
    const { auth } = page.props;
    const getInitials = useInitials();

    const handleRefresh = () => {
        router.reload({ only: ['packages'] });
    };

    const isActiveTab = (href: string) => {
        if (href === '/dashboard') {
            return page.url === '/dashboard';
        }
        if (href === '/packages') {
            return page.url.startsWith('/packages');
        }
        return page.url.startsWith(href);
    };

    return (
        <>
            <div className="sticky top-0 z-50 w-full border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
                <div className="mx-auto flex h-16 max-w-7xl items-center px-4">
                    {/* Mobile Menu */}
                    <div className="md:hidden">
                        <Sheet>
                            <SheetTrigger asChild>
                                <Button 
                                    variant="ghost" 
                                    size="icon" 
                                    className="mr-3 h-9 w-9"
                                    aria-label="Open navigation menu"
                                >
                                    <Menu className="h-5 w-5" />
                                </Button>
                            </SheetTrigger>
                            <SheetContent side="left" className="w-80">
                                <SheetHeader className="text-left">
                                    <SheetTitle className="flex items-center gap-2">
                                        <AppLogoIcon className="h-6 w-6 fill-current" />
                                        Package Tracker
                                    </SheetTitle>
                                </SheetHeader>
                                
                                <div className="mt-6 flex flex-col space-y-6">
                                    <div className="space-y-2">
                                        <p className="text-sm font-medium text-muted-foreground">Navigation</p>
                                        {mainTabs.map((tab) => (
                                            <Link
                                                key={tab.title}
                                                href={tab.href}
                                                className={cn(
                                                    "flex items-center gap-3 rounded-md px-3 py-2 text-sm transition-colors hover:bg-accent hover:text-accent-foreground",
                                                    isActiveTab(tab.href) && "bg-accent text-accent-foreground font-medium"
                                                )}
                                            >
                                                {tab.icon && <Icon iconNode={tab.icon} className="h-4 w-4" />}
                                                {tab.title}
                                            </Link>
                                        ))}
                                    </div>

                                    <div className="space-y-2">
                                        <p className="text-sm font-medium text-muted-foreground">Actions</p>
                                        <Link
                                            href="/packages/create"
                                            className="flex items-center gap-3 rounded-md px-3 py-2 text-sm transition-colors hover:bg-accent hover:text-accent-foreground"
                                        >
                                            <Plus className="h-4 w-4" />
                                            Add Package
                                        </Link>
                                        <button
                                            onClick={handleRefresh}
                                            className="flex w-full items-center gap-3 rounded-md px-3 py-2 text-sm transition-colors hover:bg-accent hover:text-accent-foreground"
                                        >
                                            <RefreshCw className="h-4 w-4" />
                                            Refresh
                                        </button>
                                    </div>
                                </div>
                            </SheetContent>
                        </Sheet>
                    </div>

                    {/* Logo */}
                    <Link 
                        href="/dashboard" 
                        className="flex items-center gap-2 hover:opacity-80 transition-opacity"
                        aria-label="Go to dashboard"
                    >
                        <AppLogo />
                    </Link>

                    {/* Desktop Navigation Tabs */}
                    <div className="ml-8 hidden md:flex">
                        <NavigationMenu>
                            <NavigationMenuList className="gap-1">
                                {mainTabs.map((tab) => (
                                    <NavigationMenuItem key={tab.title}>
                                        <Link
                                            href={tab.href}
                                            className={cn(
                                                navigationMenuTriggerStyle(),
                                                "relative h-9 px-4 py-2 text-sm font-medium transition-colors focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2",
                                                isActiveTab(tab.href) ? activeItemStyles : "hover:bg-accent hover:text-accent-foreground"
                                            )}
                                            aria-current={isActiveTab(tab.href) ? "page" : undefined}
                                        >
                                            {tab.icon && <Icon iconNode={tab.icon} className="mr-2 h-4 w-4" />}
                                            {tab.title}
                                        </Link>
                                        {isActiveTab(tab.href) && (
                                            <div className="absolute bottom-0 left-0 h-0.5 w-full bg-primary" />
                                        )}
                                    </NavigationMenuItem>
                                ))}
                            </NavigationMenuList>
                        </NavigationMenu>
                    </div>

                    {/* Right Actions */}
                    <div className="ml-auto flex items-center gap-2">
                        {/* Add Package Button */}
                        <Button asChild size="sm" className="hidden sm:flex">
                            <Link href="/packages/create">
                                <Plus className="mr-2 h-4 w-4" />
                                Add Package
                            </Link>
                        </Button>

                        {/* Mobile Add Button */}
                        <Button asChild size="icon" variant="ghost" className="sm:hidden">
                            <Link href="/packages/create" aria-label="Add package">
                                <Plus className="h-4 w-4" />
                            </Link>
                        </Button>

                        {/* Refresh Button */}
                        <Button
                            variant="ghost"
                            size="icon"
                            onClick={handleRefresh}
                            className="h-9 w-9"
                            aria-label="Refresh packages"
                        >
                            <RefreshCw className="h-4 w-4" />
                        </Button>

                        {/* User Menu */}
                        <DropdownMenu>
                            <DropdownMenuTrigger asChild>
                                <Button 
                                    variant="ghost" 
                                    className="h-9 w-9 rounded-full p-0"
                                    aria-label="User menu"
                                >
                                    <Avatar className="h-8 w-8">
                                        <AvatarImage src={auth.user.avatar} alt={auth.user.name} />
                                        <AvatarFallback className="bg-muted">
                                            {getInitials(auth.user.name)}
                                        </AvatarFallback>
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