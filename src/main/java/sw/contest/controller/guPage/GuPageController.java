package sw.contest.controller.guPage;

import jakarta.servlet.http.HttpServletRequest;
import lombok.extern.slf4j.Slf4j;
import org.springframework.stereotype.Controller;
import org.springframework.ui.Model;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;

@Controller
@Slf4j
@RequestMapping("/guPage")
public class GuPageController {

    @GetMapping("/index")
    public String displayGuPage(Model model) {
        return "guPage/guPage";
    }

    @PostMapping("/crimeMethod")
    public String displayPage1(@RequestParam("crimeMethod") String crimeMethod) {
        if (crimeMethod.equals("murder")) {
            return "guPage/murderPage";
        }

        return "guPage/test";
    }
}
