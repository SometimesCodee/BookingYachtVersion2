package com.example.YachtBookingBackEnd.repository;

import com.example.YachtBookingBackEnd.dto.RoomScheduleDTO;
import com.example.YachtBookingBackEnd.entity.Room;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface RoomRepository extends JpaRepository<Room, String > {
    @Query("SELECT new com.example.YachtBookingBackEnd.dto.RoomScheduleDTO" +
            "(r.idRoom,r.name,r.area,s.idSchedule,s.startDate,s.endDate,rt.price, rt.type)" +
            " FROM Room r " +
            "JOIN r.yacht y " +
            "JOIN YachtSchedule ys ON y.idYacht = ys.yacht.idYacht " +
            "JOIN Schedule s ON ys.schedule.idSchedule = s.idSchedule " +
            "JOIN r.roomType rt " +
            "WHERE y.idYacht = :idYacht and s.idSchedule=:idSchedule")
    List<RoomScheduleDTO> findAllRoomsWithSchedulesByYachtId(@Param("idYacht") String idYacht,
                                                             @Param("idSchedule") String idSchedule);

    @Query("SELECT r FROM Room r WHERE r.yacht.idYacht = :idYacht")
    List<Room> findAllByYachtId(@Param("idYacht") String idYacht);

    @Query("SELECT r FROM Room r WHERE r.roomType.idRoomType = :idRoomType")
    List<Room> findAllByRoomTypeId(@Param("idRoomType") String idRoomType);

    @Query("SELECT COUNT(r) > 0 " +
            "FROM Room r " +
            "JOIN r.yacht y " +
            "JOIN y.yachtScheduleSet ys " +
            "WHERE r.idRoom = :idRoom " +
            "AND ys.schedule.idSchedule = :idSchedule")
    boolean isRoomAvailableInSchedule(@Param("idRoom") String idRoom, @Param("idSchedule") String idSchedule);

    @Query("SELECT r FROM Room r WHERE r.yacht.idYacht = :yachtId AND r.idRoom NOT IN :bookedRoomIds")
    List<Room> findUnbookedRoomsByYachtAndSchedule(@Param("yachtId") String yachtId, @Param("bookedRoomIds") List<String> bookedRoomIds);
}
