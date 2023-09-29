package sw.contest.crimeList;

import lombok.Data;

@Data
public class Member {
    private String itemA;
    private String itemB;
    private String itemC;

    private String itemD;
    private String itemE;

    public Member(String itemA, String itemB, String itemC, String itemD, String itemE) {
        this.itemA = itemA;
        this.itemB = itemB;
        this.itemC = itemC;
        this.itemD = itemD;
        this.itemE = itemE;
    }

    /*public Member findItems(String itemA, String itemB, String itemC) {

    }*/

}
