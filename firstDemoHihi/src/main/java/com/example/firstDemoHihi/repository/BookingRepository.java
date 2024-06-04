package com.example.firstDemoHihi.repository;

import com.example.firstDemoHihi.entity.Booking;
import org.springframework.data.jpa.repository.JpaRepository;

public interface BookingRepository extends JpaRepository<Booking, String> {

}
