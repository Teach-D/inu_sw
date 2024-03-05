package sw.contest.springboot.dto.reportBoard;

import jakarta.persistence.*;
import jakarta.validation.constraints.*;
import lombok.Data;

@Entity
@Data
public class Board {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Integer id;

    @Column(name = "BOARD_TITLE")
    @NotBlank
    private String title;

    @Column(name = "BOARD_CONTENT")
    @NotBlank
    private String content;

    public Board() {
    }

    public Board(Integer id, String title, String content) {
        this.id = id;
        this.title = title;
        this.content = content;
    }
}
