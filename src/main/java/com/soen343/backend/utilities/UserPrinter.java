package com.soen343.backend.utilities;

import com.soen343.backend.model.User;

import java.io.BufferedWriter;
import java.io.FileOutputStream;
import java.io.OutputStreamWriter;
import java.util.List;

public class UserPrinter {

    public void saveUsers(List<User> userDB)
    {
        UserPermissions userPermissions;
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
            }
        }
        catch(Exception e)
        {
            e.printStackTrace(System.out);
        }
    }

    public void loadUsers(List<User> userDB)
    {

    }
}
