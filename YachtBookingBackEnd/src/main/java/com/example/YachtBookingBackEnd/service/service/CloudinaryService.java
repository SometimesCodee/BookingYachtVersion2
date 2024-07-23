package com.example.YachtBookingBackEnd.service.service;

import com.cloudinary.Cloudinary;
import com.cloudinary.utils.ObjectUtils;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.stereotype.Service;
import org.springframework.web.multipart.MultipartFile;
import java.io.File;
import java.io.FileOutputStream;
import java.io.IOException;
import java.util.Map;
import java.util.logging.Logger;

@Service
public class CloudinaryService {
    private static final Logger logger = Logger.getLogger(CloudinaryService.class.getName());
    private final Cloudinary cloudinary;

    public CloudinaryService(@Value("${cloudinary.cloud_name}") String cloudName,
                             @Value("${cloudinary.api_key}") String apiKey,
                             @Value("${cloudinary.api_secret}") String apiSecret) {
        cloudinary = new Cloudinary(ObjectUtils.asMap(
                "cloud_name", cloudName,
                "api_key", apiKey,
                "api_secret", apiSecret
        ));
    }

    public Map upload(MultipartFile multipartFile) throws IOException {
        File file = convert(multipartFile);
        try {
            Map result = cloudinary.uploader().upload(file, ObjectUtils.emptyMap());
            return result;
        } finally {
            if (file.exists()) {
                file.delete();
            }
        }
    }

    public Map delete(String id) throws IOException {
        return cloudinary.uploader().destroy(id, ObjectUtils.emptyMap());
    }

    private File convert(MultipartFile multipartFile) throws IOException {
        logger.info("Starting file conversion for: " + multipartFile.getOriginalFilename());
        File file = File.createTempFile("temp", null);
        try (FileOutputStream fos = new FileOutputStream(file)) {
            fos.write(multipartFile.getBytes());
        } catch (IOException e) {
            logger.severe("An error occurred while writing to the file: " + e.getMessage());
            throw new IOException("An error occurred while converting the MultipartFile to File", e);
        }
        logger.info("File conversion completed for: " + multipartFile.getOriginalFilename());
        return file;
    }
}
