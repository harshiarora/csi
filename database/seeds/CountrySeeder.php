<?php

use App\Country;
use Illuminate\Database\Seeder;

class CountrySeeder extends Seeder
{
    /**
     * Run the database seeds.
     *
     * @return void
     */
    public function run()
    {
        DB::table('countries')->delete();

		$json = File::get(storage_path().'/json/countries.json');
		$data = json_decode($json);
		foreach($data as $k => $v){
			if($k == 'RestResponse'){
				foreach($v as $key => $value){
					if($key == 'result'){
						foreach($value as $object){
							Country::create(['alpha2_code' => $object->alpha2_code, 'alpha3_code' => $object->alpha3_code, 'name' => $object->name]);
						}
					}
				}
			}
		}
    }
}
