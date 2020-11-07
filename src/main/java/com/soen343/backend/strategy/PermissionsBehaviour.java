package com.soen343.backend.strategy;

import com.soen343.backend.model.User;

import java.util.UUID;

/**
 * Abstract Interface for a Strategy for different behaviours of granting others permissions
 */
public interface PermissionsBehaviour {

    void changePermissions(User user, String permission, boolean value);
}
