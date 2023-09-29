package sw.contest.firstPage;

import lombok.extern.slf4j.Slf4j;
import org.springframework.stereotype.Controller;
import org.springframework.ui.Model;

import org.springframework.web.bind.annotation.PostMapping;

import java.util.ArrayList;
import java.util.List;
import java.util.Objects;

@Slf4j
@Controller
public class FirstPageController {
    FirstPageRepository memberRepository = FirstPageRepository.getFirstPageRepository();
    List<FirstPageMember> findMembers = new ArrayList<>();
    List<FirstPageMember> findMembers1 = new ArrayList<>();

    @PostMapping("/firstPage/items")
    public String findMembers(FirstPageMember firstPageMember, Model model) {

        //log.info(member.toString());
        List<FirstPageMember> members = memberRepository.findAll();

        log.info(members.toString());

        addModel(firstPageMember, model, members);

        return "/firstPage/members";
    }

    private void addModel(FirstPageMember member, Model model, List<FirstPageMember> members) {
        for (FirstPageMember findMember : members) {
            if(Objects.equals(findMember.getItemA(), member.getItemA()) && Objects.equals(findMember.getItemB()
                    , member.getItemB()) && Objects.equals(findMember.getItemC(), member.getItemC()))
            {
                findMembers.add(findMember);

            }
        }

        findMembers1.clear();
        for (FirstPageMember findMember : findMembers) {
            findMembers1.add(findMember);
        }

        model.addAttribute("members", findMembers1);
        findMembers.clear();
    }
}
