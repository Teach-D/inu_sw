package sw.contest.spring;

public interface MemberRepository {

    void save(Member member);

    Member findById(Long memberId);
}
