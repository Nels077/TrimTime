<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    public function up(): void
    {
        Schema::create('barbers', function (Blueprint $table) {
            $table->id();
            $table->unsignedBigInteger('barbershop_id');
            $table->foreign('barbershop_id')->references('id')->on('barbershops')->onDelete('cascade');
            $table->string('name', 255);
            $table->string('from_to', 255)->nullable();
            $table->string('avatar')->default('/defaultLogo/defaultLogo.png');
            $table->timestamps();
        });
    }

    public function down(): void
    {
        Schema::dropIfExists('barbers');
    }
};
