package com.example.firstDemoHihi.service.implement;

import com.example.firstDemoHihi.dto.YachtDTO;
import com.example.firstDemoHihi.entity.Yacht;
import com.example.firstDemoHihi.payload.request.YachtRequest;
import org.springframework.web.multipart.MultipartFile;

import java.util.List;

public interface IYacht {
    List<YachtDTO> getAllYacht();
    boolean insertYacht(String name, MultipartFile image, long price, String idCompany, String idYachtType, String idLocation);
    boolean hiddenYacht(String id);
    boolean updateYacht(String id, String name,MultipartFile image, long price, String idYachtType, String idLocation);
    List<YachtDTO> findYachtByCompanyId(String companyId);
}
