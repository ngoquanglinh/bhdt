<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

class AddColColorSize extends Migration
{
    /**
     * Run the migrations.
     *
     * @return void
     */
    public function up()
    {
        Schema::table('orders_items', function (Blueprint $table) {
            $table->unsignedBigInteger('color_id');
            $table->unsignedBigInteger('size_id');
            
            $table->foreign('color_id')
                ->references('id')
                ->on('colors');

            $table->foreign('size_id')
                ->references('id')
                ->on('sizes');
        });
    }

    /**
     * Reverse the migrations.
     *
     * @return void
     */
    public function down()
    {
        Schema::table('orders_items', function (Blueprint $table) {
            //
        });
    }
}
