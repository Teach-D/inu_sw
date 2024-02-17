package sw.contest.springboot.controller.login;

import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.GetMapping;

// 종원
@Controller
public class LoginController {

    @GetMapping("/login/join")
    public String loginJoin() {
        return "guPage/login-join";
    }
}


