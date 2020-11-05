package com.soen343.backend.strategy;

/**
 * Concrete Strategy for those that can modify permissions of others
 */
public class GrantPermissions implements PermissionsBehaviour {

    public void changePermissions()
    {
        // allow changing permissions
    }
}
