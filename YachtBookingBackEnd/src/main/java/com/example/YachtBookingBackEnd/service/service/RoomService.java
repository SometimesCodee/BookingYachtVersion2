package com.example.YachtBookingBackEnd.service.service;

import com.example.YachtBookingBackEnd.dto.RoomDTO;
import com.example.YachtBookingBackEnd.dto.RoomImageDTO;
import com.example.YachtBookingBackEnd.dto.RoomScheduleDTO;
import com.example.YachtBookingBackEnd.dto.RoomTypeDTO;
import com.example.YachtBookingBackEnd.entity.Room;
import com.example.YachtBookingBackEnd.entity.RoomImage;
import com.example.YachtBookingBackEnd.entity.RoomType;
import com.example.YachtBookingBackEnd.entity.Yacht;
import com.example.YachtBookingBackEnd.repository.*;
import com.example.YachtBookingBackEnd.service.implement.IFile;
import com.example.YachtBookingBackEnd.service.implement.IRoom;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.web.multipart.MultipartFile;

import java.util.ArrayList;
import java.util.List;

@Service
public class RoomService implements IRoom {

    @Autowired
    private RoomRepository roomRepository;
    @Autowired
    private RoomImageRepository roomImageRepository;
    @Autowired
    private YachtRepository yachtRepository;
    @Autowired
    private RoomTypeRepository roomTypeRepository;
    @Autowired
    private IFile iFile;
    @Autowired
    private BookingRoomRepository bookingRoomRepository;

    @Override
    public List<RoomDTO> getAllRoom() {
        List<RoomDTO> roomDTOList = new ArrayList<>();

        try {
            List<Room> roomList = roomRepository.findAll();
            for (Room room : roomList
            ) {
                RoomDTO roomDTO = new RoomDTO();
                roomDTO.setIdRoom(room.getIdRoom());
                roomDTO.setName(room.getName());
                roomDTO.setArea(room.getArea());
                RoomTypeDTO roomTypeDTO = new RoomTypeDTO();
                roomTypeDTO.setPrice(room.getRoomType().getPrice());
                roomDTO.setRoomType(roomTypeDTO);
                roomDTOList.add(roomDTO);
            }

        } catch (Exception e) {
            System.out.println("Error by: "+e);
        }
        return roomDTOList;
    }



    @Override
    public RoomDTO getRoomByID(String roomId) {

        RoomDTO roomDTO = new RoomDTO();
        Room room = roomRepository.findById(roomId)
                .orElseThrow(() -> new RuntimeException("Not found"));

        try {

            roomDTO.setIdRoom(roomId);
            roomDTO.setName(room.getName());
            roomDTO.setDescription(room.getDescription());
            roomDTO.setArea(room.getArea());

            RoomTypeDTO roomTypeDTO = new RoomTypeDTO();
            roomTypeDTO.setIdRoomType(room.getRoomType().getIdRoomType());
            roomTypeDTO.setType(room.getRoomType().getType());
            roomTypeDTO.setPrice(room.getRoomType().getPrice());
            roomTypeDTO.setUtilities(room.getRoomType().getUtilities());

            roomDTO.setRoomType(roomTypeDTO);

            List<RoomImageDTO> roomImageDTOList = new ArrayList<>();

            List<RoomImage> roomImages = roomImageRepository.findAllByRoom(room);
            for (RoomImage roomImage : roomImages
            ) {
                RoomImageDTO roomImageDTO = new RoomImageDTO();
                roomImageDTO.setIdRoomImage(roomImage.getIdRoomImage());
                roomImageDTO.setImageRoom(roomImage.getImageRoom());
                roomImageDTOList.add(roomImageDTO);
            }

            roomDTO.setRoomImageSet(roomImageDTOList);
        } catch (Exception e) {

        }
        return roomDTO;

    }

    @Override
    public boolean addRoom(String roomName,
                           double area,
                           String description,
                           String idRoomType,
                           String idYacht,
                           MultipartFile avatar) {
        try{
            Room room = new Room();
            room.setName(roomName);
            room.setArea(area);
            room.setDescription(description);
            iFile.save(avatar);
            room.setAvatar(avatar.getOriginalFilename());

            RoomType  roomType = roomTypeRepository.findById(idRoomType)
                    .orElseThrow(()-> new RuntimeException("Not found!!!!"));
            room.setRoomType(roomType);

            Yacht yacht = yachtRepository.findById(idYacht)
                    .orElseThrow(()-> new RuntimeException("Not found yacht!"));
            room.setYacht(yacht);
            roomRepository.save(room);
            return true;
        }catch (Exception e){
            System.out.println("Can't insert room: "+e);
        }
        return false;
    }


    @Override
    public boolean updateRoom(String roomId, String description, String roomName, MultipartFile avatar) {
        try {
            Room room = roomRepository.findById(roomId)
                    .orElseThrow(()-> new RuntimeException("Not found room!!"));

            if(description!= null){
                room.setDescription(description);
            }else {
                room.setDescription(room.getDescription());
            }
            iFile.save(avatar);
            room.setAvatar(avatar.getOriginalFilename());
            roomRepository.save(room);
            return  true;
        }catch (Exception e){
            System.out.println("Error by: "+e);

        }
        return false;
    }

    @Override
    public List<RoomScheduleDTO> getRoomAndSchedule(String idYacht, String idSchedule) {
        return roomRepository.findAllRoomsWithSchedulesByYachtId(idYacht, idSchedule);
    }

    @Override
    public List<RoomDTO> getRoomByYacht(String idYacht) {
        List<RoomDTO> roomDTOList = new ArrayList<>();
        try{
            List<Room> roomList = roomRepository.findAllByYachtId(idYacht);
            for (Room room : roomList) {
                RoomDTO roomDTO = new RoomDTO();
                roomDTO.setIdRoom(room.getIdRoom());
                roomDTO.setName(room.getName());
                roomDTO.setArea(room.getArea());
                roomDTO.setDescription(room.getDescription());
                roomDTO.setAvatar(room.getAvatar());

                RoomTypeDTO roomTypeDTO = new RoomTypeDTO();
                roomTypeDTO.setIdRoomType(room.getRoomType().getIdRoomType());
                roomTypeDTO.setType(room.getRoomType().getType());
                roomTypeDTO.setPrice(room.getRoomType().getPrice());
                roomTypeDTO.setUtilities(room.getRoomType().getUtilities());
                roomDTO.setRoomType(roomTypeDTO);

                roomDTO.setYachtId(idYacht);

                roomDTOList.add(roomDTO);
            }
        }catch (Exception e){
            System.out.println("Error by: "+e);
        }
        return roomDTOList;
    }

    @Override
    public List<RoomDTO> getRoomByRoomType(String idRoomType) {
        List<Room> roomList = roomRepository.findAllByRoomTypeId(idRoomType);
        if (roomList != null){
            return roomList
                    .stream()
                    .map(room -> {
                        RoomDTO roomDTO = new RoomDTO();
                        roomDTO.setIdRoom(room.getIdRoom());
                        roomDTO.setName(room.getName());
                        roomDTO.setArea(room.getArea());
                        roomDTO.setDescription(room.getDescription());
                        roomDTO.setAvatar(room.getAvatar());

                        return roomDTO;
                    })
                    .toList();
        }
        return List.of();
    }

    @Override
    public List<RoomDTO> getUnbookedRoomsByYachtAndSchedule(String yachtId, String scheduleId) {
        List<RoomDTO> roomDTOList = new ArrayList<>();
        List<String> bookedRoomsIds = bookingRoomRepository.findBookedRoomIdsByScheduleId(scheduleId);
        List<Room> unBookedRooms = roomRepository.findUnbookedRoomsByYachtAndSchedule(yachtId, bookedRoomsIds);
        if (unBookedRooms != null) {
            for (Room room : unBookedRooms) {
                RoomDTO roomDTO = new RoomDTO();

                roomDTO.setIdRoom(room.getIdRoom());
                roomDTO.setName(room.getName());
                roomDTO.setArea(room.getArea());
                roomDTO.setDescription(room.getDescription());
                roomDTO.setAvatar(room.getAvatar());

                RoomTypeDTO roomTypeDTO = new RoomTypeDTO();
                roomTypeDTO.setIdRoomType(room.getRoomType().getIdRoomType());
                roomTypeDTO.setType(room.getRoomType().getType());
                roomTypeDTO.setPrice(room.getRoomType().getPrice());
                roomTypeDTO.setUtilities(room.getRoomType().getUtilities());

                roomDTO.setRoomType(roomTypeDTO);

                List<RoomImageDTO> roomImageDTOList = new ArrayList<>();
                List<RoomImage> roomImages = roomImageRepository.findAllByRoom(room);
                for (RoomImage roomImage : roomImages) {
                    RoomImageDTO roomImageDTO = new RoomImageDTO();
                    roomImageDTO.setIdRoomImage(roomImage.getIdRoomImage());
                    roomImageDTO.setImageRoom(roomImage.getImageRoom());
                    roomImageDTOList.add(roomImageDTO);
                }
                roomDTO.setRoomImageSet(roomImageDTOList);

                roomDTOList.add(roomDTO);
                System.out.println(roomDTO);
            }
        }
        return roomDTOList;
    }

}
