package com.example.YachtBookingBackEnd.repository;

import com.example.YachtBookingBackEnd.entity.Account;
import com.example.YachtBookingBackEnd.entity.Company;
import com.example.YachtBookingBackEnd.entity.Customer;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import java.util.Optional;

@Repository
public interface AccountRepository extends JpaRepository<Account, String> {
    @Query("SELECT a " +
            "FROM Account a " +
            "WHERE a.username = :username " +
            "AND a.status = 1")
    Account findAccountByUsername(@Param("username")String username);
    Optional<Account> findByUsername(String username);
    boolean existsByUsername(String username);
    Account findAccountByCustomer(Customer customer);
    Account findAccountByCompany(Company company);
}
