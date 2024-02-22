package sw.contest.spring.discount;

import org.springframework.beans.factory.annotation.Qualifier;
import org.springframework.context.annotation.Primary;
import org.springframework.stereotype.Component;
import sw.contest.spring.annotation.MainDiscountPolicy;
import sw.contest.spring.member.Grade;
import sw.contest.spring.member.Member;

@Component
@MainDiscountPolicy
public class RateDiscountPolicy implements DiscountPolicy {

    private int discountRate = 10;

    @Override
    public int discountPrice(Member member, int price) {

        if(member.getGrade() == Grade.ADMIN) {
            return price * discountRate / 100;
        } else {
            return 0;
        }
    }

}
