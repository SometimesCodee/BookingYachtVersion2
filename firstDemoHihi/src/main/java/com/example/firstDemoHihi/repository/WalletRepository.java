package com.example.firstDemoHihi.repository;

import com.example.firstDemoHihi.entity.Wallet;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface WalletRepository extends JpaRepository<Wallet, String > {
    Wallet getWalletByCustomer_IdCustomer(String customerId);
    Wallet findWalletByCustomerIdCustomer(String customerId);

}
