<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Models\annonce;
use App\Models\favouri;

class Annoncce extends Controller
{
    public function selectAnonnce()
    {
        $select  = annonce::all();
        foreach ($select as $row)
        {
            $row->syndic;
        }
        return response()->json($select);
    }

    public function deleteAnonnce($id)
    {
        $delete = annonce::find($id);
        $delete->delete();
        return response()->json(['message' => 'item deleted']);
    }

    public function favouris($id)
    {
        $select = annonce::find($id);
        if($select->favouris == false) {
           $select->favouris = true;
        }
        else {
            $select->favouris = false;
        }
        $select->save();
        return $select;
    }

}
