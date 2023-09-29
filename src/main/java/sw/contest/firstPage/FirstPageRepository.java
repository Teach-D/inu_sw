package sw.contest.firstPage;

import lombok.extern.slf4j.Slf4j;

import java.util.ArrayList;
import java.util.HashMap;
import java.util.List;
import java.util.Map;

@Slf4j
public class FirstPageRepository {

    private static FirstPageRepository firstPageRepository = new FirstPageRepository();

    Map<Long, FirstPageMember> memberStore = new HashMap<>();
    private static Long sequence = 0L;
    List<FirstPageMember> members = new ArrayList<>();

    public FirstPageMember save(FirstPageMember firstPageMember) {
        memberStore.put(sequence, firstPageMember);
        members.add(firstPageMember);
        return firstPageMember;
    }

    public List<FirstPageMember> findAll() {
        return members;
    }

    private FirstPageRepository() {
    }

     public static FirstPageRepository getFirstPageRepository() {

         FirstPageMember member1 = new FirstPageMember("1", "1", "1", "red");
         FirstPageMember member2 = new FirstPageMember("1", "2", "1", "blue");
         FirstPageMember member3 = new FirstPageMember("1", "1", "2", "green");

         firstPageRepository.save(member1);
         firstPageRepository.save(member2);
         firstPageRepository.save(member3);
         //log.info(firstPageRepository.toString());
        return firstPageRepository;
    }

}
