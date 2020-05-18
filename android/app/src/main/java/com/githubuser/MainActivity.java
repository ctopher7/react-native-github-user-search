package com.githubuser;

import com.facebook.react.ReactActivity;

import android.os.Bundle; //splashscreen
import org.devio.rn.splashscreen.SplashScreen;//splashscreen

public class MainActivity extends ReactActivity {

    @Override
    protected String getMainComponentName() {
        return "githubuser";
    }
  
    @Override
    protected void onCreate(Bundle savedInstanceState) {
        try{
            this.getSupportActionBar().hide();
        }
        catch (NullPointerException e){}
        super.onCreate(savedInstanceState);
        SplashScreen.show(this);  // rn splash
    }
}
