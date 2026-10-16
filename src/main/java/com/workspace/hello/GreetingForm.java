package com.workspace.hello;

import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.Size;

/** Form-backing object for the name input. */
public class GreetingForm {

    @NotBlank(message = "Please tell us your name.")
    @Size(max = 50, message = "Name must be 50 characters or fewer.")
    private String name;

    public String getName() {
        return name;
    }

    public void setName(String name) {
        this.name = name == null ? null : name.trim();
    }
}
