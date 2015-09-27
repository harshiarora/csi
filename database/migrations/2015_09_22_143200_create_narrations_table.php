<?php

use Illuminate\Database\Schema\Blueprint;
use Illuminate\Database\Migrations\Migration;

class CreateNarrationsTable extends Migration
{
    /**
     * Run the migrations.
     *
     * @return void
     */
    public function up()
    {
        Schema::create('narrations', function (Blueprint $table) {
            $table->engine = 'InnoDB';

            $table->bigIncrements('id')->unsigned();
            $table->bigInteger('payer_id')->unsigned()->nullable();
            $table->integer('mode')->unsigned()->nullable();
            $table->string('transaction_number', 30)->nullable();
            $table->string('bank', 30);
            $table->string('branch', 30);
            $table->date('date_of_payment');
            $table->double('drafted_amount', 15, 2);
            $table->double('paid_amount', 15, 2);
            $table->string('proof', 30);
            $table->tinyInteger('is_rejected')->default(0);
            $table->timestamps();


            $table->foreign('payer_id')
                    ->references('id')->on('members')
                    ->onDelete('CASCADE')
                    ->onUpdate('CASCADE');
            $table->foreign('mode')
                    ->references('id')->on('payment_modes')
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
        Schema::drop('narrations');
    }
}
