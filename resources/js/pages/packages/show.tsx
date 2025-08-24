import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Separator } from '@/components/ui/separator';
import AppLayout from '@/layouts/app-layout';
import { type BreadcrumbItem } from '@/types';
import { Head, Link, router } from '@inertiajs/react';
import { ArrowLeft, Bell, BellOff, Calendar, Clock, Copy, ExternalLink, MapPin, Package, Truck } from 'lucide-react';
import { toast } from 'sonner';

export interface PackageEvent {
    id: string | number;
    status: string;
    longStatus: string;
    location?: string;
    destination?: string;
    statusDate: string;
    created_at: string;
    updated_at: string;
}

interface Carrier {
    id: number;
    websiteUrl: string;
    logoUrl: string;
    trackingUrl: string;
    name: string;
    created_at: string;
    updated_at: string;
}

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
        created_at: string;
        updated_at: string;
    };
    events: PackageEvent[];
    carrier: Carrier;
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

const formatDate = (dateString?: string) => {
    if (!dateString) return 'N/A';
    const d = new Date(dateString);
    if (isNaN(d.getTime())) return dateString;
    return d.toLocaleDateString('en-US', {
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
    } catch {
        toast.error('Failed to copy tracking number');
        return;
    }
    toast.success('Tracking number copied to clipboard');
};

const findOrigin = (events: PackageEvent[] = []): string => {
    return [...(events || [])].reverse().find((event) => event?.location != null)?.location || '';
}

const findDestination = (events: PackageEvent[] = []): string => {
    return (events || []).find((event) => event?.location != null)?.location || '';
};

export default function ShowPackage({ package: pkg, events, carrier }: ShowPackageProps) {
    const breadcrumbs: BreadcrumbItem[] = [
        {
            title: 'Dashboard',
            href: '/dashboard',
        },
        {
            title: pkg.name,
            href: `/packages/${pkg.id}`,
        },
    ];

    const handleDelete = () => {
        if (confirm('Are you sure you want to delete this package? This action cannot be undone.')) {
            router.delete(route('packages.destroy', { package: pkg.id }));
        }
    }

    return (
        <AppLayout breadcrumbs={breadcrumbs}>
            <Head title={`Package: ${pkg.name}`} />

            <div className="flex h-full flex-1 flex-col gap-6 overflow-x-hidden rounded-xl p-4 md:p-8">
                {/* Compact header */}
                <div className="flex flex-col items-start justify-between gap-3 sm:flex-row sm:items-center">
                    <div className="flex items-start gap-3">
                        <Link href="/dashboard">
                            <Button variant="outline" size="sm">
                                <ArrowLeft className="mr-2 h-4 w-4" /> Back
                            </Button>
                        </Link>
                        <div>
                            <h1 className="text-xl font-semibold md:text-2xl">{pkg.name}</h1>
                            <p className="text-xs text-muted-foreground">ID #{pkg.id}</p>
                        </div>
                    </div>
                    <div className="flex items-center gap-2">
                        <Badge variant="outline" className={getStatusColor(pkg.status)}>
                            {pkg.status.replace('_', ' ').toUpperCase()}
                        </Badge>
                        {pkg.notificationsEnabled ? (
                            <Badge variant="outline" className="gap-1"><Bell className="h-3 w-3" /> Notifications</Badge>
                        ) : (
                            <Badge variant="outline" className="gap-1 opacity-60"><BellOff className="h-3 w-3" /> Notifications</Badge>
                        )}
                    </div>
                </div>

                <div className="grid gap-6 lg:grid-cols-3">
                    {/* Details */}
                    <Card className="lg:col-span-1 order-1 lg:order-2">
                        <CardHeader>
                            <CardTitle className="flex items-center gap-2">
                                <Package className="h-5 w-5" />
                                Details
                            </CardTitle>
                        </CardHeader>
                        <CardContent className="space-y-5">
                            <div>
                                <div className="text-xs text-muted-foreground">Tracking</div>
                                <div className="mt-1 flex items-center gap-2">
                                    <code className="rounded bg-muted px-2 py-1 font-mono text-sm break-all">{pkg.trackingNumber}</code>
                                    <Button variant="outline" size="sm" onClick={() => copyToClipboard(pkg.trackingNumber)} aria-label="Copy tracking">
                                        <Copy className="h-3 w-3" />
                                    </Button>
                                </div>
                            </div>
                            <div>
                                <div className="text-xs text-muted-foreground">Carrier</div>
                                <div className="mt-1 flex items-center gap-2">
                                    <Truck className="h-4 w-4" /> {carrier.name || `Carrier ID: ${pkg.carrierId}`}
                                    {carrier.websiteUrl && (
                                        <a className="ml-1 inline-flex items-center gap-1 text-xs text-primary hover:underline" href={carrier.websiteUrl} target="_blank" rel="noreferrer">
                                            Website <ExternalLink className="h-3 w-3" />
                                        </a>
                                    )}
                                </div>
                            </div>
                            {pkg.description && (
                                <div>
                                    <div className="text-xs text-muted-foreground">Notes</div>
                                    <p className="mt-1 text-sm">{pkg.description}</p>
                                </div>
                            )}
                            <Separator />
                            <div className="grid grid-cols-2 gap-4">
                                <div>
                                    <div className="text-xs text-muted-foreground">Origin</div>
                                    <div className="mt-1 text-sm">{events.length > 0 ? findOrigin(events) : '—'}</div>
                                </div>
                                <div>
                                    <div className="text-xs text-muted-foreground">Destination</div>
                                    <div className="mt-1 text-sm">{events.length > 0 ? findDestination(events) : '—'}</div>
                                </div>
                            </div>
                            <Separator />
                            <div className="mt-2 flex flex-col gap-2">
                                <Link href={`/packages/${pkg.id}/edit`}>
                                    <Button variant="outline" disabled className="w-full">Edit</Button>
                                </Link>
                                <Button variant="outline" disabled className="w-full">
                                    {pkg.notificationsEnabled ? 'Disable' : 'Enable'} Notifications
                                </Button>
                                <Button variant="outline" onClick={handleDelete} className="w-full">Delete</Button>
                            </div>
                        </CardContent>
                    </Card>

                    {/* Activity timeline */}
                    <Card className="lg:col-span-2 order-2 lg:order-1">
                        <CardHeader>
                            <CardTitle className="flex items-center gap-2"><Clock className="h-5 w-5" /> Activity</CardTitle>
                        </CardHeader>
                        <CardContent>
                            <div className="grid gap-4 md:grid-cols-2">
                                {(() => {
                                    const sorted = [...events].sort((a, b) => new Date(a.statusDate).getTime() - new Date(b.statusDate).getTime());
                                    const hasEvents = sorted.length > 0;
                                    const earliest = hasEvents ? sorted[0] : undefined;
                                    const latest = hasEvents ? sorted[sorted.length - 1] : undefined;
                                    return (
                                        <>
                                            <div className="rounded-lg bg-secondary p-4 text-center">
                                                <Calendar className="mx-auto mb-2 h-5 w-5 text-muted-foreground" />
                                                <div className="text-sm font-medium">Created</div>
                                                <div className="mt-1 text-xs text-muted-foreground">{hasEvents ? formatDate(earliest?.statusDate) : '—'}</div>
                                            </div>
                                            <div className="rounded-lg bg-secondary p-4 text-center">
                                                <Clock className="mx-auto mb-2 h-5 w-5 text-muted-foreground" />
                                                <div className="text-sm font-medium">Last Updated</div>
                                                <div className="mt-1 text-xs text-muted-foreground">{hasEvents ? formatDate(latest?.statusDate) : '—'}</div>
                                            </div>
                                        </>
                                    );
                                })()}
                                
                                {/* <div className="rounded-lg border border-green-200 bg-secondary p-4 text-center">
                                    <Calendar className="mx-auto mb-2 h-5 w-5 text-green-600" />
                                    <div className="text-sm font-medium">Estimated Delivery</div>
                                    <div className="mt-1 text-xs text-muted-foreground">{formatDate(pkg.estimatedDelivery)}</div>
                                </div> */}
                            </div>
                            {/* Vertical timeline */}
                            <div className="mt-6">
                                {events.length === 0 ? (
                                    <div className="text-sm text-muted-foreground">No events yet.</div>
                                ) : (
                                    <ol className="relative border-l border-white/10 pl-4">
                                        {[...events]
                                            .sort((a, b) => new Date(b.statusDate).getTime() - new Date(a.statusDate).getTime())
                                            .map((evt) => (
                                                <li key={evt.id} className="mb-6 ml-2">
                                                    <span className="absolute -left-1.5 mt-1.5 h-3 w-3 rounded-full bg-gradient-to-br from-violet-500 to-indigo-500 ring-2 ring-white/20" />
                                                    <div className="flex flex-wrap items-center gap-x-3 gap-y-1">
                                                        <span className="text-xs text-muted-foreground">{formatDate(evt.statusDate)}</span>
                                                        <Badge variant="outline" className={getStatusColor(evt.status)}>
                                                            {evt.status.replace('_', ' ').toUpperCase()}
                                                        </Badge>
                                                        <span className="text-xs text-muted-foreground">{evt.location || '—'}</span>
                                                    </div>
                                    <div className="mt-1 text-sm break-words">{evt.longStatus || 'No description'}</div>
                                                </li>
                                            ))}
                                    </ol>
                                )}
                            </div>
                        </CardContent>
                    </Card>
                </div>

                
            </div>
        </AppLayout>
    );
}
