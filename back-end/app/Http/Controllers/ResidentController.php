<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Models\Resident;
use App\Models\Pay;
use App\Models\Syndic;


class ResidentController extends Controller
{
    public function selectResdent(Request $request)
    {
        $date =date('Y-m');
        $allResidents = Pay::whereRaw("DATE_FORMAT(created_at, '%Y-%m') = '{$date}' AND syndic_id = {$request->syndicID}")->get();
        foreach ($allResidents as $resident)
        {
            $resident->resident;
        }
        return response()->json($allResidents);
    }

    public function residentProfile($id)
    {
        $resident = Resident::find($id);

        if(!$resident){
            return response()->json(['message' => 'resident not found']);
        }
        $resident->payment;

        return response()->json($resident);
    }
}
