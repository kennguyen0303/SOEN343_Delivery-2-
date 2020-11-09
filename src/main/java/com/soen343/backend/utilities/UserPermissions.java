package com.soen343.backend.utilities;

import com.fasterxml.jackson.annotation.JsonProperty;

/**
 * Utility class to organize permissions by user
 */
public class UserPermissions {

    // Access to open/close all windows
    @JsonProperty("openAllWindows")
    private  boolean canOpenAllWindows;

    // Access to lock/unlock all doors
    @JsonProperty("lockDoors")
    private boolean canLockDoors;

    // Access to open/close all lights
    @JsonProperty("useAllLights")
    private boolean canUseLights;

    // Access to open/close windows in same room
    @JsonProperty("useRestrictedWindows")
    private boolean canOpenRestrictedWindow;

    // Access to open/close lights in same room
    @JsonProperty("useRestrictedLights")
    private boolean canUseRestrictedLights;

    // Access to set away mode on and off
    @JsonProperty("canSetAwayMode")
    private boolean canSetAwayMode;

    /**
     * Constructor to initialize user permissions to default
     */
    public UserPermissions() {
        canOpenAllWindows = false;
        canLockDoors = false;
        canUseLights = false;
        canOpenRestrictedWindow = false;
        canUseRestrictedLights = false;
        canSetAwayMode = false;
    }

    /**
     * Constructor for specific user permission settings
     * @param canOpenAllWindows
     * @param canLockDoors
     * @param canUseLights
     * @param canOpenRestrictedWindow
     * @param canUseRestrictedLights
     * @param canSetAwayMode
     */
    public UserPermissions(boolean canOpenAllWindows, boolean canLockDoors, boolean canUseLights, boolean canOpenRestrictedWindow, boolean canUseRestrictedLights, boolean canSetAwayMode) {
        this.canOpenAllWindows = canOpenAllWindows;
        this.canLockDoors = canLockDoors;
        this.canUseLights = canUseLights;
        this.canOpenRestrictedWindow = canOpenRestrictedWindow;
        this.canUseRestrictedLights = canUseRestrictedLights;
        this.canSetAwayMode = canSetAwayMode;
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

    public boolean getCanSetAwayMode() {
        return canSetAwayMode;
    }

    public void setCanSetAwayMode(boolean canSetAwayMode) {
        this.canSetAwayMode = canSetAwayMode;
    }

}
