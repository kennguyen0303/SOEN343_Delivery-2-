package com.soen343.backend.model;

import java.util.UUID;

public class Guest extends User {

    public Guest(UUID id, String roleType)
    {
        new User(id, roleType);
    }
}
