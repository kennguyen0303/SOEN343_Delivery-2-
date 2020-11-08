package com.soen343.backend.api;

import com.soen343.backend.utilities.SHPWriter;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

/**
 * Controller for all User Operations for Requests to the Application Frontend
 */
@RestController
public class SHPController {

    /**
     * Constructor for the User Controller
     */
    @Autowired
    public SHPController() {
    }

    /**
     * Request to save all user profiles
     */
    @PostMapping(value = "api/user/shpWirter/{msg}")
    public void saveMsg(@PathVariable("msg") String msg) {
        SHPWriter shpWirter = new SHPWriter();
        shpWirter.saveMsg(msg, "SHP_Commands.txt");
    }
}