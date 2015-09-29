<?php

use Illuminate\Database\Schema\Blueprint;
use Illuminate\Database\Migrations\Migration;

class CreateCsiRequestsTable extends Migration
{
    /**
     * Run the migrations.
     *
     * @return void
     */
    public function up()
    {
        Schema::create('csi_requests', function (Blueprint $table) {
            $table->BigIncrements('id')->unsigned();
            $table->bigInteger('requested_by')->unsigned();
            $table->integer('request_type')->unsigned();
            $table->integer('status_code')->default(-1);
            $table->string('status', 20)->nullable();
            $table->timestamps();

            $table->unique(['requested_by', 'request_type']);

            $table->foreign('requested_by')
                ->references('id')->on('members')
                ->onDelete('CASCADE')
                ->onUpdate('CASCADE');
            $table->foreign('request_type')
                ->references('id')->on('request_types')
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
        Schema::drop('requests');
    }
}
