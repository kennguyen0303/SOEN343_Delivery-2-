package com.soen343.backend.model;

import java.util.UUID;

public class Parent extends User {

    public Parent(UUID id, String roleType)
    {
        new User(id, roleType);
    }
}
