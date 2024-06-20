package com.example.YachtBookingBackEnd.repository;

import com.example.YachtBookingBackEnd.entity.Company;
import com.example.YachtBookingBackEnd.entity.Feedback;
import com.example.YachtBookingBackEnd.entity.Yacht;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import java.util.List;
import java.util.Optional;

@Repository
public interface CompanyRepository extends JpaRepository<Company, String> {
    @Query("SELECT c FROM Company c WHERE c.name LIKE %:name% AND c.exist = 1")
    List<Company> findCompaniesByNameContaining(@Param("name") String name);

    @Query("SELECT c FROM Company c WHERE c.account.idAccount = :idAccount AND c.exist = 1")
    Optional<Company> findByIdAccountAndExist(@Param("idAccount") String idAccount);

    @Query("SELECT c FROM Company c WHERE c.idCompany = :idCompany AND c.exist = 1")
    Optional<Company> findByIdAndExist(@Param("idCompany") String idCompany);

    boolean existsCompanyByName(String name);

    @Query("SELECT f FROM Feedback f join Yacht y on f.yacht.idYacht = y.idYacht join Company c on y.company.idCompany = c.idCompany where c.idCompany = :idCompany")
    List<Feedback> findFeedbacksByCompanyId(@Param("idCompany") String idCompany);

    @Query("SELECT c.idCompany FROM Company c WHERE c.account.idAccount = :idAccount AND c.exist = 1")
    String findIdCompanyByIdAccount(@Param("idAccount") String idAccount);

}
