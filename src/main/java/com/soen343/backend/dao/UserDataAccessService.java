package com.soen343.backend.dao;

import com.soen343.backend.model.User;
import org.springframework.stereotype.Repository;

import java.util.ArrayList;
import java.util.List;
import java.util.Optional;
import java.util.UUID;

/**
 * A Repository of the Users that are Registered to the Simulation and related business logic
 */
@Repository("userDao")
public class UserDataAccessService implements UserDAO {

    private List<User> DB = new ArrayList<>();

    /**
     * Adds a new User to the database list
     * @param id Unique Id that is assigned to the new user
     * @param user A User Model to insert into the database list
     * @return an integer. 1 if the operation of succesful and 0 if it fails
     */
    @Override
    public int insertUser(UUID id, User user) {
        DB.add(new User(id, user.getRole()));
        return 1;
    }

    /**
     *  A Getter for All Users models currently stored
     * @return A List of All Users registered
     */
    public List<User> selectAllUsers() {

        return DB;
    }

    /**
     * A Getter to find a specific user with their id
     * @param id Unique Id to identify the user to select
     * @return An Optional User if found with the provided id
     */
    @Override
    public Optional<User> selectUserById(UUID id) {
        return DB.stream()
                .filter(user -> user.getId().equals(id))
                .findFirst();
    }

    /**
     * Deletes the specific user identified by an id
     * @param id Unique Id to identify the user to delete
     * @return an Integer, 1 if no user was found and the operation fails or 1 if the operating is successful
     */
    @Override
    public int deleteUserById(UUID id) {
        Optional<User> user = selectUserById(id);

        if(user.isEmpty())
        {
            return 0; // indicates that no user was found and deleted
        }

        DB.remove(user.get());
        return 1;
    }

    /**
     * An method to update the role of a user that already exists
     * @param id Unique Id to identify the user to update
     * @param updateUser a user Model with new values to replace the old one with
     * @return an Integer, 1 if no user was found and the operation fails or 1 if the operating is successful
     */
    @Override
    public int updateUserById(UUID id, User updateUser) {
        return selectUserById(id)
                .map(user -> {
                    int indexOfUserToUpdate = DB.lastIndexOf(user);
                    if(indexOfUserToUpdate >= 0) // we have found a person
                    {
                        DB.set(indexOfUserToUpdate,  new User(id, updateUser.getRole())); // set contents of the person to new person that was just received
                        return 1;
                    }
                    return 0;
                })
                .orElse(0);
    }

    /**
     * Logs in user with specified Id and logs out the currently logged user
     * @param id Unique Id to identify the user to update
     * @return an Integer, 1 if no user was found and the operation fails or 1 if the operating is successful
     */
    @Override
    public int loginUser(UUID id) {

        Optional<User> userToLogIn = selectUserById(id);

        if(userToLogIn.isEmpty())
        {
            return 0; // indicates that no user was found and no action was taken
        }
        Optional<User> currentLoggedInUser = findCurrentLoggedInUser();

        if(!currentLoggedInUser.isEmpty())
        {
            // log out the current user
            currentLoggedInUser.get().setLoggedUser(false);
        }

        // log in new user
        userToLogIn.get().setLoggedUser(true);

        return 1;
    }

    /**
     * Finds the User such that their current logged in status is true
     * @return an Optional User if it is found, if any user is logged in
     */
    private Optional<User> findCurrentLoggedInUser() {
        return DB.stream()
                .filter(user -> user.getIsLoggedUser() == true)
                .findFirst();
    }

    /**
     * Updated the Location of a specific user
     * @param id Unique Id to identify the user to update
     * @param location A String representing their new location
     * @return an Integer, 1 if no user was found and the operation fails or 1 if the operating is successful
     */
    @Override
    public int setUserLocation(UUID id, String location) {

        Optional<User> user = selectUserById(id);

        if(user.isEmpty())
        {
            return 0; // indicates that no user was found and no action was taken
        }

        user.get().setLocation(location);
        return 1;
    }
}
