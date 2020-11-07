package com.soen343.backend.strategy;

import com.soen343.backend.model.User;
import com.soen343.backend.utilities.UserPermissions;

/**
 * Concrete Strategy for those that can modify permissions of others
 */
public class GrantPermissions implements PermissionsBehaviour {

    /**
     *
     * @param user user that needs permissions changed
     * @param permission String representing the permission to change
     * @param value boolean: true if enabled and false if disabled
     * @return true to show that settings were modified
     */
    public boolean changePermissions(User user, String permission, boolean value)
    {
       UserPermissions userPermissions =  user.getUserPermissions();

        if(permission.equalsIgnoreCase("openAllWindows")) {
            userPermissions.setCanOpenAllWindows(value);
        }
        else if(permission.equalsIgnoreCase("lockDoors")) {
            userPermissions.setCanLockDoors(value);
        }
        else if(permission.equalsIgnoreCase("useAllLights")) {
            userPermissions.setCanUseLights(value);
        }
        else if(permission.equalsIgnoreCase("restrictedWindows")){
            userPermissions.setCanOpenRestrictedWindow(value);
        }
        else if(permission.equalsIgnoreCase("restrictedLights")){
            userPermissions.setCanUseRestrictedLights(value);
        }
        return true;
    }
}
