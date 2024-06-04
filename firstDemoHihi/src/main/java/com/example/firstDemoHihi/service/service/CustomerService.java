package com.example.firstDemoHihi.service.service;


import com.example.firstDemoHihi.dto.AccountDTO;
import com.example.firstDemoHihi.dto.CustomerDTO;
import com.example.firstDemoHihi.entity.Account;
import com.example.firstDemoHihi.entity.Customer;
import com.example.firstDemoHihi.payload.request.CustomerCreationRequest;
import com.example.firstDemoHihi.payload.request.CustomerUpdateRequest;
import com.example.firstDemoHihi.repository.AccountRepository;
import com.example.firstDemoHihi.repository.CustomerRepository;
import com.example.firstDemoHihi.service.implement.ICustomer;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.ArrayList;
import java.util.List;
import java.util.Optional;

@Service
public class CustomerService implements ICustomer {
    @Autowired
    private CustomerRepository customerRepository;
    @Autowired
    private AccountRepository accountRepository;

    @Override
    public boolean createCustomer(CustomerCreationRequest request) {
        Customer customer = new Customer();
        try {

            Optional<Account> account = accountRepository.findById(request.getIdAccount());

            if (account.isPresent()) {
                customer.setAccount(account.get());
                customer.setFullName(request.getFullName());
                customer.setEmail(request.getEmail());
                customer.setPhone(request.getPhone());
                customer.setAddress(request.getAddress());
                customerRepository.save(customer);
                return true;
            } else {
                return false;
            }
        } catch (Exception e) {
            return false;
        }
    }

    @Override
    public List<CustomerDTO> getAllCustomer() {
        List<CustomerDTO> customerDTOList = new ArrayList<>();

        try {
            List<Customer> customerList = customerRepository.findAll();

            for (Customer customer : customerList
            ) {
                CustomerDTO customerDTO = new CustomerDTO();
                AccountDTO accountDTO = new AccountDTO();


                accountDTO.setIdAccount(customer.getAccount().getIdAccount());
                accountDTO.setUsername(customer.getAccount().getUsername());
                accountDTO.setPassword(customer.getAccount().getPassword());
                accountDTO.setRole(customer.getAccount().getRole());


                customerDTO.setIdCustomer(customer.getIdCustomer());
                customerDTO.setFullName(customer.getFullName());
                customerDTO.setEmail(customer.getEmail());
                customerDTO.setPhone(customer.getPhone());
                customerDTO.setAccountDTO(accountDTO);
                customerDTO.setAddress(customer.getAddress());
                customerDTOList.add(customerDTO);

            }
        } catch (Exception e) {
            System.out.println("Exception: " + e.getMessage());
        }
        System.out.println(customerDTOList);

        return customerDTOList;
    }

    @Override
    public CustomerDTO getCustomer(String id) {
        Optional<Customer> customer = customerRepository.findById(id);
        AccountDTO accountDTO = new AccountDTO();
        CustomerDTO customerDTO = new CustomerDTO();
        if (customer.isPresent()) {
            customerDTO.setIdCustomer(id);
            customerDTO.setFullName(customer.get().getFullName());
            customerDTO.setEmail(customer.get().getEmail());
            customerDTO.setPhone(customer.get().getPhone());

            accountDTO.setIdAccount(customer.get().getAccount().getIdAccount());
            accountDTO.setUsername(customer.get().getAccount().getUsername());
            accountDTO.setPassword(customer.get().getAccount().getPassword());
            accountDTO.setPassword(customer.get().getAccount().getRole());

            customerDTO.setAccountDTO(accountDTO);
        }
        return customerDTO;
    }

    @Override
    public boolean updateCustomer(String customerId, CustomerUpdateRequest customerUpdateRequest) {
        System.out.println(customerId);
        Optional<Customer> customer = customerRepository.findById(customerId);
        System.out.println(customer);
        if (customer.isPresent()) {
            Customer customerEntity = customer.get();
            System.out.println(customerEntity);
            try {

                customerEntity.setFullName(customerUpdateRequest.getFullName());
                System.out.println(customerUpdateRequest.getFullName());
                customerEntity.setEmail(customerUpdateRequest.getEmail());
                System.out.println(customerUpdateRequest.getEmail());
                customerEntity.setPhone(customerUpdateRequest.getPhone());
                customerEntity.setAddress(customerUpdateRequest.getAddress());
                System.out.println(customerUpdateRequest.getAddress());
                System.out.println(customerUpdateRequest.getPhone());
                customerRepository.save(customerEntity);
                return true;

            } catch (Exception e) {
                return false;
            }
        } else {
            return false;
        }

    }
}

