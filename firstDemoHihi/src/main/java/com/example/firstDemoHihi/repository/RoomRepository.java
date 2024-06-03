package com.example.firstDemoHihi.repository;

import com.example.firstDemoHihi.entity.Room;
import org.springframework.data.jpa.repository.JpaRepository;

public interface RoomRepository extends JpaRepository<Room, String> {
}
