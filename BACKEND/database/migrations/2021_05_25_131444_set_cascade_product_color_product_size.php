<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

class SetCascadeProductColorProductSize extends Migration
{
    /**
     * Run the migrations.
     *
     * @return void
     */
    public function up()
    {
        Schema::table('products_colors', function (Blueprint $table) {
            $table->dropForeign(['product_id']);

            $table->foreign('product_id')
            ->references('id')->on('products')
            ->onDelete('cascade');
        });

        Schema::table('products_sizes', function (Blueprint $table) {

            $table->dropForeign(['product_id']);
            
            $table->foreign('product_id')
            ->references('id')->on('products')
            ->onDelete('cascade');
        });
    }

    /**
     * Reverse the migrations.
     *
     * @return void
     */
    public function down()
    {
        //
    }
}
