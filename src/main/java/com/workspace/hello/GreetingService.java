package com.workspace.hello;

import java.util.List;
import java.util.concurrent.ThreadLocalRandom;
import org.springframework.stereotype.Service;

@Service
public class GreetingService {

    private static final List<String> TAGLINES = List.of(
            "The stars rearranged themselves just to spell your name.",
            "Trumpets sound, the crowd roars, and the universe bows.",
            "Legends speak of this moment. Today, it arrives.",
            "A thousand suns shine a little brighter because you're here.",
            "History will remember this day as the day %s arrived.",
            "Even the galaxies paused to say hello to %s."
    );

    public String taglineFor(String name) {
        String template = TAGLINES.get(ThreadLocalRandom.current().nextInt(TAGLINES.size()));
        return template.contains("%s") ? String.format(template, name) : template;
    }
}
