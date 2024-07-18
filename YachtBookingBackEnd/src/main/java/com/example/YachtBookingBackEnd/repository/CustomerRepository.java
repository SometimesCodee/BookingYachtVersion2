package com.example.YachtBookingBackEnd.repository;

import com.example.YachtBookingBackEnd.entity.Account;
import com.example.YachtBookingBackEnd.entity.BookingOrder;
import com.example.YachtBookingBackEnd.entity.Customer;
import com.example.YachtBookingBackEnd.entity.Feedback;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface CustomerRepository extends JpaRepository<Customer, String> {
    Customer findCustomerByIdCustomer(String customerId);

    Customer findCustomerByAccount(Account account);

    @Query("SELECT c.idCustomer FROM Customer c WHERE c.account.idAccount = :idAccount")
    String findIdCustomerByIdAccount(@Param("idAccount") String idAccount);
    @Query("SELECT c FROM Customer c WHERE c.email = :email")
    Customer findCustomerByEmail(@Param("email") String email);
    @Query("SELECT c.account from Customer c where c.idCustomer=:idCustomer")
    Account getAccountByIdCustomer(@Param("idCustomer") String idCustomer);


    @Query("SELECT b.idBooking FROM BookingOrder b join b.customer c where c.idCustomer = :idCustomer")
    List<String> findIdBookingByCustomerId(@Param("idCustomer") String idCustomer);
}
