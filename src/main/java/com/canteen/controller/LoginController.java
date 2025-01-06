package com.canteen.controller;
import com.canteen.model.User;
import jakarta.servlet.http.HttpSession;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.*;
@Controller
public class LoginController {
    @PostMapping("/login")
    public String login(@RequestParam("username") String username, @RequestParam("password") String password, @RequestParam("role") String role, HttpSession session) {
        User user = new User(username, password, role);
        session.setAttribute("user", user);
        System.out.println(user.getUsername() + " loged in as " + user.getRole() + " with Username: " + user.getUsername());
        return "redirect:/profile";
    }

    @GetMapping("/profile")
    public String showProfile(HttpSession session, org.springframework.ui.Model model) {
        User user = (User) session.getAttribute("user");
        if (user != null) {
            model.addAttribute("username", user.getUsername());
            model.addAttribute("role", user.getRole());
        } else {return "redirect:/login";}
        return "profile";
    }

    @GetMapping("/logout")
    @ResponseBody
    public String logOut(HttpSession session) {
        System.out.println("User loged out.");
        session.invalidate();
        return "/login";
    }

    @GetMapping("/session-status")
    @ResponseBody
    public String getSessionData(HttpSession session) {
        User user = (User) session.getAttribute("user");
        String response = "closed";
        if (user != null) {response = "open";}
        return response;
    }

    @GetMapping("/check-role")
    @ResponseBody
    public String checkUserRole(HttpSession session) {
        User user = (User) session.getAttribute("user");
        String response = "null";
        if (user != null) {response = user.getRole();}
        return response;
    }




}
