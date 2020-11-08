package com.soen343.backend.model;

import com.soen343.backend.strategy.DenyPermissions;
import com.soen343.backend.utilities.UserPermissions;

import java.util.UUID;

public class Guest extends User {

    public Guest(UUID id, String roleType)
    {
        super(id, roleType, new DenyPermissions());

        UserPermissions userPermissions = new UserPermissions(false, false, false, true, true, false);
        setUserPermissions(userPermissions);
    }
}
