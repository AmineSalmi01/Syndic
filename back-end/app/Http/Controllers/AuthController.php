<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use App\Models\Syndic;
use App\Models\Pay;
use App\Models\Resident;
use Illuminate\Support\Facades\Hash;
use Illuminate\Support\Str;
use Illuminate\Validation\Rules;

class AuthController extends Controller
{
    // public function __construct()
    // {
    //     $this->middleware('syndic')->only(['residentRegister']);
    // }

    public function login(Request $request)
    {
        $syndic = Syndic::where('email', $request->email)->first();

        if($syndic && Hash::check($request->password, $syndic->password)) {

            // return response()->json($syndic);
            // $token = 'syndic-4hg55ml-78@-s-qlab-iis/@@ddd44d';
            // $syndic->api_token = $token;
            // $syndic->save();

            // store the token and syndic in the session
            // session(['token' => $token]);
            // session(['syndic' => $syndic]);

            return response()->json(['syndic'=>$syndic, 'token'=>$syndic->api_token]);

        // return response()->json(['message' => 'Invalide creadantional']);
    }

        elseif($syndic == null){
            $resident = Resident::where('email', $request->email)->first();

            if($resident && Hash::check($request->password, $resident->password)){

                  return response()->json(['RESIDENT'=>$resident, 'token'=>$resident->api_token]);

            }

        }


    // public function register(Request $request)
    // {
    //     $validatedData = $request->validate([

    //         'email' => 'required|email|unique:syndics',
    //         'password' => 'required|min:6',

    //     ]);

    //     $syndic = Syndic::create([
    //         'email' => $validatedData['email'],
    //         'password' => bcrypt($validatedData['password']),
    //     ]);

    //     // $token = $syndic->createToken('AuthToken')->accessToken;
    //     // return response()->json(['token' => $token]);
    //     return response()->json('done');
    }

    public function residentRegister(Request $request)
    {
        // if(!$request->user() instanceof Syndic){
        //     return response()->json(['message'=> 'Unauthorized'], 401);
        // }
        if($request->syndicCredentioal == 'mohsin@gmail.com'){

            $validatedData = $request->validate([
                'firstName' => 'required',
                'lastName'=> 'required',
                'tele'=>'required',
                'email' => 'required|email|unique:residents',
                'password' => 'required|min:6',
                'image'=>'required'
            ]);

            $token = Str::random(80);

            $resident = new Resident();
            $resident->firstName=$validatedData['firstName'];
            $resident->lastName=$validatedData['lastName'];
            $resident->email=$validatedData['email'];
            $resident->password=bcrypt($validatedData['password']);
            $resident->tele=$validatedData['tele'];
            $resident->image=$validatedData['image'];
            $resident->api_token=$token;
            $resident->save();
            // $resident->payment()->associate(1, ['syndic_id' => 2]);


            // $payemnt = new Pay();
            // $payemnt->syndic()->attach('2');
            // $payemnt->resident()->attach('1');
            // $payemnt->save();
            return response()->json('regester succsessfuly');

        }

        // $resident->firstName = $request->firstName;
        // $resident->lastName = $request->lastName;
        // $resident->email = $request->email;
        // $resident->password = Hash::make($request->password);
        // $resident->image = $request->image;
        // $resident->tele = $request->tele;
        // $resident->save();

        // $loginCredentials = [
        //     'email' => $validatedData['email'],
        //     'password' => $validatedData['password'],
        // ];


            return response()->json('regester failed');
    }

    public function getSyndic($id)
    {
        $syndic = Syndic::find($id);
        return response()->json($syndic);
    }

}
