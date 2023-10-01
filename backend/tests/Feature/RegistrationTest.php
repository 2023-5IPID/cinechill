<?php

namespace Tests\Feature;

use Illuminate\Foundation\Testing\RefreshDatabase;
use Illuminate\Foundation\Testing\WithFaker;
use App\Models\User;
use App\Http\Controllers\AuthController;
use Tests\TestCase;

class RegistrationTest extends TestCase
{
    use WithFaker, RefreshDatabase;
    /** @test */
    public function it_allows_user_to_register()
    {
        $postData = [
            'email' => $this->faker->email,
            'name' => $this->faker->name(),
            'password' => "Password_1234@"
        ];
        $response =$this->json('POST', 'api/register', $postData, ['Accept' => 'application/json']);

        $response->assertStatus(200);
    }
}
