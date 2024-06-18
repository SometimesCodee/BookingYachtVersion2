package com.example.YachtBookingBackEnd.service.service;

import com.example.YachtBookingBackEnd.entity.Blog;
import com.example.YachtBookingBackEnd.repository.BlogRepository;
import com.example.YachtBookingBackEnd.service.implement.IBlog;
import com.example.YachtBookingBackEnd.service.implement.IFile;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.web.multipart.MultipartFile;

import java.time.LocalDate;

@Service
public class BlogService implements IBlog {

    @Autowired
    BlogRepository blogRepository;

    @Autowired
    IFile iFile;

    @Override
    public boolean insertBlog(String description, MultipartFile image, LocalDate postDate, String title) {
        Blog blog = new Blog();
        blog.setDescription(description);
        iFile.save(image);
        blog.setImage(image.getOriginalFilename());
        blog.setPostDate(postDate);
        blog.setTitle(title);
        blogRepository.save(blog);
        return true;
    }
}
