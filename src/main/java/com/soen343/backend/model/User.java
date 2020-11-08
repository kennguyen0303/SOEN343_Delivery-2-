package com.soen343.backend.model;

import com.fasterxml.jackson.annotation.JsonProperty;
import com.soen343.backend.strategy.PermissionsBehaviour;
import com.soen343.backend.utilities.UserPermissions;

import java.util.UUID;
import javax.validation.constraints.NotBlank;

/**
 * Model of a User that has a unique id, a role, a location and a value indicating whether they are currently logged in or not
 */
public class User {

    private String location;

    private final UUID id;

    private boolean isLoggedUser;

    private UserPermissions userPermissions;

    private PermissionsBehaviour permissionsBehaviour;

    @NotBlank
    private final String role;

    /**
     *Constructor for a user in which they start off with no location and not logged in
     * @param id a unique id which is generated for the user
     * @param role a String that qualifies the user's role in the simulation
     */
    public User(@JsonProperty("id") UUID id, @JsonProperty("role") String role, PermissionsBehaviour permissionsBehaviour) {
        this.id = id;
        this.role = role;
        this.isLoggedUser = false;
        this.location = "none";

        this.userPermissions = new UserPermissions();
        setPermissionsBehaviour(permissionsBehaviour);
    }

    /**
     * Returns the role of the current user
     * @return a String representing the user's current role
     */
    public String getRole() {
        return role;
    }

    /**
     * Getter for the logged in status of a user
     * @return a boolean value which is true if logged in and false if not
     */
    public boolean getIsLoggedUser() {
        return isLoggedUser;
    }

    /**
     * Getter for the unique id of a user
     * @return unique UUID of the user
     */
    public UUID getId() {
        return id;
    }

    /**
     * Setter for the logged in status
     * @param isLoggedIn boolean value that is true if the user is being logged in and false if they are being logged out
     */
    public void setLoggedUser(boolean isLoggedIn)
    {
        isLoggedUser = isLoggedIn;
    }

    /**
     * A Setter for the user's location in the simulation
     * @param location A String indicating the user's new location
     */
    public void setLocation(String location){
        this.location = location;
    }

    /**
     * A Getter for the user's location in the simulation
     * @return A String representing the user's location
     */
    public String getLocation() {
        return location;
    }

    /**
     * Set concrete strategy of the permission behaviour
     * @param permissionsBehaviour Concrete strategy according to user role
     */
    public void setPermissionsBehaviour(PermissionsBehaviour permissionsBehaviour)
    {
        this.permissionsBehaviour = permissionsBehaviour;
    }

    /**
     * Getter for structure containing all user permissions
     * @return
     */
    public UserPermissions getUserPermissions() {
        return userPermissions;
    }

    /**
     * Setter for user permissions
     * @param userPermissions
     */
    public void setUserPermissions(UserPermissions userPermissions)
    {
        this.userPermissions = userPermissions;
    }

    /**
     * Method to grant user permissions to other users
     * @param user User to change
     * @param permission String for permission targeted
     * @param value boolean: true if enabled and false if disabled
     * @return true if operation changed a user and false if not allowed
     */
    public boolean grantPermissions(User user, String permission, boolean value)
    {
        return permissionsBehaviour.changePermissions(user, permission, value);
    }
}
