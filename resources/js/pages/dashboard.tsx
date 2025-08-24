import { useMemo, useState } from 'react';
import { Head, Link, router } from '@inertiajs/react';
import { Button } from '@/components/ui/button';
import { cn } from '@/lib/utils';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Input } from '@/components/ui/input';
import AppLayout from '@/layouts/app-layout';
import { type BreadcrumbItem } from '@/types';
import { Package as PackageIcon, Truck, CheckCircle2, MapPin, Clock, Copy, Check, ChevronRight, Search as SearchIcon, RefreshCw } from 'lucide-react';
import { PackageEvent } from './packages/show';
import { DateTime } from 'luxon';

const breadcrumbs: BreadcrumbItem[] = [{ title: 'Dashboard', href: '/dashboard' }];

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
    events: PackageEvent[];
  }[];
}

function statusMeta(statusRaw: string) {
  const s = statusRaw?.toLowerCase() || '';
  if (s.includes('deliver')) {
    return {
      key: 'delivered' as const,
      label: 'Delivered',
      className:
        'bg-emerald-100 text-emerald-800 dark:bg-emerald-500/15 dark:text-emerald-300',
      icon: CheckCircle2,
    };
  }
  if (s.includes('transit') || s.includes('shipped') || s.includes('out')) {
    return {
      key: 'in-transit' as const,
      label: 'In transit',
      className:
        'bg-blue-100 text-blue-800 dark:bg-blue-500/15 dark:text-blue-300',
      icon: Truck,
    };
  }
  return {
    key: 'pending' as const,
    label: 'Pending',
    className:
      'bg-amber-100 text-amber-800 dark:bg-amber-500/15 dark:text-amber-300',
    icon: Clock,
  };
}

export default function Dashboard({ packages }: DashboardProps) {
    const total = packages.length;
    const deliveredCount = packages.filter((p) => /deliver/i.test(p.status)).length;
    const inTransitCount = packages.filter((p) => /(transit|shipped|out)/i.test(p.status)).length;

    const [query, setQuery] = useState('');

    const recentSorted = useMemo(
        () => [...packages].sort((a, b) => (new Date(b.lastUpdated).getTime() || 0) - (new Date(a.lastUpdated).getTime() || 0)),
        [packages]
    );

    const filtered = useMemo(() => {
        const q = query.trim().toLowerCase();
        if (!q) return recentSorted;
        return recentSorted.filter(
            (p) =>
                p.name.toLowerCase().includes(q) ||
                p.trackingNumber?.toLowerCase().includes(q) ||
                p.origin?.toLowerCase().includes(q) ||
                p.destination?.toLowerCase().includes(q)
        );
    }, [recentSorted, query]);

    const lastEventOf = (events: PackageEvent[] = []) => (events && events.length ? events[events.length - 1] : undefined);
    const findOrigin = (events: PackageEvent[] = []) => [...(events || [])].reverse().find((e) => e?.location != null)?.location || '';
    const findDestination = (events: PackageEvent[] = []) => (events || []).find((e) => e?.location != null)?.location || '';
    const formatDate = (date?: string) => {
        if (!date) return 'N/A';
        const dt = DateTime.fromISO(date);
        return dt.isValid ? dt.toLocaleString(DateTime.DATETIME_MED) : date;
    };

    const recentActivity = useMemo(() => {
        return recentSorted
            .map((p) => ({ pkg: p, evt: lastEventOf(p.events) }))
            .filter((x) => x.evt)
            .slice(0, 8);
    }, [recentSorted]);

    return (
        <AppLayout breadcrumbs={breadcrumbs}>
            <Head title="Dashboard" />
            <div className="flex h-full flex-1 flex-col gap-8 overflow-x-hidden p-4 md:p-8">

                {/* Overview */}
                {/* Mobile summary line */}
                <div className="md:hidden text-sm text-muted-foreground">
                    {total} total, {inTransitCount} in transit, {deliveredCount} delivered
                </div>

                <div className="hidden gap-4 md:grid md:grid-cols-3">
                    <OverviewTile title="Total" value={total} icon={PackageIcon} gradient="from-violet-500/30" />
                    <OverviewTile title="In transit" value={inTransitCount} icon={Truck} gradient="from-sky-500/30" />
                    <OverviewTile title="Delivered" value={deliveredCount} icon={CheckCircle2} gradient="from-emerald-500/30" />
                </div>

                {/* Main content */}
                <div className="grid gap-6 lg:grid-cols-3">
                    {/* Packages grid */}
                    <Card className="col-span-2">
                        <CardHeader className="flex items-center justify-between gap-3 sm:flex-row">
                            <CardTitle className="text-lg font-semibold">Your Packages</CardTitle>
                            <div className="flex w-full items-center gap-2 sm:w-auto">
                                <div className="relative w-full sm:w-72">
                                    <SearchIcon className="pointer-events-none absolute left-2 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
                                    <Input className="pl-8" placeholder="Search packages" value={query} onChange={(e) => setQuery(e.target.value)} />
                                </div>
                                <div className="hidden items-center gap-2 sm:flex">
                                    <Button asChild size="sm" className="shadow-md">
                                        <Link href="/packages/create">Add</Link>
                                    </Button>
                                    <Button variant="outline" size="icon" onClick={() => router.reload({ only: ['packages'] })} aria-label="Refresh">
                                        <RefreshCw className="h-4 w-4" />
                                    </Button>
                                </div>
                            </div>
                        </CardHeader>
                        <CardContent>
                            {filtered.length === 0 ? (
                                <EmptyState />
                            ) : (
                                <div className="grid gap-4 sm:grid-cols-2 xl:grid-cols-3">
                                    {filtered.slice(0, 9).map((p) => {
                                        const meta = statusMeta(p.status);
                                        const evt = lastEventOf(p.events);
                                        return (
                                            <div key={p.id} className="relative overflow-hidden rounded-xl p-[1px] bg-gradient-to-br from-white/10 via-white/5 to-transparent">
                                                <div
                                                    role="button"
                                                    onClick={() => router.visit(`/packages/${p.id}`)}
                                                    className="group rounded-xl border border-white/10 bg-card/70 p-4 supports-[backdrop-filter]:backdrop-blur transition-transform hover:scale-[1.01]"
                                                >
                                                    <div className="flex items-start justify-between gap-2">
                                                        <h3 className="truncate text-base font-medium">{p.name}</h3>
                                                        <Badge variant="secondary" className={meta.className}>
                                                            {meta.label}
                                                        </Badge>
                                                    </div>
                                                    <div className="mt-2 flex flex-wrap items-center gap-x-3 gap-y-1 text-sm text-muted-foreground">
                                                        <span className="inline-flex items-center gap-1"><MapPin className="h-4 w-4" />{findOrigin(p.events)} → {findDestination(p.events)}</span>
                                                        {evt?.statusDate && (
                                                            <span className="inline-flex items-center gap-1"><Clock className="h-4 w-4" />{formatDate(evt.statusDate)}</span>
                                                        )}
                                                    </div>
                                                    {p.trackingNumber && (
                                                        <div className="mt-1 flex items-center gap-2 text-xs text-muted-foreground">
                                                            <span className="font-mono">{p.trackingNumber}</span>
                                                            <CopyButton text={p.trackingNumber} />
                                                        </div>
                                                    )}
                                                    <ChevronRight className="absolute right-3 top-3 h-4 w-4 text-muted-foreground opacity-0 transition-opacity group-hover:opacity-100" />
                                                </div>
                                            </div>
                                        );
                                    })}
                                </div>
                            )}
                        </CardContent>
                    </Card>

                    {/* Recent Activity */}
                    <Card>
                        <CardHeader>
                            <CardTitle className="text-lg font-semibold">Recent Activity</CardTitle>
                        </CardHeader>
                        <CardContent>
                            {recentActivity.length === 0 ? (
                                <p className="text-sm text-muted-foreground">No recent events.</p>
                            ) : (
                                <ol className="relative border-l border-white/10 pl-4">
                                    {recentActivity.map(({ pkg: p, evt }) => (
                                        <li key={`${p.id}-${evt!.id}`} className="mb-6 ml-2">
                                            <span className="absolute -left-1.5 mt-1.5 h-3 w-3 rounded-full bg-gradient-to-br from-violet-500 to-indigo-500 ring-2 ring-white/20" />
                                            <div className="flex items-center justify-between gap-2">
                                                <Link href={`/packages/${p.id}`} className="text-sm font-medium hover:underline">
                                                    {p.name}
                                                </Link>
                                                <span className="text-xs text-muted-foreground">{formatDate(evt!.statusDate)}</span>
                                            </div>
                                            <div className="mt-1 text-sm text-muted-foreground">{evt!.longStatus || evt!.status}</div>
                                            {evt!.location && <div className="text-xs text-muted-foreground">{evt!.location}</div>}
                                        </li>
                                    ))}
                                </ol>
                            )}
                        </CardContent>
                    </Card>
                </div>
            </div>
        </AppLayout>
    );
}

function OverviewTile({ title, value, icon: Icon, gradient }: { title: string; value: number | string; icon: React.ElementType; gradient: string }) {
    return (
        <div className="relative overflow-hidden rounded-xl p-[1px] bg-gradient-to-br from-white/10 via-white/5 to-transparent">
            <Card className="relative overflow-hidden">
                <div className={cn('pointer-events-none absolute inset-0 -z-10 bg-gradient-to-br', gradient)} />
                <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                    <CardTitle className="text-sm font-medium text-muted-foreground">{title}</CardTitle>
                    <div className="rounded-md bg-primary/10 p-2 text-primary">
                        <Icon className="h-4 w-4" />
                    </div>
                </CardHeader>
                <CardContent>
                    <div className="text-2xl font-semibold">{value}</div>
                </CardContent>
            </Card>
        </div>
    );
}

function EmptyState() {
    return (
        <div className="flex flex-col items-center justify-center rounded-lg border border-white/10 bg-card/60 p-10 text-center supports-[backdrop-filter]:backdrop-blur">
            <div className="mb-3 rounded-full bg-muted p-3">
                <PackageIcon className="h-6 w-6 text-muted-foreground" />
            </div>
            <h3 className="text-base font-medium">No packages yet</h3>
            <p className="mt-1 text-sm text-muted-foreground">Add your first package to start tracking shipments.</p>
            <Button asChild className="mt-4">
                <Link href="/packages/create">Add package</Link>
            </Button>
        </div>
    );
}

function CopyButton({ text }: { text: string }) {
    const [copied, setCopied] = useState(false);
    return (
        <Button
            type="button"
            variant="ghost"
            size="icon"
            className="h-6 w-6"
            onClick={async (e) => {
                e.stopPropagation();
                try {
                    await navigator.clipboard.writeText(text);
                    setCopied(true);
                    setTimeout(() => setCopied(false), 1200);
                } catch {}
            }}
            title="Copy tracking number"
            aria-label="Copy tracking number"
        >
            {copied ? <Check className="h-4 w-4" /> : <Copy className="h-4 w-4" />}
        </Button>
    );
}
