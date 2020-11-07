package com.soen343.backend.utilities;

/**
 * Utility class to organize permissions by user
 */
public class UserPermissions {

    // Access to open/close all windows
    private  boolean canOpenAllWindows;

    // Access to lock/unlock all doors
    private boolean canLockDoors;

    // Access to open/close all lights
    private boolean canUseLights;

    // Access to open/close windows in same room
    private boolean canOpenRestrictedWindow;

    // // Access to open/close lights in same room
    private boolean canUseRestrictedLights;

    /**
     * Constructor to initialize user permissions to default
     */
    public UserPermissions() {
        canOpenAllWindows = false;
        canLockDoors = false;
        canUseLights = false;
        canOpenRestrictedWindow = false;
        canUseRestrictedLights = false;
    }

    /**
     * Getter for all window permissions
     * @return boolean if user has access to open/close all windows
     */
    public boolean getCanOpenAllWindows() {
        return canOpenAllWindows;
    }

    /**
     * Setter for all window permissions
     * @param canOpenAllWindows boolean if user has access to open/close all windows
     */
    public void setCanOpenAllWindows(boolean canOpenAllWindows) {
        this.canOpenAllWindows = canOpenAllWindows;
    }

    /**
     * Getter for all door permissions
     * @return boolean if user has access to open/close all doors
     */
    public boolean getCanLockDoors() {
        return canLockDoors;
    }

    /**
     * Setter for all door permissions
     * @param canLockDoors boolean if user has access to open/close all doors
     */
    public void setCanLockDoors(boolean canLockDoors) {
        this.canLockDoors = canLockDoors;
    }

    /**
     * Getter for all light permissions
     * @return boolean if user has access to open/close all lights
     */
    public boolean getCanUseLights() {
        return canUseLights;
    }

    /**
     * Setter for all light permissions
     * @param canUseLights boolean if user has access to open/close all lights
     */
    public void setCanUseLights(boolean canUseLights) {
        this.canUseLights = canUseLights;
    }

    /**
     * Getter for restricted windows permissions
     * @return boolean if user has access to open/close windows in same room
     */
    public boolean getCanOpenRestrictedWindow() {
        return canOpenRestrictedWindow;
    }

    /**
     * Setter for restricted windows permissions
     * @param canOpenRestrictedWindow boolean if user has access to open/close windows in same room
     */
    public void setCanOpenRestrictedWindow(boolean canOpenRestrictedWindow) {
        this.canOpenRestrictedWindow = canOpenRestrictedWindow;
    }

    /**
     * Getter for restricted lights permissions
     * @return boolean if user has access to open/close lights in same room
     */
    public boolean getCanUseRestrictedLights() {
        return canUseRestrictedLights;
    }

    /**
     * Getter for restricted windows permissions
     * @param canUseRestrictedLights boolean if user has access to open/close lights in same room
     */
    public void setCanUseRestrictedLights(boolean canUseRestrictedLights) {
        this.canUseRestrictedLights = canUseRestrictedLights;
    }

}
