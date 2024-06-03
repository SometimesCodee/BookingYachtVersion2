package com.example.firstDemoHihi.service.service;

import com.example.firstDemoHihi.entity.Customer;
import com.example.firstDemoHihi.entity.Wallet;
import com.example.firstDemoHihi.payload.request.WalletCreationRequest;
import com.example.firstDemoHihi.repository.CustomerRepository;
import com.example.firstDemoHihi.repository.WalletRepository;
import com.example.firstDemoHihi.service.implement.IWallet;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

@Service
public class WalletService implements IWallet {
    @Autowired
    private WalletRepository walletRepository;
    @Autowired
    private CustomerRepository customerRepository;

    @Override
    public boolean createWallet(WalletCreationRequest request) {
        Wallet wallet = new Wallet();
        Customer customer = customerRepository.findCustomerByIdCustomer(request.getIdCustomer());
        try {
            if (customer != null) {
                wallet.setBankNumber(request.getBankNumber());
                wallet.setBalance(0);
                wallet.setCustomer(customer);

                walletRepository.save(wallet);

                return true;
            }
        } catch (Exception e) {
            return false;
        }
        return false;
    }


}
