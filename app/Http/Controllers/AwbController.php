<?php

namespace App\Http\Controllers;

use App\Models\Awb;
use App\Models\Carrier;
use Illuminate\Http\Request;

class AwbController extends Controller
{
    public function index()
    {
        return view('dashboard', [
            'awbs' => Awb::latest()->paginate(6)
        ]);
    }

    public function show(Awb $awb)
    {
        return view('awb.show', [
            'awb' => $awb
        ]);
    }

    public function create()
    {
        return view('awb.create', [
            'carriers' => Carrier::all()
        ]);
    }

    public function store()
    {
        Awb::create([
            'awb_number' => request('awb_number'),
            'carrier_id' => request('carrier'),
            'tag' => request('tag')
        ]);

        return redirect('/')->with('success', 'AWB Added');
    }
}
