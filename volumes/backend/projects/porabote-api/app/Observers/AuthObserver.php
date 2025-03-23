<?php

namespace app\Observers;

use App\Http\Components\Auth\Authentication as Auth;

class AuthObserver
{
    /**
     * Handle the Auth "created" event.
     *
     * @param  \App\Models\Auth  $auth
     * @return void
     */
    public function creating($model)
    {
        $attrs = $model->getOriginal();
        $fillable = array_flip($model->getFillable());

        //$model->user_id = 0;
       // if (array_key_exists('user_name', $attrs)) $model->user_name = Auth::getUser('name');
        if (array_key_exists('user_id', $fillable)) {
            $model->user_id = Auth::$user->get('id');
        }
        if (array_key_exists('manager_id', $fillable)) {
            $model->manager_id = Auth::$user->get('id');
        }

    }

}
