package sw.contest.spring.order;

import lombok.Data;

// 프로젝트에서 호신용품 파는 걸로
@Data
public class Order {

    private Long memberId;
    private String itemName;
    private int price;
    private int discountPrice;

    public Order(Long memberId, String itemName, int price, int discountPrice) {
        this.memberId = memberId;
        this.itemName = itemName;
        this.price = price;
        this.discountPrice = discountPrice;
    }

    @Override
    public String toString() {
        return "Order{" +
                "memberId=" + memberId +
                ", itemName='" + itemName + '\'' +
                ", price=" + price +
                ", discountPrice=" + discountPrice +
                '}';
    }
}
