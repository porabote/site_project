<?php

namespace app\Http\Controllers;

use App\Models\AclAco;
use App\Models\AclAro;
use App\Models\AclPermission;

class PermissionsController {

    public static function _createAro($foreignKey, $model = 'App\Models\Users', $parentId = null, $label = 'User')
    {
        return AclAro::create([
            'parent_id' => $parentId,
            'label' => $label,
            'foreign_key' => $foreignKey,
            'model' => $model,
        ]);
    }

    public static function _createAco($foreignKey, $model, $link = null) : AclAco
    {
        return AclAco::create([
            'foreign_key' => $foreignKey,
            'model' => $model,
            'link' => $link,
        ]);
    }

    public static function _createPermission($aco_id, $aro_id): void
    {
        $permission = AclPermission::get()
            ->where('aco_id', $aco_id)
            ->where('aro_id', $aro_id)
            ->first();

        if (!$permission) {
            AclPermission::create([
                'aco_id' => $aco_id,
                'aro_id' => $aro_id,
                '_create' => 1,
                '_read' => 1,
                '_update' => 1,
                '_delete' => 1,
            ]);
        }
    }

    public static function _deletePermission($aco_id, $aro_id): void
    {
        $permissions = AclPermission::where('aco_id', $aco_id)
            ->where('aro_id', $aro_id)
            ->get();

        foreach ($permissions as $permission) {
            $permission->delete();
        }
    }

}
