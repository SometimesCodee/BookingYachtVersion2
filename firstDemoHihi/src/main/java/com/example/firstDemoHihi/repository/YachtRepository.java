package com.example.firstDemoHihi.repository;

import com.example.firstDemoHihi.dto.YachtDTO;
import com.example.firstDemoHihi.entity.Yacht;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import java.util.List;
import java.util.Optional;


@Repository
public interface YachtRepository extends JpaRepository<Yacht, String> {
//    @Query("SELECT y FROM Yacht y WHERE y.owner.idOwner = :ownerId")
//    List<Yacht> findAllByOwnerId(@Param("ownerId") String ownerId);
    @Query("SELECT y FROM Yacht y WHERE y.company.idCompany = :companyId")
    List<Yacht> findAllByCompanyId(@Param("companyId") String companyId);
}
