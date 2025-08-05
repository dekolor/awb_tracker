<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration {
    /**
     * Run the migrations.
     */
    public function up(): void
    {
        Schema::create('package_events', function (Blueprint $table) {
            $table->id();
            $table->integer('package_id')->unsigned();
            $table->string('status');
            $table->string('longStatus');
            $table->string('location')->nullable();
            $table->string('destination')->nullable();
            $table->timestamp('statusDate')->nullable();
            $table->timestamps();

            $table->foreign('package_id')->references('id')->on('packages')->onDelete('cascade');
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('package_events');
    }
};
