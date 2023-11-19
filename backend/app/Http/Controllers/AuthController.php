<?php

namespace App\Http\Controllers;

use App\Http\Requests\LoginRequest;
use App\Http\Requests\RegisterRequest;
use App\Models\User;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Hash;
use Illuminate\Support\Facades\Cookie;
use Illuminate\Support\Facades\Auth;

class AuthController extends Controller
{
    public function register(RegisterRequest $request) {

        $data = $request->validated();

        $user = User::create([
            'name' => $data['name'],
            'email' => $data['email'],
            'password' => Hash::make($data['password']),
        ]);

        $token = $user->createToken('auth_token')->plainTextToken;

        $cookie = cookie('token', $token, 60 * 24); // 1 day

        return response()->json([
            'user' => new UserResource($user),
        ])->withCookie($cookie);
    }

    // login a user method
    public function login(LoginRequest $request) {
        $data = $request->validated();

        if (Auth::attempt($data)) {
            session()->regenerate();
            return response()->json([
                "message" => "User successfully connected",
                "user" => Auth::user()
            ], 200);
            //return $this->sendResponse(\Illuminate\Support\Facades\Auth::user(), 'User successfully connected');
        }
        else {
            return response()->json([
                "message" => "Authentication failure"
            ], 401);
            //return $this->sendError('Authentication failure');
        }
    }

    // logout a user method
    public function logout(Request $request) {
        try {
            auth('web')->logout();
            return response()->json(['message' => 'User successfully disconnected'], 204);
        } catch (\Exception $e) {
            // Handle any exceptions that might occur during logout.
            return response()->json(['message' => 'Error logging out'], 500); // Use an appropriate HTTP status code.
        } 

        return response()->json(['message' => 'test']);
    }
}
