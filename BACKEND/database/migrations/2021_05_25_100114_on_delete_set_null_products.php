<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

class OnDeleteSetNullProducts extends Migration
{
    /**
     * Run the migrations.
     *
     * @return void
     */
    public function up()
    {
        // Schema::table('products', function (Blueprint $table) {
        //     $table->integer('foreign_id')->unsigned()->nullable();
        // });

        // Schema::table('images', function (Blueprint $table) {
        //     $table->integer('images_product_id_foreign')->unsigned()->nullable();
        // });
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
