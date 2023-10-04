package sw.contest.crimeList;

import lombok.extern.slf4j.Slf4j;
import org.springframework.stereotype.Controller;
import org.springframework.ui.Model;

import org.springframework.web.bind.annotation.PostMapping;

import java.util.ArrayList;
import java.util.List;
import java.util.Objects;
// 수정 연습
// 2번째 수정
@Slf4j
@Controller
public class CrimeListController {
    MemberRepository memberRepository = MemberRepository.getMemberRepository();
    List<Member> findMembers = new ArrayList<>();
    List<Member> findMembers1 = new ArrayList<>();

    @PostMapping("/basic/items")
    public String findMembers(Member member, Model model) {

        //log.info(member.toString());
        List<Member> members = memberRepository.findAll();

        //log.info(members.toString());

        addModel(member, model, members);
        

        return "/crimeList/members";
    }
    private void addModel(Member member, Model model, List<Member> members) {
        for (Member findMember : members) {
            if(Objects.equals(findMember.getItemA(), member.getItemA()) && Objects.equals(findMember.getItemB()
                    , member.getItemB()) && Objects.equals(findMember.getItemC(), member.getItemC()))
            {
                findMembers.add(findMember);

            }
        }

        findMembers1.clear();
        for (Member findMember : findMembers) {
            findMembers1.add(findMember);
        }

        model.addAttribute("members", findMembers1);
        findMembers.clear();
    }
}
