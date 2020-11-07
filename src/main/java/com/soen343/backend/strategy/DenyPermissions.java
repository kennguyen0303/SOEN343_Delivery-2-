package com.soen343.backend.strategy;

import com.soen343.backend.model.User;

import java.util.UUID;

/**
 * Concrete strategy for User that are disallowed from changing permissions
 */
public class DenyPermissions implements PermissionsBehaviour {

    /**
     * Method to allow Users to edit permissions of other Users
     */
    public boolean changePermissions(User user, String permission, boolean value)
    {
        // deny access to changing permissions -  do nothing
        return false;
    }
}
