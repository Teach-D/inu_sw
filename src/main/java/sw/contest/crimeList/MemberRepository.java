package sw.contest.crimeList;

import java.util.*;

public class MemberRepository {

    private static MemberRepository memberRepository = new MemberRepository();

    Map<Long, Member> memberStore = new HashMap<>();
    private static Long sequence = 0L;
    List<Member> members = new ArrayList<>();

    public Member save(Member member) {
        memberStore.put(sequence, member);
        members.add(member);
        return member;
    }

    public List<Member> findAll() {
        return members;
    }

    private MemberRepository() {
    }

     public static MemberRepository getMemberRepository() {

         Member member1 = new Member("1", "1", "1", "A1", "B1");
         Member member2 = new Member("1", "1", "1", "A2", "B2");
         Member member3 = new Member("1", "2", "1", "A3", "B3");

         memberRepository.save(member1);
         memberRepository.save(member2);
         memberRepository.save(member3);
         //log.info(memberRepository.toString());
        return memberRepository;
    }

}
