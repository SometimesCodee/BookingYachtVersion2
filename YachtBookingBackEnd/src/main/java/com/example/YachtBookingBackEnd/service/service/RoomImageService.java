package com.example.YachtBookingBackEnd.service.service;

import com.example.YachtBookingBackEnd.dto.RoomImageDTO;
import com.example.YachtBookingBackEnd.entity.Room;
import com.example.YachtBookingBackEnd.entity.RoomImage;
import com.example.YachtBookingBackEnd.repository.RoomImageRepository;
import com.example.YachtBookingBackEnd.repository.RoomRepository;
import com.example.YachtBookingBackEnd.service.implement.IRoomImage;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.web.multipart.MultipartFile;

import java.util.ArrayList;
import java.util.List;
import java.util.Map;

@Service
public class RoomImageService implements IRoomImage {
    @Autowired
    private RoomRepository roomRepository;
    @Autowired
    private RoomImageRepository roomImageRepository;
    @Autowired
    private CloudinaryService cloudinaryService;
    @Override
    public boolean insertRoomImages(String roomId, MultipartFile image) {
        try {
            Room room = roomRepository.findById(roomId)
                    .orElseThrow(()-> new RuntimeException("Not found room"));

            RoomImage roomImage = new RoomImage();
            roomImage.setRoom(room);
            Map uploadResult = cloudinaryService.upload(image);
            String imageUrl = (String) uploadResult.get("url");
            if (imageUrl == null) {
                System.out.println("Error uploading image to Cloudinary");
                return false;
            }
            roomImage.setImageRoom(imageUrl);

            roomImageRepository.save(roomImage);
            return  true;

        }catch (Exception e){
            System.out.println("Error by: "+ e);
        }
        return false;
    }

    @Override
    public boolean updateRoomImage(String imageId, MultipartFile image) {
        try {
            RoomImage roomImage = roomImageRepository.findById(imageId)
                    .orElseThrow(()-> new RuntimeException("Not found"));

            Map uploadResult = cloudinaryService.upload(image);
            String imageUrl = (String) uploadResult.get("url");
            if (imageUrl == null) {
                System.out.println("Error uploading image to Cloudinary");
                return false;
            }
            roomImage.setImageRoom(imageUrl);

            roomImageRepository.save(roomImage);
            return true;
        }catch (Exception e){
            System.out.println("Error by: "+ e);
        }
        return false;
    }

    @Override
    public boolean deleteRoomImage(String imageId) {
        try {
            RoomImage roomImage = roomImageRepository.findById(imageId)
                    .orElseThrow(()-> new RuntimeException("Not found"));
            roomImageRepository.delete(roomImage);
            return true;
        }catch (Exception e){
            System.out.println("Error by: "+ e);
        }
        return false;
    }

    @Override
    public List<RoomImageDTO> getAllImageByIdRoom(String roomId) {
        Room room = roomRepository.findById(roomId)
                .orElseThrow(() -> new RuntimeException("Not found"));

        List<RoomImageDTO> roomImageDTOList = new ArrayList<>();

        List<RoomImage> roomImages = roomImageRepository.findAllByRoom(room);
        for (RoomImage roomImage : roomImages
        ) {
            RoomImageDTO roomImageDTO = new RoomImageDTO();
            roomImageDTO.setIdRoomImage(roomImage.getIdRoomImage());
            roomImageDTO.setImageRoom(roomImage.getImageRoom());
            roomImageDTOList.add(roomImageDTO);
        }

        return roomImageDTOList;
    }
}
