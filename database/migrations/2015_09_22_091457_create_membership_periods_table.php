<?php

use Illuminate\Database\Schema\Blueprint;
use Illuminate\Database\Migrations\Migration;

class CreateMembershipPeriodsTable extends Migration
{
    /**
     * Run the migrations.
     *
     * @return void
     */
    public function up()
    {
        Schema::create('membership_periods', function (Blueprint $table) {
            $table->engine = 'InnoDB';

            $table->increments('id')->unsigned();
            $table->integer('membership_type_id')->unsigned();
            $table->integer('service_id')->unsigned();
            $table->integer('years')->unsigned();
            $table->string('name', 20);
            $table->softDeletes();
            $table->timestamps();

            $table->foreign('membership_type_id')
                    ->references('id')->on('membership_types')
                    ->onDelete('CASCADE')
                    ->onUpdate('CASCADE');
            $table->foreign('service_id')
                    ->references('id')->on('services')
                    ->onDelete('CASCADE')
                    ->onUpdate('CASCADE');
        });
    }

    /**
     * Reverse the migrations.
     *
     * @return void
     */
    public function down()
    {
        Schema::drop('membership_periods');
    }
}
