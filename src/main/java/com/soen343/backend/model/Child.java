package com.soen343.backend.model;

import com.soen343.backend.strategy.DenyPermissions;
import com.soen343.backend.utilities.UserPermissions;

import java.util.UUID;

public class Child extends User{

    public Child(UUID id, String roleType) {
        super(id, roleType, new DenyPermissions());

        UserPermissions userPermissions = new UserPermissions(false, false, false, true, true, false);
        setUserPermissions(userPermissions);
    }
}
