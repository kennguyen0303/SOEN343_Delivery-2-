package com.soen343.backend.strategy;

import java.util.UUID;

/**
 * Abstract Interface for a Strategy for different behaviours of granting others permissions
 */
public interface PermissionsBehaviour {

    void changePermissions(UUID id);
}
