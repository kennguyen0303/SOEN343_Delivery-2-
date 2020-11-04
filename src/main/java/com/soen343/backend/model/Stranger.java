package com.soen343.backend.model;

import java.util.UUID;

public class Stranger extends User {

    public Stranger(UUID id, String roleType)
    {
        new User(id, roleType);
    }
}
