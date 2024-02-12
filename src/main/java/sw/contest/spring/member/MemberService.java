package sw.contest.spring;

public interface MemberService {

    void join(Member member);

    Member findMember(Long memberId);
}
