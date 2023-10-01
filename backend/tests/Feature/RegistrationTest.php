<?php

namespace Tests\Feature;

use Illuminate\Foundation\Testing\RefreshDatabase;
use Illuminate\Foundation\Testing\DatabaseMigrations;
use Illuminate\Foundation\Testing\WithFaker;
use Tests\TestCase;

class RegistrationTest extends TestCase
{
    use WithFaker, DatabaseMigrations, RefreshDatabase;
    /** @test */
    public function it_allows_user_to_register()
    {
        $postData = [
            'email' => $this->faker->email,
            'name' => $this->faker->name(),
            'password' => "Password_1234@",
            'password_confirmation' => "Password_1234@"
        ];
        $response =$this->json('POST', 'api/register', $postData, ['Accept' => 'application/json']);

        $response->assertStatus(200)->assertJsonStructure([
            'user' => [
                'id',
                'name',
                'email',
                'created_at',
                'updated_at'
            ]
        ]);
    }

    /** @test */
    public function it_demands_password_confirmation()
    {
        $postData = [
            'email' => $this->faker->email,
            'name' => $this->faker->name(),
            'password' => "Password_1234@"
        ];
        $response =$this->json('POST', 'api/register', $postData, ['Accept' => 'application/json']);

        $response->assertStatus(422)->assertJsonStructure([
            'message',
            'errors' => [
                'password'
            ]
        ]);
    }

    /** @test */
    public function it_demands_name_field_required()
    {
        $postData = [
            'email' => $this->faker->email,
            'name' => "",
            'password' => "Password_1234@",
            'password_confirmation' => "Password_1234@"
        ];
        $response =$this->json('POST', 'api/register', $postData, ['Accept' => 'application/json']);

        $response->assertStatus(422)->assertJsonStructure([
            'message',
            'errors' => [
                'name'
            ]
        ]);
    }

    /** @test */
    public function it_demands_email_field_required()
    {
        $postData = [
            'email' => "",
            'name' => $this->faker->name(),
            'password' => "Password_1234@",
            'password_confirmation' => "Password_1234@"
        ];
        $response =$this->json('POST', 'api/register', $postData, ['Accept' => 'application/json']);

        $response->assertStatus(422)->assertJsonStructure([
            'message',
            'errors' => [
                'email'
            ]
        ]);
    }

    /** @test */
    public function it_demands_password_field_required()
    {
        $postData = [
            'email' => $this->faker->email,
            'name' => $this->faker->name(),
            'password' => ""
        ];
        $response =$this->json('POST', 'api/register', $postData, ['Accept' => 'application/json']);

        $response->assertStatus(422)->assertJsonStructure([
            'message',
            'errors' => [
                'password'
            ]
        ]);
    }
}
