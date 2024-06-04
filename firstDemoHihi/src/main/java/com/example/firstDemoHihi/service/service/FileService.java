package com.example.firstDemoHihi.service.service;

import com.example.firstDemoHihi.service.implement.IFile;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.core.io.Resource;
import org.springframework.core.io.UrlResource;
import org.springframework.stereotype.Service;
import org.springframework.web.multipart.MultipartFile;

import java.nio.file.Files;
import java.nio.file.Path;
import java.nio.file.Paths;
import java.nio.file.StandardCopyOption;

@Service
public class FileService implements IFile {
    @Value("${fileUpLoad.rootPath}")
    private String rootPath;
    private Path root;

    private void init(){
        try{
            root = Paths.get(rootPath);
            if(Files.notExists(root)){
                Files.createDirectories(root);
            }
        }catch (Exception e){
            System.out.println("Error creating root directory " + e.getMessage());
        }
    }

    //upload file len server
    @Override
    public boolean save(MultipartFile file) {
        try{
            init();
            Files.copy(file.getInputStream(), root.resolve(file.getOriginalFilename()), StandardCopyOption.REPLACE_EXISTING);
            System.out.println("luu roi");
            return true;
        }catch (Exception e){
            System.out.println("Error saving file " + e.getMessage());
        }
        return false;
    }

    //lay file ra de tuong tac
    @Override
    public Resource load(String filename) {
        try{
            init();
            Path file = root.resolve(filename);
            Resource resource = new UrlResource(file.toUri());
            if(resource.exists() || resource.isReadable()){
                System.out.println("co source");
                return resource;
            }
        }catch (Exception e){
            System.out.println("Error loading file " + e.getMessage());
        }
        return null;
    }
}
