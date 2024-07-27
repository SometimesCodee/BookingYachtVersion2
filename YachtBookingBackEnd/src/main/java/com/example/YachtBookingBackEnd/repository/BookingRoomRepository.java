package com.example.YachtBookingBackEnd.repository;

import com.example.YachtBookingBackEnd.entity.BookingRoom;
import com.example.YachtBookingBackEnd.entity.key.KeysBookingRoom;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface BookingRoomRepository extends JpaRepository<BookingRoom, KeysBookingRoom> {
    @Query("SELECT br.room.idRoom FROM BookingRoom br WHERE br.bookingOrder.schedule.idSchedule = :scheduleId AND (br.bookingOrder.status = 'Confirmed' OR br.bookingOrder.status = 'Pending')")
    List<String> findBookedRoomIdsByScheduleId(@Param("scheduleId") String scheduleId);

}

