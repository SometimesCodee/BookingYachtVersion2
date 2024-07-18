package com.example.YachtBookingBackEnd.mapper;

import com.example.YachtBookingBackEnd.dto.*;
import com.example.YachtBookingBackEnd.entity.*;

import java.util.Set;
import java.util.stream.Collectors;

public class BookingOrderMapper {
    public static BookingOrderDTO toDTO(BookingOrder bookingOrder) {
        BookingOrderDTO dto = new BookingOrderDTO();
        dto.setIdBooking(bookingOrder.getIdBooking());
        dto.setBookingTime(bookingOrder.getBookingTime());
        dto.setAmount(bookingOrder.getAmount());
        dto.setRequirement(bookingOrder.getRequirement());
        dto.setStatus(bookingOrder.getStatus());
        dto.setReason(bookingOrder.getReason());

        //Map Schedule
        ScheduleDTO scheduleDTO = new ScheduleDTO();
        Schedule schedule = bookingOrder.getSchedule();
        scheduleDTO.setIdSchedule(schedule.getIdSchedule());
        scheduleDTO.setStartDate(schedule.getStartDate());
        scheduleDTO.setEndDate(schedule.getEndDate());
        dto.setSchedule(scheduleDTO);

        // Map customer info
        CustomerDTO customerDTO = new CustomerDTO();
        Customer customer = bookingOrder.getCustomer();
        customerDTO.setIdCustomer(customer.getIdCustomer());
        customerDTO.setFullName(customer.getFullName());
        customerDTO.setEmail(customer.getEmail());
        customerDTO.setPhone(customer.getPhoneNumber());
        customerDTO.setAddress(customer.getAddress());
        dto.setCustomerDTO(customerDTO);

        //Map rooms
        Set<RoomDTO> roomDTOS = bookingOrder.getBookingRoomSet().stream()
                .map(bookingRoom -> {
                    RoomDTO roomDTO = new RoomDTO();
                    Room room = bookingRoom.getRoom();
                    roomDTO.setIdRoom(room.getIdRoom());
                    roomDTO.setName(room.getName());
                    roomDTO.setPrice(room.getRoomType().getPrice());
                    roomDTO.setArea(room.getArea());
                    roomDTO.setYachtId(room.getYacht().getIdYacht());
                    return roomDTO;
                }).collect(Collectors.toSet());
        dto.setRooms(roomDTOS);

        //Map services
        Set<ServiceDTO> serviceDTOS = bookingOrder.getBookingServiceSet().stream()
                .map(bookingService -> {
                    ServiceDTO serviceDTO = new ServiceDTO();
                    Service service = bookingService.getService();
                    serviceDTO.setIdService(service.getIdService());
                    serviceDTO.setService(service.getService());
                    serviceDTO.setPrice(service.getPrice());
                    return serviceDTO;
                }).collect(Collectors.toSet());
        dto.setServices(serviceDTOS);

        //Map yacht name
        if (!bookingOrder.getBookingRoomSet().isEmpty()) {
            Room getRoom = bookingOrder.getBookingRoomSet().iterator().next().getRoom();;
            Yacht yacht = getRoom.getYacht();
            dto.setYachtName(yacht.getName());
        }

        return dto;
    }
}
