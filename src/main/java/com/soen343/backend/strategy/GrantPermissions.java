package com.soen343.backend.strategy;

import com.soen343.backend.dao.UserDataAccessService;
import com.soen343.backend.model.User;
import com.soen343.backend.service.UserService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PutMapping;

import java.util.Optional;
import java.util.UUID;

/**
 * Concrete Strategy for those that can modify permissions of others
 */
@Controller
public class GrantPermissions implements PermissionsBehaviour {

    @Autowired
    private UserService userService;

    @PutMapping(value = "api/user/permissions/{id}/{permission}")
    public void changePermissions(User user, String permission, boolean value)
    {
//        Optional<User> user = userService.getUserById(id);
//        if(!user.isEmpty())
//        {
//            user.get();
//        }
    }
}
