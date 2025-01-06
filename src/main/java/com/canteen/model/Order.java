package com.canteen.model;
import java.util.List;
public class Order {
    private List<Product> products;
    int id;
    private int total;
    private User user;
    private Payment payment;
    private String status = "Being-Prepared"; // Varsayılan değer


    public void setStatus(String status) {
        this.status = status;
    }
    public Order(List<Product> products, int total, User user, Payment payment){
        this.products = products;
        this.total = total;
        this.user = user;
        this.id = (int)(Math.random() * 100000);
        this.payment = payment;
    }
    public List<Product> getProducts() {
        return products;
    }
    public void setUser(User user) {
        this.user = user;
    }
    public User getUser() {
        return user;
    }
    public Payment getPayment(){return payment;}
    public void setPayment(Payment payment) {
        this.payment = payment;
    }
    public int getTotal() {
        return total;
    }
        public int calculateAndSetTotal(Order order){
        this.total = order.getProducts().stream()
                .mapToInt(product -> (int) (product.getPrice() * product.getQuantity()))
                .sum();
        return total;
    }

    public int getId() {
        return id;
    }
    public String getStatus() {
        return status;
    }
}
