package com.example.firstDemoHihi.service.service;


import com.example.firstDemoHihi.dto.AccountDTO;

import com.example.firstDemoHihi.entity.Account;
import com.example.firstDemoHihi.payload.request.AccountCreationRequest;
import com.example.firstDemoHihi.payload.request.AccountUpdate;
import com.example.firstDemoHihi.repository.AccountRepository;
import com.example.firstDemoHihi.repository.OwnerRepository;
import com.example.firstDemoHihi.service.implement.IAccount;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;

import java.util.ArrayList;
import java.util.List;
import java.util.Optional;

@Service
public class AccountService implements IAccount {
    @Autowired
    private AccountRepository accountRepository;
    @Autowired
    private PasswordEncoder passwordEncoder;
    @Autowired
    private OwnerRepository ownerRepository;


    @Override
    public boolean createAccount(AccountCreationRequest request){
        Optional<Account> listFound =accountRepository.findByUsername(request.getUsername());
        if(!listFound.isEmpty()){
            return false;
        }

        Account account = new Account();

        account.setUsername(request.getUsername());
        System.out.println(request.getUsername());
        account.setPassword(passwordEncoder.encode(request.getPassword()));
        System.out.println(request.getPassword());
        account.setRole(request.getRole());

        accountRepository.save(account);

        return true;
    }
    @Override
    public List<AccountDTO> getAccountCustomer() {
        List<AccountDTO> accountDTOList = new ArrayList<>();

        try {
            List<Account> accountList = accountRepository.findAll();

            for (Account account : accountList
            ) {

                AccountDTO accountDTO = new AccountDTO();

                accountDTO.setIdAccount(account.getIdAccount());
                accountDTO.setUsername(account.getUsername());
                accountDTO.setPassword(account.getPassword());
                accountDTO.setRole(account.getRole());
                String role = account.getRole();
                if (role.equals("CUSTOMER")) {
                    accountDTOList.add(accountDTO);
                }
                System.out.println(account);
            }
        } catch (Exception e) {
            System.out.println("Exception: " + e.getMessage());
        }


        return accountDTOList;
    }
    @Override
    public AccountDTO get1Account(String  id)  {
        Optional<Account> account=  accountRepository.findById(id);

        AccountDTO accountDTO = new AccountDTO();
        if(account.isPresent()){
            accountDTO.setIdAccount(id);
            accountDTO.setUsername(account.get().getUsername());
            accountDTO.setPassword(account.get().getPassword());
            accountDTO.setRole(account.get().getRole());
        }
        return accountDTO;
    }

    @Override
    public void deleteAccount(String id){
        accountRepository.deleteById(id);
    }
    public Account getAccount2(String id){
        return accountRepository.findById(id)
                . orElseThrow(() -> new RuntimeException("Can not found id: " + id));
    }
    @Override
    public boolean updateAccount(String customerId, AccountUpdate request) {

        Optional<Account> account = accountRepository.findById(customerId);
        if (account.isPresent()) {
            Account account1 = account.get();
            try {
                account1.setPassword(request.getPassword());
                accountRepository.save(account.get());
                return true;
            }catch (Exception e){
                return false;
            }
        }else{
            return false;
        }

    }
}
