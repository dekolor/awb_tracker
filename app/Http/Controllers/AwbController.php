<?php

namespace App\Http\Controllers;

use App\Models\Awb;
use App\Models\Carrier;
use Illuminate\Http\Request;

class AwbController extends Controller
{
    public function index(Request $request)
    {
        return view('dashboard', [
            'awbs' => Awb::with('carrier')
                ->where('user_id', $request->user()->id)
                ->latest()
                ->paginate(6)
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
        request()->validate([
            'awb_number' => 'required|unique:awbs',
            'carrier' => 'required',
            'tag' => 'required|max:255'
        ]);

        $awb = Awb::create([
            'user_id' => request()->user()->id,
            'awb_number' => request('awb_number'),
            'carrier_id' => request('carrier'),
            'tag' => request('tag'),
            'has_email_notifications' => (bool)request('notifications_mail_address'),
            'has_discord_notifications' => (bool)request('notifications_discord_webhook'),
            'notifications_mail_address' => request('notifications_mail_address'),
            'notifications_discord_webhook' => request('notifications_discord_webhook')
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
