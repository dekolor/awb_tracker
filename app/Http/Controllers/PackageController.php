<?php

namespace App\Http\Controllers;

use App\Http\Requests\StorePackageRequest;
use App\Http\Requests\UpdatePackageRequest;
use App\Models\Carrier;
use App\Models\Package;
use Inertia\Inertia;

class PackageController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index()
    {
        //
    }

    /**
     * Show the form for creating a new resource.
     */
    public function create()
    {
        $carriers = Carrier::all();

        return Inertia::render('packages/create', [
            'carriers' => $carriers
        ]);
    }

    /**
     * Store a newly created resource in storage.
     */
    public function store(StorePackageRequest $request)
    {

        $data = $request->validated();

        Package::create($data);

        return to_route('dashboard')->with('success', 'Package created successfully.');

    }

    /**
     * Display the specified resource.
     */
    public function show(Package $package)
    {
        return Inertia::render('packages/show', [
            'package' => $package,
            'events' => $package->events,
            'carrier' => $package->carrier,
        ]);
    }

    /**
     * Show the form for editing the specified resource.
     */
    public function edit(Package $package)
    {
        //
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(UpdatePackageRequest $request, Package $package)
    {
        //
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(Package $package)
    {
        $package->delete();

        return to_route('dashboard')->with('success', 'Package deleted successfully.');
    }
}
