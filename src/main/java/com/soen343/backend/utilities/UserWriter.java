package com.soen343.backend.utilities;

import com.soen343.backend.model.User;

import java.io.*;
import java.util.List;

public class UserWriter {

    public void saveUsers(List<User> userDB, String filepath) {
        try {
            FileOutputStream fos = new FileOutputStream(filepath, false);
            BufferedWriter bw = new BufferedWriter(new OutputStreamWriter(fos));
            System.out.print(userDB.size());
            for (int i = 0; i < userDB.size(); i++) {
                User user = userDB.get(i);
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
                bw.write(Boolean.toString(user.getUserPermissions().getCanSetAwayMode()));
                bw.newLine();
                bw.newLine();
            }

            bw.close();
        } catch (Exception e) {
            e.printStackTrace(System.out);
        }
    }
}
