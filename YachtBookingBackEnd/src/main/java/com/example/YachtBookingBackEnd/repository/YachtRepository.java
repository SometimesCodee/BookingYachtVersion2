package com.example.YachtBookingBackEnd.repository;

import com.example.YachtBookingBackEnd.entity.Service;
import com.example.YachtBookingBackEnd.entity.Yacht;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import java.util.List;
@Repository
public interface YachtRepository extends JpaRepository<Yacht, String> {
    @Query("SELECT y FROM Yacht y WHERE y.company.exist = 1")
    List<Yacht> findAllYachts();


    @Query("SELECT y FROM Yacht y WHERE y.company.idCompany = :companyId AND y.company.exist = 1")
    List<Yacht> findAllByCompanyId(@Param("companyId") String companyId);


    @Query(value = "SELECT y.* FROM yacht y JOIN yacht_schedule ys ON y.id_yacht = ys.id_yacht JOIN schedule s ON ys.id_schedule = s.id_schedule JOIN booking_order bo ON bo.id_schedule = s.id_schedule JOIN bill b ON b.id_booking = bo.id_booking WHERE bo.id_customer = :idCustomer AND bo.id_booking = :idBooking", nativeQuery = true)
    Yacht findYachtsByCustomerAndBooking(@Param("idCustomer") String idCustomer, @Param("idBooking") String idBooking);

    @Query("SELECT y " +
            "FROM Feedback f " +
            "JOIN f.yacht y " +
            "WHERE f.idBooking = :idBooking " +
            "AND f.customer.idCustomer = :idCustomer")
    Yacht findByCustomerAndBooking(@Param("idCustomer") String idCustomer, @Param("idBooking") String idBooking);

    @Query("SELECT y.idYacht " +
            "FROM Yacht y " +
            "JOIN y.yachtScheduleSet ys " +
            "WHERE ys.schedule.idSchedule = :idSchedule")
    String getIdByService(@Param("idSchedule") String idSchedule);
}
