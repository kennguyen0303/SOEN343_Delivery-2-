package com.soen343.backend.model;

import com.soen343.backend.strategy.DenyPermissions;

import java.util.UUID;

public class Guest extends User {

    public Guest(UUID id, String roleType)
    {
        super(id, roleType, new DenyPermissions());
    }
}
