package com.soen343.backend.strategy;

import com.soen343.backend.dao.UserDataAccessService;
import com.soen343.backend.model.User;
import com.soen343.backend.service.UserService;
import org.springframework.beans.factory.annotation.Autowired;

import java.util.Optional;
import java.util.UUID;

/**
 * Concrete Strategy for those that can modify permissions of others
 */
public class GrantPermissions implements PermissionsBehaviour {

    @Autowired
    private UserService userService;

    public void changePermissions(UUID id)
    {
        Optional<User> user = userService.getUserById(id);
        if(!user.isEmpty())
        {
            user.get();
        }
    }
}
