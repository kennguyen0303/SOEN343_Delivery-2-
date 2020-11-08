package com.soen343.backend.utilities;

import com.soen343.backend.factory.UserTypeFactory;
import com.soen343.backend.model.User;
import org.junit.jupiter.api.Test;

import java.io.BufferedReader;
import java.io.File;
import java.io.FileReader;
import java.util.ArrayList;
import java.util.List;
import java.util.UUID;

import static org.junit.jupiter.api.Assertions.*;

class UserWriterTest {

    @Test
    public void writeUserFromDatabase()
    {
        List<User> userDB = new ArrayList<>();
        UserTypeFactory userFactory = new UserTypeFactory();
        UUID id = UUID.randomUUID();
        User user = userFactory.getUser(id , "stranger");
        userDB.add(user);

        UserWriter userWriter = new UserWriter();
        userWriter.saveUsers(userDB, "UserProfileWriterTest.txt");

        try
        {
            BufferedReader reader = new BufferedReader(new FileReader( new File("UserProfileWriterTest.txt")));

            // Get User info
            assertEquals(reader.readLine(), user.getRole());
            assertEquals(reader.readLine(),id.toString());
            assertEquals(Boolean.parseBoolean(reader.readLine()), false);
            assertEquals(Boolean.parseBoolean(reader.readLine()), false);
            assertEquals(Boolean.parseBoolean(reader.readLine()), false);
            assertEquals(Boolean.parseBoolean(reader.readLine()), false);
            assertEquals(Boolean.parseBoolean(reader.readLine()), false);

            reader.close();
        }
        catch(Exception e)
        {
            e.printStackTrace(System.out);
        }



    }

}