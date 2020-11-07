package com.soen343.backend.api;

import com.soen343.backend.model.User;
import com.soen343.backend.service.UserService;
import com.soen343.backend.utilities.UserPermissions;
import com.soen343.backend.utilities.UserPrinter;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.lang.NonNull;
import org.springframework.web.bind.annotation.*;

import javax.validation.Valid;
import java.util.List;
import java.util.Optional;
import java.util.UUID;

/**
 * Controller for all User Operations for Requests to the Application Frontend
 */
@RestController
public class UserController {

    private final UserService userService;

    /**
     * Constructor for the User Controller
     * @param userService User Service object which contains the business logic of the requests
     */
    @Autowired
    public UserController(UserService userService) {
        this.userService = userService;
    }

    /**
     * A Request to add a new user with a new id to the database list
     * @param user A User object to create and add to the database list
     */
    @PostMapping(value = "api/user/addUser")
    public void  addUser(@Valid @NonNull @RequestBody User user) {
        userService.addUser(user);
    }

    /**
     * A Getter for all users stored in the database list
     * @return A List of all users that are currently register
     */
    @GetMapping(value = "api/user/allUserRetrieval")
    public List<User> getAllUsers() {
        return userService.getAllUsers();
    }

    /**
     * Getter for a single user identified by a unique Id
     * @param id unique id passed in the request mapping to identify the user to find
     * @return The User mapped to the unique Id
     */
    @GetMapping(value = "api/user/userRetrieval/{id}")
    public User getUserById(@PathVariable("id") UUID id) {
        return userService.getUserById(id)
                .orElse(null);
    }

    /**
     * Request to remove the specified user from the database list
     * @param id unique id passed in the request mapping to identify the user to remove
     */
    @DeleteMapping(value = "api/user/userRemoval/{id}")
    public void deleteUserById(@PathVariable("id") UUID id) {
        userService.deleteUser(id);
    }

    /**
     * Updated the User Specified in the path
     * @param id unique id passed in the request mapping to identify the user
     * @param userToUpdate User Model of the updated User
     */
    @PutMapping( value = "api/user/userUpdate/{id}")
    public void updateUserById(@PathVariable("id") UUID id, @Valid @NonNull @RequestBody User userToUpdate ) {
        userService.updateUser(id, userToUpdate);
    }

    /**
     * Logs in the user specified in the path
     * @param id unique id passed in the request mapping to identify the user to log in
     */
    @PutMapping(value = "api/user/logIn/{id}")
    public void loginUser(@PathVariable("id") UUID id) {
        userService.loginUser(id);
    }

    /**
     * A Setter of the Location for a Unique User
     * @param id unique id passed in the request mapping to identify the user to update the location of
     * @param location
     */
    @PutMapping(value = "api/user/updateUserLocation/{id}/{location}")
    public void setUserLocation(@PathVariable("id") UUID id, @PathVariable("location") String location) {
        userService.setUserLocation(id, location);
    }

    /**
     * Request to change the permissions of a given user
     * @param id unique id passed in the request mapping to identify the user to change permissions of
     * @param permission string value of the permission to change
     * @param value boolean: true if enabled and false if disabled
     */
    @PutMapping(value = "api/user/updateUserPermissions/{id}/{permission}/{value}")
    public void grantUserPermission(@PathVariable("id") UUID id,@PathVariable("permission") String permission,@PathVariable("value") boolean value)
    {
       userService.grantPermissions(id, permission, value);
    }

    /**
     * Request to save all user profiles
     */
    @PostMapping(value = "api/user/userSaving")
    public void saveUsers()
    {
        UserPrinter userPrinter = new UserPrinter();
        userPrinter.saveUsers(userService.getAllUsers());
    }

    /**
     * Request to load user profiles from file into database
     */
    @PostMapping(value = "api/user/userLoading")
    public void loadUsers()
    {
        UserPrinter userPrinter = new UserPrinter();
        userPrinter.loadUsers(userService.getAllUsers());
    }

    @GetMapping(value="api/user/userPermissions/{id}")
    public UserPermissions getUserPermissions(@PathVariable("id") UUID id)
    {
        return userService.getUserPermissions(id);
    }
}
