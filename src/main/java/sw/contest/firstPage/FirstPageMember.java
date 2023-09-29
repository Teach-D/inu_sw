package sw.contest.firstPage;

import lombok.Data;

@Data
public class FirstPageMember {

    private String itemA;
    private String itemB;
    private String itemC;
    private String color;

    public FirstPageMember(String itemA, String itemB, String itemC, String color) {
        this.itemA = itemA;
        this.itemB = itemB;
        this.itemC = itemC;
        this.color = color;
    }
}
