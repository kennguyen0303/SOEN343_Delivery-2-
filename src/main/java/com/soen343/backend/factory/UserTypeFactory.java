package com.soen343.backend.factory;

import com.soen343.backend.model.*;

import java.util.UUID;

public class UserTypeFactory {

    public User getUser(UUID id, String roleType)
    {
        if(roleType.equalsIgnoreCase("parent")) {
            return new Parent(id, roleType);
        }
        else if(roleType.equalsIgnoreCase("child")){
            return new Child(id, roleType);
        }
        else if(roleType.equalsIgnoreCase("guest")){
            return new Guest(id, roleType);
        }
        else if(roleType.equalsIgnoreCase("stranger")) {
            return new Stranger(id, roleType);
        }

        return null;
    }
}
