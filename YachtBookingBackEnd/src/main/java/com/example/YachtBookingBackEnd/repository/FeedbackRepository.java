package com.example.YachtBookingBackEnd.repository;

import com.example.YachtBookingBackEnd.entity.Feedback;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;

public interface FeedbackRepository extends JpaRepository<Feedback, String> {
    List<Feedback> findByYachtIdYacht(String yachtId);
    Feedback findFeedbackByIdBooking(String idBooking);
    boolean existsByIdBooking(String idBooking);
}
