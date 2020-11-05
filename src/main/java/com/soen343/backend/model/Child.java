package com.soen343.backend.model;

import com.soen343.backend.strategy.DenyPermissions;

import java.util.UUID;

public class Child extends User{

    public Child(UUID id, String roleType)
    {
        new User(id, roleType, new DenyPermissions());
    }
}
