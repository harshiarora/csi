<?php

use App\RequestType;
use Illuminate\Database\Seeder;

class RequestTypeSeeder extends Seeder
{
    /**
     * Run the database seeds.
     *
     * @return void
     */
    public function run()
    {
        DB::table('request_types')->delete();

        $data = [
            ['type' => 'membership'],
            ['type' => 'student branch']
        ];

        foreach ($data as $value) {
            RequestType::create($value);
        }
    }
}
