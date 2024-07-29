package com.example.YachtBookingBackEnd.repository;

import com.example.YachtBookingBackEnd.entity.BookingOrder;
import com.example.YachtBookingBackEnd.entity.Room;
import com.example.YachtBookingBackEnd.entity.Schedule;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import java.util.List;
import java.util.Optional;

@Repository
public interface BookingOrderRepository extends JpaRepository<BookingOrder, String> {
    Optional<BookingOrder> findByTxnRef(String txnRef);

    @Query("SELECT b FROM BookingOrder b " +
            "JOIN FETCH b.bookingRoomSet br " +
            "JOIN FETCH  br.room r " +
            "JOIN FETCH  r.yacht y " +
            "WHERE  y.company.idCompany = :idCompany ")
    List<BookingOrder> findBookingOrdersByCompany(@Param("idCompany") String idCompany);

    @Query("SELECT b " +
            "FROM BookingOrder b " +
            "WHERE b.customer.idCustomer = :idCustomer")
    List<BookingOrder> findBookingOrdersByCustomer(@Param("idCustomer") String idCustomer);

    @Query("SELECT b " +
            "FROM BookingOrder b " +
            "WHERE b.customer.idCustomer = :idCustomer " +
            "AND b.idBooking = :idBooking")
    BookingOrder getDetailBookingByCustomer(@Param("idCustomer") String idCustomer, @Param("idBooking") String idBooking);

    @Query("SELECT COUNT(b) > 0 " +
            "FROM  BookingOrder b " +
            "JOIN b.bookingRoomSet br " +
            "WHERE br.room = :room AND b.schedule = :schedule " +
            "AND b.status != 'Cancelled'")
    boolean existsByRoomAndSchedule(@Param("room") Room room, @Param("schedule") Schedule schedule);

    @Query("SELECT bo FROM BookingOrder bo WHERE bo.idBooking = :idBooking AND bo.customer.idCustomer = :idCustomer AND bo.status = 'completed'")
    Optional<BookingOrder> findByIdAndCustomerIdAndStatus(@Param("idBooking") String idBooking, @Param("idCustomer") String idCustomer);

    @Query("SELECT b FROM BookingOrder b " +
            "JOIN FETCH b.bookingRoomSet br " +
            "JOIN FETCH  br.room r " +
            "JOIN FETCH  r.yacht y " +
            "WHERE  y.company.idCompany = :idCompany " +
            "AND (b.amount >= :min OR :min IS NULL) " +
            "AND (b.amount <= :max OR :max IS NULL) " +
            "ORDER BY b.amount ASC ")
    List<BookingOrder> findPriceByRange(@Param("idCompany") String idCompany, @Param("min") Long min, @Param("max") Long max);

    @Query("SELECT b " +
            "FROM BookingOrder b " +
            "WHERE b.status = :status")
    List<BookingOrder> findAllByStatus(@Param("status") String status);

    @Query("SELECT bo FROM BookingOrder bo WHERE bo.idBooking = :id")
    Optional<BookingOrder> findById(@Param("id") String id);

    @Query("SELECT COUNT(b) > 0 " +
            "FROM BookingOrder  b " +
            "WHERE b.schedule = :schedule " +
            "AND b.status = 'Confirmed' " +
            "OR b.status = 'Pending'")
    boolean findBySchedule(@Param("schedule") Schedule schedule);

    @Query("SELECT b FROM BookingOrder b " +
            "JOIN FETCH b.bookingRoomSet br " +
            "JOIN FETCH  br.room r " +
            "JOIN FETCH  r.yacht y " +
            "WHERE  y.company.idCompany = :idCompany " +
            "AND b.status = 'Confirmed'" +
            "AND MONTH (b.bookingTime) = :month " +
            "AND YEAR(b.bookingTime) = :year")
    List<BookingOrder> getBooking(@Param("idCompany") String idCompany,
                                     @Param("month") String month,
                                     @Param("year") String year
    );


    @Query("SELECT b FROM BookingOrder b " +
            "JOIN FETCH b.bookingRoomSet br " +
            "JOIN FETCH br.room r " +
            "JOIN FETCH r.yacht y " +
            "JOIN FETCH b.bookingServiceSet bs " +
            "JOIN FETCH bs.service s " +
            "WHERE  y.company.idCompany = :idCompany " +
            "AND b.status = 'Confirmed' " +
            "AND MONTH(b.bookingTime) = :month " +
            "AND YEAR(b.bookingTime) = :year")
    List<BookingOrder> getTotalBookingByCompany(@Param("idCompany") String idCompany,
                                              @Param("month") String month,
                                              @Param("year") String year);

    @Query("SELECT b FROM BookingOrder b " +
            "JOIN FETCH b.bookingRoomSet br " +
            "JOIN FETCH  br.room r " +
            "JOIN FETCH  r.yacht y " +
            "WHERE  y.company.idCompany = :idCompany " +
            "AND MONTH (b.bookingTime) = :month " +
            "and YEAR(b.bookingTime) = :year")
    List<BookingOrder> getAllBooking(@Param("idCompany") String idCompany,
                                       @Param("month") String month,
                                       @Param("year") String year
    );

}
