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
        Schema::create('awb_steps', function (Blueprint $table) {
            $table->id();
            $table->foreignId('awb_id')->constrained()->cascadeOnDelete();
            $table->string('county');
            $table->string('country');
            $table->string('status_long');
            $table->string('status_code');
            $table->string('status_short');
            $table->string('status_state_code');
            $table->string('transit_location');
            $table->dateTime('status_date');
            $table->timestamps();
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('awb_steps');
    }
};
