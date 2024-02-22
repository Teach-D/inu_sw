package sw.contest.spring;

import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import sw.contest.spring.discount.DiscountPolicy;
import sw.contest.spring.discount.FixDiscountPolicy;
import sw.contest.spring.discount.RateDiscountPolicy;
import sw.contest.spring.member.MemberRepository;
import sw.contest.spring.member.MemberService;
import sw.contest.spring.member.MemberServiceImpl;
import sw.contest.spring.member.MemoryMemberRepository;
import sw.contest.spring.order.OrderService;
import sw.contest.spring.order.OrderServiceImpl;

@Configuration
public class AppConfig {

    @Bean
    public MemberService memberService() {
        return new MemberServiceImpl(memberRepository());
    }

    @Bean
    public MemberRepository memberRepository() {
        return new MemoryMemberRepository();
    }

    @Bean
    public OrderService orderService() {
        return new OrderServiceImpl(memberRepository(), discountPolicy());
    }

    @Bean
    public DiscountPolicy discountPolicy() {
        return new RateDiscountPolicy();
    }
}
