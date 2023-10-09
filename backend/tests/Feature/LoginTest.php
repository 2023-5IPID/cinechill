<?php

namespace Tests\Feature;

//use Illuminate\Foundation\Testing\RefreshDatabase;
use App\Http\Controllers\AuthController;
use App\models\User;
use Illuminate\Foundation\Testing\WithFaker;
use Illuminate\Support\Facades\Hash;
use Tests\TestCase;

class LoginTest extends TestCase
{
    /** @test */
    public function test_must_enter_email_and_password()
    {
        $response = $this->json('POST', 'api/login');

        $response->assertStatus(422)->assertJsonStructure([
            'message',
            'errors' => [
                'email',
                'password'
            ]
        ]);
    }
    

    /** @test */
    public function test_successful_login()
    {
        $user = User::create([
            'name' => "louis",
            'email' => "louis@gmail.com",
            'password' => Hash::make("Password_1234@"),
        ]);

        $loginData = ['name' => 'louis', 'email' => 'louis@gmail.com', 'password' => 'Password_1234@'];

        $this->json('POST', 'api/login', $loginData)->assertStatus(200)->seeJsonStructure([
            'token'
        ]);
    }
}
