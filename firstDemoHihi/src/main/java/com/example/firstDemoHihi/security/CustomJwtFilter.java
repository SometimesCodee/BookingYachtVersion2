package com.example.firstDemoHihi.security;

import io.jsonwebtoken.Claims;
import io.jsonwebtoken.Jwts;
import io.jsonwebtoken.io.Decoders;
import io.jsonwebtoken.security.Keys;
import jakarta.servlet.FilterChain;
import jakarta.servlet.ServletException;
import jakarta.servlet.http.HttpServletRequest;
import jakarta.servlet.http.HttpServletResponse;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.authority.SimpleGrantedAuthority;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.security.web.authentication.WebAuthenticationDetailsSource;
import org.springframework.stereotype.Component;
import org.springframework.web.filter.OncePerRequestFilter;


import javax.crypto.SecretKey;
import java.io.IOException;
import java.util.ArrayList;
import java.util.Collections;

@Component
public class CustomJwtFilter extends OncePerRequestFilter {
    @Autowired
    JwtHelper jwtHelper;

    @Value("${jwt.privateKey}")
    private String privateKey;

    //filter chinh, check token co verify khong, neu co thi grant authentication cho user truy cap cac api
    @Override
    protected void doFilterInternal(HttpServletRequest request, HttpServletResponse response, FilterChain filterChain) throws ServletException, IOException {
        String token = getTokenHeader(request);

        if(token != null && jwtHelper.verifyToken(token)) {
            SecretKey key = Keys.hmacShaKeyFor(Decoders.BASE64.decode(privateKey));
            //Đoạn code này phân tích token để trích xuất các thông tin (claims) bên trong token, như tên người dùng và vai trò.
            Claims claims = Jwts.parserBuilder()//Khởi tạo một builder để tạo một JWT parser, công cụ dùng để phân tích token JWT.
                    .setSigningKey(key) // đảm bảo rằng token không thể bị giả mạo nếu không có khóa bí mật này.
                    .build() //Xây dựng parser với các thiết lập đã được cấu hình.
                    .parseClaimsJws(token)// Phân tích token
                    .getBody();

            String username = claims.getSubject(); // Lấy tên người dùng từ token
            String role = claims.get("role", String.class); // Lấy role tu token

            if(username != null && role != null) {
                //Tạo đối tượng UsernamePasswordAuthenticationToken để đại diện cho thông tin xác thực của người dùng
                UsernamePasswordAuthenticationToken authenticationToken = new UsernamePasswordAuthenticationToken(
                        username, null, Collections.singletonList(new SimpleGrantedAuthority(role)) // Tạo đối tượng xác thực
                );

                authenticationToken.setDetails(new WebAuthenticationDetailsSource().buildDetails(request));// Đặt chi tiết xác thực
                SecurityContextHolder.getContext().setAuthentication(authenticationToken);// Thiết lập xác thực vào SecurityContext
            }
        }
        filterChain.doFilter(request, response);
    }

    public  String getTokenHeader(HttpServletRequest request){
        String header = request.getHeader("Authorization");
        String token = null;
        if(header != null && header.startsWith("Bearer ")){
            token = header.substring(7);
        }
        return token;
    }
}
