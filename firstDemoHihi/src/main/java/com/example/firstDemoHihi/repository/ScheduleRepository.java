package com.example.firstDemoHihi.repository;

import com.example.firstDemoHihi.entity.Schedule;
import org.springframework.data.jpa.repository.JpaRepository;

public interface ScheduleRepository extends JpaRepository<Schedule, String> {
}
