package com.example.YachtBookingBackEnd.repository;

import com.example.YachtBookingBackEnd.entity.Account;
import com.example.YachtBookingBackEnd.entity.Company;
import com.example.YachtBookingBackEnd.entity.Customer;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.Optional;

@Repository
public interface AccountRepository extends JpaRepository<Account, String> {
    Account findAccountByUsername(String username);
    Optional<Account> findByUsername(String username);
    boolean existsByUsername(String username);
    Account findAccountByCustomer(Customer customer);
    Account findAccountByCompany(Company company);
}
