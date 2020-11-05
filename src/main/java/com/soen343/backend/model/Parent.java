package com.soen343.backend.model;

import com.soen343.backend.strategy.GrantPermissions;

import java.util.UUID;

public class Parent extends User {

    public Parent(UUID id, String roleType)
    {
        new User(id, roleType, new GrantPermissions());
    }
}
