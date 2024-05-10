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
        Schema::create('awbs', function (Blueprint $table) {
            $table->id();
            $table->string('user_id');
            $table->string('awb_number');
            $table->string('carrier_id');
            $table->string('tag');
            $table->boolean('has_email_notifications')->default(false);
            $table->boolean('has_discord_notifications')->default(false);
            $table->string('notifications_mail_address')->nullable();
            $table->string('notifications_discord_webhook')->nullable();
            $table->timestamps();
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('awbs');
    }
};
