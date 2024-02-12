package sw.contest.dto.guPage;
// 동현

import lombok.Data;

@Data
public class GuPageDto {

    private String crimeMethod;
    private String gender;
    private String age;
    private String time;

    public GuPageDto(String crimeMethod, String gender, String age, String time) {
        this.crimeMethod = crimeMethod;
        this.gender = gender;
        this.age = age;
        this.time = time;
    }
}
