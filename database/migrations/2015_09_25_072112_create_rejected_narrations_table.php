<?php

use Illuminate\Database\Schema\Blueprint;
use Illuminate\Database\Migrations\Migration;

class CreateRejectedNarrationsTable extends Migration
{
    /**
     * Run the migrations.
     *
     * @return void
     */
    public function up()
    {
        Schema::create('rejected_narrations', function (Blueprint $table) {
            $table->increments('id');
            $table->bigInteger('narration_id')->unsigned();
            $table->string('reason', 1024);
            $table->timestamps();


             $table->foreign('narration_id')
                    ->references('id')->on('narrations')
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
        Schema::drop('rejected_narrations');
    }
}
