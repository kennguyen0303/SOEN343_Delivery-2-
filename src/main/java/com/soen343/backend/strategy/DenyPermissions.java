package com.soen343.backend.strategy;

/**
 * Concrete strategy for User that are disallowed from changing permissions
 */
public class DenyPermissions implements PermissionsBehaviour {

    /**
     * Method to allow Users to edit permissions of other Users
     */
    public void changePermissions()
    {
        // deny access to changing permissions -  do nothing
    }
}
