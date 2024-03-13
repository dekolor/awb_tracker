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
            'awbs' => Awb::with('carrier')->latest()->paginate(6)
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
        $awb = Awb::create([
            'awb_number' => request('awb_number'),
            'carrier_id' => request('carrier'),
            'tag' => request('tag')
        ]);

        (new AwbChecker)->check($awb);

        return redirect('/')->with('success', 'AWB Added');
    }

    public function delete(Awb $awb)
    {
        Awb::where('awb_number', $awb->awb_number)->delete();
        return redirect('/')->with('success', 'AWB Deleted');
    }
}
