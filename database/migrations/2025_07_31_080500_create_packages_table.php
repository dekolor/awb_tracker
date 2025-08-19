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
        Schema::create('packages', function (Blueprint $table) {
            $table->uuid('id')->primary();
            $table->string('name');
            $table->string('description')->nullable();
            $table->boolean('notificationsEnabled')->default(false);
            $table->string('trackingNumber');
            $table->integer('carrierId');
            $table->string('origin')->nullable();
            $table->string('destination')->nullable();
            $table->string('estimatedDelivery')->nullable();
            $table->integer('ownerId');
            $table->string('status')->default('pending');
            $table->timestamps();
        });

        Schema::create('packageEvents', function (Blueprint $table) {
            $table->id();
            $table->foreignId('package_id')->constrained('packages')->onDelete('cascade');
            $table->string('status');
            $table->string('longStatus');
            $table->string('location');
            $table->string('event_type');
            $table->timestamp('event_time');
            $table->text('details')->nullable();
            $table->timestamps();
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('packages');
        Schema::dropIfExists('packageEvents');
    }
};
