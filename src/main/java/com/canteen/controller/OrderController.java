package com.canteen.controller;
import com.canteen.model.Order;
import com.canteen.model.Payment;
import com.canteen.model.User;
import jakarta.servlet.http.HttpSession;
import org.springframework.web.bind.annotation.*;
import java.util.ArrayList;
import java.util.List;
import java.util.Map;

@RestController
@RequestMapping("/api/orders")
public class OrderController {

    private List<Order> orders = new ArrayList<>();

    @PostMapping("/place-order")
    public void placeOrder(@RequestBody Order order, HttpSession session) {
        User user = (User) session.getAttribute("user");
        order.calculateAndSetTotal(order);
        order.setUser(user);
        orders.add(order);
        session.setAttribute("order", order);
        System.out.println(order.getUser().getUsername()+" placed an order. Order Id: " + order.getId() + ", Total: $" + order.getTotal() + ", Payment Method: " + order.getPayment().getPaymentMethod());
    }

    @GetMapping("/showOrders")
    public List<Order> showOrders(HttpSession session) {
        User user = (User) session.getAttribute("user");
        System.out.println("Orders viewed by " + user.getRole() + " " + user.getUsername());
        if (user.getRole().equals("customer")) {
            return orders.stream().filter(order -> order.getUser().getUsername().equals(user.getUsername())).toList();
        }
        return orders;
    }
    @PostMapping("/update-status")
    public void updateOrderStatus(@RequestBody Map<String, String> payload, HttpSession session) {
        User user = (User) session.getAttribute("user");
        int orderId = Integer.parseInt(payload.get("orderId"));
        String newStatus = payload.get("newStatus");
        for (Order order : orders) {
            if (order.getId() == orderId) {
                order.setStatus(newStatus);
                System.out.println("Order " + order.getId() + " status updated as '" + newStatus + "' by " + user.getRole() + " " + user.getUsername());
                break;
            }
        }
    }

}
