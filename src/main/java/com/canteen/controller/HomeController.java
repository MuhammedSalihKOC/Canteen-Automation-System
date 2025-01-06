package com.canteen.controller;

import com.canteen.Application;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.GetMapping;

@Controller
public class HomeController {
    @GetMapping("/home")
    public String home() {
        System.out.println("User navigated to home page");
        return "home";
    }
    @GetMapping("/login")
    public String login() {
        System.out.println("User navigated to log in page");
        return "login";
    }
    @GetMapping("/myOrders")
    public String myOrders() {
        System.out.println("User navigated to my orders page");
        return "myOrders";
    }
    @GetMapping("/products")
    public String products() {
        System.out.println("User navigated to products page");
        return "products";
    }
    @GetMapping("-profile")
    public String profile() {
        System.out.println("User navigated to profile page");
        return "-profile";
    }
    @GetMapping("/dashboard")
    public String dashboard() {
        System.out.println("User navigated to dashboard page");
        return "dashboard";
    }
    @GetMapping("/payment")
    public String payment() {
        System.out.println("User navigated to payment page");
        return "payment";
    }
}
