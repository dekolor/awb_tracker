import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Separator } from '@/components/ui/separator';
import AppLayout from '@/layouts/app-layout';
import { type BreadcrumbItem } from '@/types';
import { Head, Link } from '@inertiajs/react';
import { ArrowLeft, Bell, BellOff, Calendar, Clock, Copy, MapPin, Package, Truck } from 'lucide-react';
import { toast } from 'sonner';

interface ShowPackageProps {
    package: {
        id: number;
        name: string;
        description: string;
        notificationsEnabled: boolean;
        status: string;
        trackingNumber: string;
        carrierId: number;
        carrierName?: string;
        origin: string;
        destination: string;
        estimatedDelivery: string;
        lastUpdated: string;
        createdAt?: string;
    };
}

const getStatusColor = (status: string) => {
    switch (status.toLowerCase()) {
        case 'delivered':
            return 'bg-green-100 text-green-800 border-green-200';
        case 'in_transit':
        case 'in transit':
            return 'bg-blue-100 text-blue-800 border-blue-200';
        case 'pending':
            return 'bg-yellow-100 text-yellow-800 border-yellow-200';
        case 'delayed':
            return 'bg-red-100 text-red-800 border-red-200';
        default:
            return 'bg-gray-100 text-gray-800 border-gray-200';
    }
};

const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString('en-US', {
        year: 'numeric',
        month: 'long',
        day: 'numeric',
        hour: '2-digit',
        minute: '2-digit',
    });
};

const copyToClipboard = async (text: string) => {
    try {
        await navigator.clipboard.writeText(text);
        toast.success('Tracking number copied to clipboard');
    } catch {
        toast.error('Failed to copy tracking number');
    }
};

export default function ShowPackage({ package: pkg }: ShowPackageProps) {
    const breadcrumbs: BreadcrumbItem[] = [
        {
            title: 'Packages',
            href: '/packages',
        },
        {
            title: pkg.name,
            href: `/packages/${pkg.id}`,
        },
    ];

    return (
        <AppLayout breadcrumbs={breadcrumbs}>
            <Head title={`Package: ${pkg.name}`} />

            <div className="flex h-full flex-1 flex-col gap-6 overflow-x-auto rounded-xl p-4">
                {/* Header */}
                <div className="flex items-center justify-between">
                    <div className="flex items-center gap-4">
                        <Link href="/dashboard">
                            <Button variant="outline" size="sm">
                                <ArrowLeft className="mr-2 h-4 w-4" />
                                Back to Packages
                            </Button>
                        </Link>
                        <div>
                            <h1 className="text-2xl font-bold">{pkg.name}</h1>
                            <p className="mt-1 text-sm text-muted-foreground">Package ID: #{pkg.id}</p>
                        </div>
                    </div>

                    <div className="flex items-center gap-2">
                        <Badge variant="outline" className={getStatusColor(pkg.status)}>
                            {pkg.status.replace('_', ' ').toUpperCase()}
                        </Badge>
                        {pkg.notificationsEnabled ? (
                            <Badge variant="outline" className="gap-1">
                                <Bell className="h-3 w-3" />
                                Notifications On
                            </Badge>
                        ) : (
                            <Badge variant="outline" className="gap-1 opacity-60">
                                <BellOff className="h-3 w-3" />
                                Notifications Off
                            </Badge>
                        )}
                    </div>
                </div>

                <div className="grid gap-6 md:grid-cols-2">
                    {/* Package Information */}
                    <Card>
                        <CardHeader>
                            <CardTitle className="flex items-center gap-2">
                                <Package className="h-5 w-5" />
                                Package Information
                            </CardTitle>
                        </CardHeader>
                        <CardContent className="space-y-4">
                            <div>
                                <label className="text-sm font-medium text-muted-foreground">Description</label>
                                <p className="mt-1">{pkg.description || 'No description provided'}</p>
                            </div>

                            <Separator />

                            <div>
                                <label className="text-sm font-medium text-muted-foreground">Tracking Number</label>
                                <div className="mt-1 flex items-center gap-2">
                                    <code className="rounded bg-muted px-2 py-1 font-mono text-sm">{pkg.trackingNumber}</code>
                                    <Button variant="outline" size="sm" onClick={() => copyToClipboard(pkg.trackingNumber)}>
                                        <Copy className="h-3 w-3" />
                                    </Button>
                                </div>
                            </div>

                            <div>
                                <label className="text-sm font-medium text-muted-foreground">Carrier</label>
                                <p className="mt-1 flex items-center gap-2">
                                    <Truck className="h-4 w-4" />
                                    {pkg.carrierName || `Carrier ID: ${pkg.carrierId}`}
                                </p>
                            </div>
                        </CardContent>
                    </Card>

                    {/* Shipping Information */}
                    <Card>
                        <CardHeader>
                            <CardTitle className="flex items-center gap-2">
                                <MapPin className="h-5 w-5" />
                                Shipping Information
                            </CardTitle>
                        </CardHeader>
                        <CardContent className="space-y-4">
                            <div>
                                <label className="text-sm font-medium text-muted-foreground">Origin</label>
                                <p className="mt-1">{pkg.origin}</p>
                            </div>

                            <div className="flex justify-center">
                                <div className="h-8 w-px bg-border"></div>
                            </div>

                            <div>
                                <label className="text-sm font-medium text-muted-foreground">Destination</label>
                                <p className="mt-1">{pkg.destination}</p>
                            </div>
                        </CardContent>
                    </Card>

                    {/* Timeline Information */}
                    <Card className="md:col-span-2">
                        <CardHeader>
                            <CardTitle className="flex items-center gap-2">
                                <Clock className="h-5 w-5" />
                                Timeline
                            </CardTitle>
                        </CardHeader>
                        <CardContent>
                            <div className="grid gap-4 md:grid-cols-3">
                                {pkg.createdAt && (
                                    <div className="rounded-lg bg-muted/50 p-4 text-center">
                                        <Calendar className="mx-auto mb-2 h-5 w-5 text-muted-foreground" />
                                        <div className="text-sm font-medium">Created</div>
                                        <div className="mt-1 text-xs text-muted-foreground">{formatDate(pkg.createdAt)}</div>
                                    </div>
                                )}

                                <div className="rounded-lg border border-blue-200 bg-blue-50 p-4 text-center">
                                    <Clock className="mx-auto mb-2 h-5 w-5 text-blue-600" />
                                    <div className="text-sm font-medium">Last Updated</div>
                                    <div className="mt-1 text-xs text-muted-foreground">{formatDate(pkg.lastUpdated)}</div>
                                </div>

                                <div className="rounded-lg border border-green-200 bg-green-50 p-4 text-center">
                                    <Calendar className="mx-auto mb-2 h-5 w-5 text-green-600" />
                                    <div className="text-sm font-medium">Estimated Delivery</div>
                                    <div className="mt-1 text-xs text-muted-foreground">{formatDate(pkg.estimatedDelivery)}</div>
                                </div>
                            </div>
                        </CardContent>
                    </Card>
                </div>

                {/* Action Buttons */}
                <div className="flex gap-2 pt-4">
                    <Link href={`/packages/${pkg.id}/edit`}>
                        <Button variant="outline">Edit Package</Button>
                    </Link>
                    <Button variant="outline">{pkg.notificationsEnabled ? 'Disable' : 'Enable'} Notifications</Button>
                    <Button variant="outline">View Tracking History</Button>
                </div>
            </div>
        </AppLayout>
    );
}
