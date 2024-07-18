package com.example.YachtBookingBackEnd.repository;

import com.example.YachtBookingBackEnd.entity.Account;
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
    @Query("SELECT c from Company c WHERE c.email =:email")
    Company findCompanyByEmail(@Param("email") String email);

    @Query("SELECT f FROM Feedback f join Yacht y on f.yacht.idYacht = y.idYacht join Company c on y.company.idCompany = c.idCompany where c.idCompany = :idCompany")
    List<Feedback> findFeedbacksByCompanyId(@Param("idCompany") String idCompany);

    @Query("SELECT c.idCompany FROM Company c WHERE c.account.idAccount = :idAccount AND c.exist = 1")
    String findIdCompanyByIdAccount(@Param("idAccount") String idAccount);

    @Query("SELECT COUNT(c) > 0 FROM Company c WHERE c.email = :email")
    boolean checkEmailExist(@Param("email") String email);
    @Query("SELECT c.account from Company c where c.idCompany=:idCompany")
    Account getAccountByIdCompany(@Param("idCompany") String idCompany);

    @Query("SELECT c " +
            "FROM Company c " +
            "JOIN Account a ON a.idAccount = c.account.idAccount " +
            "JOIN Customer cu ON cu.idCustomer = a.customer.idCustomer " +
            "JOIN BookingOrder b ON b.customer.idCustomer = cu.idCustomer " +
            "WHERE b.idBooking = :idBooking")
    Company findCompanyByIdBooking(@Param("idBooking") String idBooking);

}
