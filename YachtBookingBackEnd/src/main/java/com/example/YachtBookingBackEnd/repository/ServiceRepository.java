package com.example.YachtBookingBackEnd.repository;

import com.example.YachtBookingBackEnd.entity.Service;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import java.util.List;
import java.util.Optional;

@Repository
public interface ServiceRepository extends JpaRepository<Service,String> {
//    Optional<Service> findByService(String service);
    Service findByService(String service);

}
