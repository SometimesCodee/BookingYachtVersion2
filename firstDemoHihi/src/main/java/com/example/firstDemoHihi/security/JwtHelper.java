package com.example.firstDemoHihi.security;

import io.jsonwebtoken.Jwts;
import io.jsonwebtoken.io.Decoders;
import io.jsonwebtoken.security.Keys;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.stereotype.Component;
import javax.crypto.SecretKey;
import java.util.Date;

@Component
public class JwtHelper {
    @Value("${jwt.privateKey}")
    private String privateKey;

    //generate token and encrypt
    public String generateToken(String username, String role){
        SecretKey key = Keys.hmacShaKeyFor(Decoders.BASE64.decode(privateKey));
        return Jwts.builder()
                .setSubject(username) //  "subject" (chủ thể) của token JWT.
                .claim("role", role) //  claim là một phần của (nội dung) của token, chứa các thông tin (dữ liệu) về chủ thể của token và các thông tin liên quan khác.
                // Mỗi claim bao gồm một cặp key-value, nơi key là tên của claim và value là giá trị của claim.
                .setIssuedAt(new Date()) //set generate token time
                .setExpiration(new Date(System.currentTimeMillis() + 1000 * 60 * 60 * 24 * 7)) //set expiration time
                .signWith(key) //đảm bảo rằng token không thể bị giả mạo nếu không có khóa bí mật này.
                .compact(); //Kết thúc quá trình xây dựng và trả về token JWT dưới dạng chuỗi (string).
    }
    //giai ma token
    public boolean verifyToken(String token) {
        try {
            SecretKey key = Keys.hmacShaKeyFor(Decoders.BASE64.decode(privateKey));
            Jwts.parserBuilder()
                    .setSigningKey(key)
                    .build()
                    .parseClaimsJws(token);
            return true;
        } catch (Exception e) {
            return false;
        }
    }
}
