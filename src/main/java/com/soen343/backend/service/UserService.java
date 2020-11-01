package com.soen343.backend.service;

import com.soen343.backend.dao.UserDAO;
import com.soen343.backend.model.User;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.factory.annotation.Qualifier;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;
import java.util.UUID;

/**
 * A Service to access the User Data Access Service
 */
@Service
public class UserService {

    private final UserDAO userDAO;

    /**
     * Constructor of the service
     * @param userDAO user data access object which controls the business logic of the user methods
     */
    @Autowired
    public UserService(@Qualifier("userDao") UserDAO userDAO) {
        this.userDAO = userDAO;
    }

    /**
     * Adds a user through the userDAO to a database
     * @param user A user object that will be added to the database list
     * @return an integer, 0 if failed and 1 if successful
     */
    public int addUser(User user) {
        return userDAO.insertUser(user);
    }

    /**
     * Returns a list of all current users created
     * @return A list of all current registerd users
     */
    public List<User> getAllUsers() {

        return userDAO.selectAllUsers();
    }

    /**
     * Locates a User with the specified unique id and returns it
     * @param id UUID of the user that is being fetched
     * @return An optional user if a user is found by id
     */
    public Optional<User> getUserById(UUID id) {
        return userDAO.selectUserById(id);
    }

    /**
     * Removes a given user from the list of current users
     * @param id
     * @return an integer, 0 if failed and 1 if successful
     */
    public int deleteUser(UUID id) {

        return userDAO.deleteUserById(id);
    }

    /**
     * For a given user, update their current role and id
     * @param id unique UUID associated to the user to delete
     * @param newUser a User object with the role to replace the old user with
     * @return an integer, 0 if failed and 1 if successful
     */
    public int updateUser(UUID id, User newUser) {

        return userDAO.updateUserById(id, newUser);
    }

    /**
     * For a given user, update if they are logged in or not
     * @param id unique UUID associated to the user change the logged in status of
     * @return an integer, 0 if failed and 1 if successful
     */
    public int loginUser(UUID id){
        return userDAO.loginUser(id);
    }

    /**
     * For a given user, updates their current location value
     * @param id unique UUID associated to the user to change the location of
     * @param location
     * @return an integer, 0 if failed and 1 if successful
     */
    public int setUserLocation(UUID id, String location) {
        return userDAO.setUserLocation(id, location);
    }
}
