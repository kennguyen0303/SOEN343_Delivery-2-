package com.soen343.backend.model;

import com.soen343.backend.strategy.GrantPermissions;
import com.soen343.backend.utilities.UserPermissions;

import java.util.UUID;

public class Parent extends User {

    public Parent(UUID id, String roleType)
    {
        super(id, roleType, new GrantPermissions());

        UserPermissions userPermissions = new UserPermissions(true, true, true, true, true, true);
        setUserPermissions(userPermissions);
    }
}
