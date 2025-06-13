package com.zwiggy.zwiggy.Service;

import jakarta.mail.MessagingException;
import jakarta.mail.internet.MimeMessage;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.mail.SimpleMailMessage;
import org.springframework.mail.javamail.JavaMailSender;
import org.springframework.mail.javamail.MimeMessageHelper;
import org.springframework.stereotype.Service;

@Service
public class EmailUtility {

    @Autowired
    JavaMailSender mailSender;
    public void sendOrderConfirmation(String recipientEmail, String orderId) {
        try {
            MimeMessage message = mailSender.createMimeMessage();
            MimeMessageHelper helper = new MimeMessageHelper(message, true); // true = multipart

            helper.setFrom("zwiggy73@gmail.com");
            helper.setTo(recipientEmail);
            helper.setSubject("🎉 Your Zwiggy Order Has Been Placed! Order ID: " + orderId);
            helper.setText(buildHtmlBody(orderId), true); // true = HTML

            mailSender.send(message);

        } catch (MessagingException e) {
            e.printStackTrace(); // handle as needed
        }
    }

    private String buildHtmlBody(String orderId) {
        return """
                <html>
                    <body style="font-family: Arial, sans-serif; color: #333;">
                        <div style="max-width: 600px; margin: auto; padding: 20px; border: 1px solid #eee; border-radius: 8px;">
                            <h2 style="color: #2ecc71;">✅ Order Confirmation</h2>
                            <p>Thank you for placing your order with <strong>Zwiggy</strong>!</p>
                            <p>We are preparing your delicious food and will deliver it soon.</p>
                            <hr style="margin: 20px 0;">
                            <p style="font-size: 14px; color: #888;">You’ll receive another email when your food is on its way.</p>
                            <p style="font-size: 14px; color: #888;">Thanks for ordering with us!</p>
                            <p style="font-size: 14px; color: #555;">– The Zwiggy Team</p>
                        </div>
                    </body>
                </html>
                """;
    }

}
