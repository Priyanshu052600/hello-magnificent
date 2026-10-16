package com.workspace.hello;

import static org.springframework.test.web.servlet.request.MockMvcRequestBuilders.get;
import static org.springframework.test.web.servlet.request.MockMvcRequestBuilders.post;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.content;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.model;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.status;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.view;
import static org.hamcrest.Matchers.containsString;
import static org.hamcrest.Matchers.not;

import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.autoconfigure.web.servlet.WebMvcTest;
import org.springframework.context.annotation.Import;
import org.springframework.test.web.servlet.MockMvc;

@WebMvcTest(GreetingController.class)
@Import(GreetingService.class)
class GreetingControllerTest {

    @Autowired
    private MockMvc mvc;

    @Test
    void showsNameForm() throws Exception {
        mvc.perform(get("/"))
                .andExpect(status().isOk())
                .andExpect(view().name("index"))
                .andExpect(content().string(containsString("Greet Me Magnificently")));
    }

    @Test
    void greetsByName() throws Exception {
        mvc.perform(post("/greet").param("name", "  Ada  "))
                .andExpect(status().isOk())
                .andExpect(view().name("greeting"))
                .andExpect(model().attribute("name", "Ada"))
                .andExpect(content().string(containsString("Ada")));
    }

    @Test
    void rejectsBlankName() throws Exception {
        mvc.perform(post("/greet").param("name", "   "))
                .andExpect(status().isOk())
                .andExpect(view().name("index"))
                .andExpect(model().attributeHasFieldErrors("form", "name"));
    }

    @Test
    void escapesHtmlInName() throws Exception {
        mvc.perform(post("/greet").param("name", "<script>x</script>"))
                .andExpect(status().isOk())
                .andExpect(content().string(not(containsString("<script>x</script>"))));
    }
}
