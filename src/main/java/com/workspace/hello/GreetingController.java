package com.workspace.hello;

import jakarta.validation.Valid;
import org.springframework.stereotype.Controller;
import org.springframework.ui.Model;
import org.springframework.validation.BindingResult;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.ModelAttribute;
import org.springframework.web.bind.annotation.PostMapping;

@Controller
public class GreetingController {

    private final GreetingService greetingService;

    public GreetingController(GreetingService greetingService) {
        this.greetingService = greetingService;
    }

    @GetMapping("/")
    public String index(@ModelAttribute("form") GreetingForm form) {
        return "index";
    }

    @PostMapping("/greet")
    public String greet(@Valid @ModelAttribute("form") GreetingForm form,
                        BindingResult result,
                        Model model) {
        if (result.hasErrors()) {
            return "index";
        }
        model.addAttribute("name", form.getName());
        model.addAttribute("tagline", greetingService.taglineFor(form.getName()));
        return "greeting";
    }
}
