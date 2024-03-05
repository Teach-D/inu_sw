package sw.contest.spring.mvc2.shopping;


public enum ItemType {

    BOOK("도서"), FOOD("식품"), ETC("기타");

    private final String description;

    ItemType(String description) {
        this.description = description;
    }

    public String  getDescription() {
        return description;
    }
}
