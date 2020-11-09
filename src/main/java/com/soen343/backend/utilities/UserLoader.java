package com.soen343.backend.utilities;

import com.soen343.backend.factory.UserTypeFactory;
import com.soen343.backend.model.User;

import java.io.BufferedReader;
import java.io.File;
import java.io.FileReader;
import java.util.List;
import java.util.UUID;

public class UserLoader {

    private UserTypeFactory userFactory =  new UserTypeFactory();

    public void loadUsers(List<User> userDB, String filepath)
    {
        try
        {
            BufferedReader reader = new BufferedReader(new FileReader( new File(filepath)));

            String currentLine = reader.readLine();
            while(currentLine !=null)
            {
                // Get User info
                String role = currentLine;
                UUID id =  UUID.fromString(reader.readLine());
                boolean lockDoors = Boolean.parseBoolean(reader.readLine());
                boolean openAllWindows = Boolean.parseBoolean(reader.readLine());
                boolean openRestrictedWindow = Boolean.parseBoolean(reader.readLine());
                boolean openLights= Boolean.parseBoolean(reader.readLine());
                boolean openRestrictedLights= Boolean.parseBoolean(reader.readLine());
                boolean canSetAwayMode = Boolean.parseBoolean(reader.readLine());
                UserPermissions userPermissions = new UserPermissions(openAllWindows, lockDoors, openLights, openRestrictedWindow, openRestrictedLights, canSetAwayMode);

                // Create user
                User user =  userFactory.getUser(id, role);
                user.setUserPermissions(userPermissions);

                userDB.add(user);
                reader.readLine(); // blank line between user

                currentLine = reader.readLine();
            }

            reader.close();
        }
        catch(Exception e)
        {
            e.printStackTrace(System.out);
        }

    }
}
