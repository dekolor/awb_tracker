import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Textarea } from '@/components/ui/textarea';
import AppLayout from '@/layouts/app-layout';
import { type BreadcrumbItem } from '@/types';
import { Head, Link, useForm } from '@inertiajs/react';

const breadcrumbs: BreadcrumbItem[] = [
    {
        title: 'Create Package',
        href: '/packages/create',
    },
];

interface CreatePackageProps {
    carriers: Array<{
        id: number;
        name: string;
    }>;
}

export default function CreatePackage({ carriers }: CreatePackageProps) {
    const { data, setData, post, processing, errors } = useForm({
        name: '',
        trackingNumber: '',
        carrierId: '',
        description: '',
    });

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        post('/packages');
    };

    return (
        <AppLayout breadcrumbs={breadcrumbs}>
            <Head title="Create Package" />
            <div className="flex h-full flex-1 flex-col gap-6 overflow-x-auto rounded-xl p-4 md:p-8">
                <div className="mx-auto w-full max-w-3xl">
                    <div className="mb-4 rounded-xl border border-white/10 bg-gradient-to-br from-violet-600/10 via-indigo-600/10 to-cyan-500/10 p-5">
                        <h2 className="bg-gradient-to-r from-violet-300 to-cyan-200 bg-clip-text text-xl font-semibold text-transparent">Create a New Package</h2>
                        <p className="mt-1 text-sm text-slate-300">Provide your package details. You can paste a tracking number and select a carrier.</p>
                    </div>
                    <Card>
                        <CardHeader>
                            <CardTitle>Add New Package</CardTitle>
                            <CardDescription>Enter the tracking information for your package.</CardDescription>
                        </CardHeader>
                        <CardContent>
                            <form onSubmit={handleSubmit} className="space-y-6">
                                <div className="grid gap-6 md:grid-cols-2">
                                    <div className="space-y-2">
                                        <Label htmlFor="name">Package Name</Label>
                                        <Input id="name" placeholder="e.g., Nike shoes" value={data.name} onChange={(e) => setData('name', e.target.value)} />
                                        {errors.name && <p className="text-sm text-red-400">{errors.name}</p>}
                                    </div>

                                    <div className="space-y-2">
                                        <Label htmlFor="awb">Tracking Number (AWB)</Label>
                                        <Input
                                            id="awb"
                                            placeholder="e.g., 1234567890"
                                            value={data.trackingNumber}
                                            onChange={(e) => setData('trackingNumber', e.target.value)}
                                        />
                                        <p className="text-xs text-muted-foreground">Paste from carrier site or confirmation email.</p>
                                        {errors.trackingNumber && <p className="text-sm text-red-400">{errors.trackingNumber}</p>}
                                    </div>
                                </div>

                                <div className="space-y-2">
                                    <Label htmlFor="carrier">Carrier</Label>
                                    <Select onValueChange={(value) => setData('carrierId', value)}>
                                        <SelectTrigger>
                                            <SelectValue placeholder="Select carrier" />
                                        </SelectTrigger>
                                        <SelectContent>
                                            {carriers.map((carrier) => (
                                                <SelectItem key={carrier.id} value={carrier.id.toString()}>
                                                    {carrier.name}
                                                </SelectItem>
                                            ))}
                                        </SelectContent>
                                    </Select>
                                    {errors.carrierId && <p className="text-sm text-red-400">{errors.carrierId}</p>}
                                </div>

                                <div className="space-y-2">
                                    <Label htmlFor="notes">Additional Notes (Optional)</Label>
                                    <Textarea
                                        id="notes"
                                        placeholder="Any additional information about this package"
                                        value={data.description}
                                        onChange={(e) => setData('description', e.target.value)}
                                    />
                                    {errors.description && <p className="text-sm text-red-400">{errors.description}</p>}
                                </div>

                                <div className="flex gap-4">
                                    <Button type="submit" disabled={processing} className="flex-1">
                                        {processing ? 'Adding Package...' : 'Add Package'}
                                    </Button>
                                    <Link href="/dashboard" className="flex-1">
                                        <Button type="button" variant="outline" className="w-full">
                                            Cancel
                                        </Button>
                                    </Link>
                                </div>
                            </form>
                        </CardContent>
                    </Card>
                </div>
            </div>
        </AppLayout>
    );
}
