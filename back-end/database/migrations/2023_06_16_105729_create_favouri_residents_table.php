<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    /**
     * Run the migrations.
     */
    public function up(): void
    {
        Schema::create('favouri_residents', function (Blueprint $table) {
            $table->id();
            $table->unsignedBigInteger('resident_id');
            $table->foreign('resident_id')->references('id')->on('residents')->onDelete('cascade');
            $table->unsignedBigInteger('annonce_id');
            $table->foreign('annonce_id')->references('id')->on('annonces')->onDelete('cascade');
            $table->timestamps();
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('favouri_residents');
    }
};
