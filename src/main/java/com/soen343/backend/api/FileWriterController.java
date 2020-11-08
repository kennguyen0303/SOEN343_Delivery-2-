package com.soen343.backend.api;

import com.soen343.backend.utilities.FileWriter;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

/**
 * Controller for all User Operations for Requests to the Application Frontend
 */
@RestController
public class FileWriterController {

    /**
     * Constructor for the User Controller
     */
    @Autowired
    public FileWriterController() {
    }

    /**
     * Request to save all user profiles
     */
    @PostMapping(value = "api/user/shpWirter/{msg}")
    public void saveSHPMsg(@PathVariable("msg") String msg) {
        FileWriter shpWirter = new FileWriter();
        shpWirter.saveMsg(msg, "SHP_Commands.txt");
    }

    /**
     * Request to save all user profiles
     */
    @PostMapping(value = "api/user/shcWirter/{msg}")
    public void saveSHCMsg(@PathVariable("msg") String msg) {
        FileWriter shcWirter = new FileWriter();
        shcWirter.saveMsg(msg, "SHC_Commands.txt");
    }
}