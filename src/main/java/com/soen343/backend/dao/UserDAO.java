package com.soen343.backend.dao;

import com.soen343.backend.model.User;

import java.util.List;
import java.util.Optional;
import java.util.UUID;

/**
 * Interface that specifies the methods that are contained in the Data Access Services related to Users
 */
public interface UserDAO {

    int insertUser(UUID id, User user);

    /**
     * Places a user in the database list to register it as a current user
     * @param user
     * @return an integer 1 to indicate that it was successfully place or 0 to show that the operation failed
     */
    default int insertUser(User user) {
        UUID id = UUID.randomUUID();
        return insertUser(id, user);
    };

    List<User> selectAllUsers();

    Optional<User> selectUserById(UUID id);

    int deleteUserById(UUID id);

    int updateUserById(UUID id, User user);

    int loginUser(UUID id);

    int setUserLocation(UUID id, String location);
}
