package com.soen343.backend.utilities;

import com.soen343.backend.model.User;
import org.junit.jupiter.api.Test;

import java.util.ArrayList;
import java.util.List;

import static org.junit.jupiter.api.Assertions.*;

class UserLoaderTest {

    @Test
    public void loadUserFromFile()
    {
        List<User> userDB = new ArrayList<>();
        UserLoader userLoader = new UserLoader();
        userLoader.loadUsers(userDB, "UserProfilesTest.txt");

        User user = userDB.get(0);
        UserPermissions userPermissions = user.getUserPermissions();

        assertEquals(user.getRole(),"Guest");
        assertEquals(user.getId().toString(),"135f1807-76f8-40a4-8fab-837cf718c744");
        assertEquals(userPermissions.getCanLockDoors(), false);
        assertEquals(userPermissions.getCanOpenAllWindows(), true);
        assertEquals(userPermissions.getCanOpenRestrictedWindow(), false);
        assertEquals(userPermissions.getCanUseLights(), true);
        assertEquals(userPermissions.getCanUseRestrictedLights(), false);
    }
}