package com.soen343.backend.utilities;

import com.soen343.backend.factory.UserTypeFactory;
import com.soen343.backend.model.User;

import java.io.*;
import java.util.List;
import java.util.UUID;

public class UserPrinter {

    private UserTypeFactory userFactory =  new UserTypeFactory();

    public void saveUsers(List<User> userDB)
    {
        try
        {
            FileOutputStream fos = new FileOutputStream("UserProfiles.txt",false);
            BufferedWriter bw = new BufferedWriter(new OutputStreamWriter(fos));

            for (User user: userDB) {
                bw.write(user.getRole());
                bw.newLine();
                bw.write(user.getId().toString());
                bw.newLine();
                bw.write(Boolean.toString(user.getUserPermissions().getCanLockDoors()));
                bw.newLine();
                bw.write(Boolean.toString(user.getUserPermissions().getCanOpenAllWindows()));
                bw.newLine();
                bw.write(Boolean.toString(user.getUserPermissions().getCanOpenRestrictedWindow()));
                bw.newLine();
                bw.write(Boolean.toString(user.getUserPermissions().getCanUseLights()));
                bw.newLine();
                bw.write(Boolean.toString(user.getUserPermissions().getCanUseRestrictedLights()));
                bw.newLine();
                bw.newLine();
            }

            bw.close();
        }
        catch(Exception e)
        {
            e.printStackTrace(System.out);
        }
    }

    public void loadUsers(List<User> userDB)
    {
        try
        {
            BufferedReader reader = new BufferedReader(new FileReader( new File("UserProfiles.txt")));

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
                UserPermissions userPermissions = new UserPermissions(openAllWindows, lockDoors, openLights, openRestrictedWindow, openRestrictedLights);

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
