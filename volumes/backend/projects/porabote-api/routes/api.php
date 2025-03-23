<?php

use App\Http\Controllers\AuthController;
use Illuminate\Support\Facades\Route;
use App\Http\Components\Rest\Router;
use \App\Http\Controllers\FilesController;
use App\Http\Middleware\AuthPrb;

Route::match(['GET','POST'], '/auth/{action}', function ($action) {
    return AuthController::{$action}();
});

Route::middleware([AuthPrb::class])->group(function () {

    Route::match(['GET', 'POST'],'/{controller}/get/', [Router::class, 'get']);
    Route::match(['GET', 'POST'],'/{controller}/get/{id?}', [Router::class, 'get']);
    Route::match(['GET', 'POST'], '/{controller}/action/{method}', [Router::class, 'callCustomAction']);
//    Route::post('/{controller}/create/', [Router::class, 'create']);
    Route::post('/{controller}/update/{id?}', [Router::class, 'update']);
//    Route::get('/{controller}/delete/{id}', [Router::class, 'delete']);
//    Route::match(['GET', 'POST'], '/{controller}/{id}/relationships/{related_model}', [Router::class, 'getRelationships']);

 //   Route::get('/files/get/{any?}', [FilesController::class, 'get'])->where('any', '.*');
    //Route::post('/files/upload/', [App\Http\Components\Uploader\Uploader::class, 'upload']);

});

