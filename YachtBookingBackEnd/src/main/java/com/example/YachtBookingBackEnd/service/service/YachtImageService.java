package com.example.YachtBookingBackEnd.service.service;

import com.example.YachtBookingBackEnd.dto.YachtImageDTO;
import com.example.YachtBookingBackEnd.entity.Yacht;
import com.example.YachtBookingBackEnd.entity.YachtImage;
import com.example.YachtBookingBackEnd.repository.YachtImageRepository;
import com.example.YachtBookingBackEnd.repository.YachtRepository;
import com.example.YachtBookingBackEnd.service.implement.IYachtImage;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.web.multipart.MultipartFile;

import java.util.ArrayList;
import java.util.List;
import java.util.Map;
import java.util.Optional;

@Service
public class YachtImageService implements IYachtImage {
    @Autowired
    YachtImageRepository yachtImageRepository;
    @Autowired
    YachtRepository yachtRepository;
    @Autowired
    private CloudinaryService cloudinaryService;


    @Override
    public List<YachtImageDTO> getImageByYacht(String yachtId) {
        List<YachtImageDTO> yachtImageDTOList = new ArrayList<>();
        try{
            List<YachtImage> yachtImageList = yachtImageRepository.findByYachtId(yachtId);
            if(!yachtImageList.isEmpty()){
                for(YachtImage yachtImage : yachtImageList){
                    System.out.println("tim thay");
                    YachtImageDTO yachtImageDTO = new YachtImageDTO();
                    yachtImageDTO.setIdYachtImage(yachtImage.getIdYachtImage());
                    yachtImageDTO.setImageYacht(yachtImage.getImageYacht());
                    yachtImageDTOList.add(yachtImageDTO);
                }
            }else{
                System.out.println("ko thay");
            }
        }catch (Exception e){
            System.out.println("error get image by Yacht " + e.getMessage());
        }
        System.out.println(yachtImageDTOList);
        return yachtImageDTOList;
    }

    @Override
    public boolean addImage(MultipartFile image, String yachtId) {
        try{
            Optional<Yacht> yachtOptional = yachtRepository.findById(yachtId);
            if(yachtOptional.isPresent()){
                YachtImage yachtImage = new YachtImage();
                Map uploadResult = cloudinaryService.upload(image);
                String imageUrl = (String) uploadResult.get("url");
                if (imageUrl == null) {
                    System.out.println("Error uploading image to Cloudinary");
                    return false;
                }
                yachtImage.setImageYacht(imageUrl);
                yachtImage.setYacht(yachtOptional.get());
                yachtImageRepository.save(yachtImage);
                return true;
            }
        }catch (Exception e){
            System.out.println("error add image by Yacht " + e.getMessage());
        }
        return false;
    }

    @Override
    public boolean updateImage(MultipartFile image, String imageId) {
        try{
            YachtImage yachtImage = yachtImageRepository.findById(imageId)
                    .orElseThrow(() -> new RuntimeException("Company not found! Try again"));
                    System.out.println("tim thay");
                    Map uploadResult = cloudinaryService.upload(image);
                    String imageUrl = (String) uploadResult.get("url");
                    if (imageUrl == null) {
                        System.out.println("Error uploading image to Cloudinary");
                        return false;
                    }
                    yachtImage.setImageYacht(imageUrl);
                    yachtImageRepository.save(yachtImage);
                    return true;
        }catch (Exception e){
            System.out.println("error get image by Yacht " + e.getMessage());
        }
        return false;
    }

    @Override
    public boolean deleteImage(String imageId) {
        try{
            Optional<YachtImage> yachtImageOptional = yachtImageRepository.findById(imageId);
            if(yachtImageOptional.isPresent()){
                yachtImageRepository.delete(yachtImageOptional.get());
                return true;
            }
        }catch (Exception e){
            System.out.println("error delete image by Yacht " + e.getMessage());
        }
        return false;
    }




}
