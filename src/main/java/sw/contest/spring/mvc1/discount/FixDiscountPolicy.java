package sw.contest.spring.discount;

import org.springframework.stereotype.Component;
import sw.contest.spring.member.Grade;
import sw.contest.spring.member.Member;
import sw.contest.spring.member.MemberRepository;
import sw.contest.spring.member.MemoryMemberRepository;

@Component
public class FixDiscountPolicy implements DiscountPolicy{

    private final MemberRepository memberRepository = new MemoryMemberRepository();

    @Override
    public int discountPrice(Member member, int price) {

        int discountPrice;

        Member findMember = memberRepository.findById(member.getId());

        if(findMember.getGrade() == Grade.ADMIN) {
            discountPrice = 1000;
        } else{
            discountPrice = 0;
        }

        return discountPrice;
    }
}
