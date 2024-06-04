package com.example.firstDemoHihi.service.service;

import com.example.firstDemoHihi.entity.Customer;
import com.example.firstDemoHihi.entity.Wallet;
import com.example.firstDemoHihi.payload.request.UpdateWalletRequest;
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

    @Override
    public long increaseBalance(UpdateWalletRequest request, String id) {

        Wallet wallet = walletRepository.findWalletByCustomerIdCustomer(id);

        long money = wallet.getBalance();
        long increaseBalance = request.getBalance();
        wallet.setBalance(money+increaseBalance);
        walletRepository.save(wallet);
        return money+increaseBalance;
    }

    @Override
    public long decreaseBalance(UpdateWalletRequest request, String id) {
        Wallet wallet = walletRepository.findWalletByCustomerIdCustomer(id);

        long money = wallet.getBalance();
        long decreaseBalance = request.getBalance();
        if(money>= decreaseBalance){
            wallet.setBalance(money-decreaseBalance);
            walletRepository.save(wallet);
        }
        return money-decreaseBalance;

    }


}
