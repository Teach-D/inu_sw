package sw.contest.springboot.controller.guPage;
// 동현
import lombok.extern.slf4j.Slf4j;
import org.springframework.stereotype.Controller;
import org.springframework.ui.Model;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import sw.contest.springboot.dto.guPage.GuPageDto;

@Controller
@Slf4j
@RequestMapping("/guPage")
public class GuPageController {

    @GetMapping("/index")
    public String displayGuPage(Model model) {
        return "guPage/guPage";
    }

    @PostMapping("/index")
    public String displayGuPage1(Model model) {
        return "guPage/guPage";
    }

    @PostMapping("/crimeMethod")
    public String displayPage1(GuPageDto guPageDto) {
        log.info(guPageDto.getAge());
        log.info(guPageDto.getTime());
        log.info(guPageDto.getGender());
        log.info(guPageDto.getCrimeMethod());

        return "guPage/violencePage";
    }

    @GetMapping("/login")
    public String displayPage2(GuPageDto guPageDto) {
        log.info(guPageDto.getAge());
        log.info(guPageDto.getTime());
        log.info(guPageDto.getGender());
        log.info(guPageDto.getCrimeMethod());

        return "guPage/login";
    }

    @GetMapping("/join")
    public String displayPage3(GuPageDto guPageDto) {
        log.info(guPageDto.getAge());
        log.info(guPageDto.getTime());
        log.info(guPageDto.getGender());
        log.info(guPageDto.getCrimeMethod());

        return "guPage/join";
    }
}
