package sw.contest.spring.discount;

import sw.contest.spring.member.Member;

public interface DiscountPolicy {

    int  discountPrice(Member member, int price);
}
