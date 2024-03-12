<?php

namespace App\Http\Controllers;

use App\Models\Awb;
use Illuminate\Http\Request;

class AwbController extends Controller
{
    public function index()
    {
        return view('dashboard', [
            'awbs' => Awb::all()
        ]);
    }

    public function show(Awb $awb)
    {
        return view('awb.show', [
            'awb' => $awb
        ]);
    }
}
