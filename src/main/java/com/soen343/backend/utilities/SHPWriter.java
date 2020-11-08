
package com.soen343.backend.utilities;

import java.io.*;

public class SHPWriter {

    public void saveMsg(String msg, String filepath) {
        try {
            FileOutputStream fos = new FileOutputStream(filepath, true);
            BufferedWriter bw = new BufferedWriter(new OutputStreamWriter(fos));

            bw.write(msg);
            bw.write("\n");
            bw.write("\n");

            bw.flush();

            bw.close();
        } catch (Exception e) {
            e.printStackTrace(System.out);
        }
    }
}
