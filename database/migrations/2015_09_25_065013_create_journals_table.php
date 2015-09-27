<?php

use Illuminate\Database\Schema\Blueprint;
use Illuminate\Database\Migrations\Migration;

class CreateJournalsTable extends Migration
{
    /**
     * Run the migrations.
     *
     * @return void
     */
    public function up()
    {
        Schema::create('journals', function (Blueprint $table) {
            $table->increments('id')->unsigned();
            $table->bigInteger('payment_id')->unsigned();
            $table->bigInteger('narration_id')->unsigned();
            $table->timestamps();

            $table->foreign('payment_id')
                    ->references('id')->on('payments')
                    ->onDelete('CASCADE')
                    ->onUpdate('CASCADE');
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
        Schema::drop('journals');
    }
}
