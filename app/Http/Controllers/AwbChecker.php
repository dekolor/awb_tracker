<?php

namespace App\Http\Controllers;

use App\Helpers\AwbHelper;
use App\Models\Awb;
use Illuminate\Database\Eloquent\ModelNotFoundException;

class AwbChecker extends Controller
{
    public static function check(Awb $awb)
    {
        AwbHelper::check($awb);
    }

    public static function checkAll()
    {
        AwbHelper::checkAll();
    }
}
