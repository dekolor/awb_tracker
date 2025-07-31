import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import AppLayout from '@/layouts/app-layout';
import { type BreadcrumbItem } from '@/types';
import { Head, Link } from '@inertiajs/react';

const breadcrumbs: BreadcrumbItem[] = [
    {
        title: 'Dashboard',
        href: '/dashboard',
    },
];

interface DashboardProps {
    packages: {
        id: number;
        name: string;
        description: string;
        notificationsEnabled: boolean;
        status: string;
        trackingNumber: string;
        carrierId: number;
        origin: string;
        destination: string;
        estimatedDelivery: string;
        lastUpdated: string;
    }[];
}

export default function Dashboard({ packages }: DashboardProps) {
    return (
        <AppLayout breadcrumbs={breadcrumbs}>
            <Head title="Dashboard" />
            <div className="flex h-full flex-1 flex-col gap-4 overflow-x-auto rounded-xl p-4">
                <div className="grid auto-rows-min gap-4 md:grid-cols-3">
                    <div className="relative aspect-video overflow-hidden rounded-xl border border-sidebar-border/70 dark:border-sidebar-border">
                        <Card className="size-full">
                            <CardHeader>
                                <CardTitle className="text-lg font-semibold">Total Packages</CardTitle>
                            </CardHeader>
                            <CardContent>{packages.length} packages</CardContent>
                        </Card>
                    </div>
                    <div className="relative aspect-video overflow-hidden rounded-xl border border-sidebar-border/70 dark:border-sidebar-border">
                        <Card className="size-full">
                            <CardHeader>
                                <CardTitle className="text-lg font-semibold">Packages In-transit</CardTitle>
                            </CardHeader>
                            <CardContent>3 packages</CardContent>
                        </Card>
                    </div>
                    <div className="relative aspect-video overflow-hidden rounded-xl border border-sidebar-border/70 dark:border-sidebar-border">
                        <Card className="size-full">
                            <CardHeader>
                                <CardTitle className="text-lg font-semibold">Delivered Packages</CardTitle>
                            </CardHeader>
                            <CardContent>2 packages</CardContent>
                        </Card>
                    </div>
                </div>
                <div className="relative min-h-[100vh] flex-1 overflow-hidden rounded-xl border border-sidebar-border/70 md:min-h-min dark:border-sidebar-border">
                    <Card className="w-full">
                        <CardHeader>
                            <CardTitle className="text-lg font-semibold">Recent Packages</CardTitle>
                        </CardHeader>
                        <CardContent className="space-y-4">
                            {packages.map((pkg) => (
                                <div className="flex h-full w-full items-center justify-center">
                                    <Card className="w-full">
                                        <CardContent className="flex flex-row justify-between">
                                            <CardTitle className="text-lg font-semibold">{pkg.name}</CardTitle>
                                            <p className="text-muted-foreground">Last status: {pkg.status}</p>
                                            <Link href={'/packages/' + pkg.id} className="ml-4">
                                                <Button variant={'default'}>View details</Button>
                                            </Link>
                                        </CardContent>
                                    </Card>
                                </div>
                            ))}
                        </CardContent>
                    </Card>
                </div>
            </div>
        </AppLayout>
    );
}
