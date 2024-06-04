package com.example.firstDemoHihi.service.service;

import com.example.firstDemoHihi.dto.*;
import com.example.firstDemoHihi.entity.Company;
import com.example.firstDemoHihi.entity.Location;
import com.example.firstDemoHihi.entity.Yacht;
import com.example.firstDemoHihi.entity.YachtType;
import com.example.firstDemoHihi.payload.request.YachtRequest;
import com.example.firstDemoHihi.repository.CompanyRepository;
import com.example.firstDemoHihi.repository.LocationRepository;
import com.example.firstDemoHihi.repository.YachtRepository;
import com.example.firstDemoHihi.repository.YachtTypeRepository;
import com.example.firstDemoHihi.service.implement.IFile;
import com.example.firstDemoHihi.service.implement.IYacht;
import lombok.extern.slf4j.Slf4j;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.web.OffsetScrollPositionHandlerMethodArgumentResolver;
import org.springframework.stereotype.Service;
import org.springframework.web.multipart.MultipartFile;

import java.util.ArrayList;
import java.util.List;
import java.util.Optional;

@Slf4j
@Service
public class YachtService implements IYacht {
    @Autowired
    YachtRepository yachtRepository;
    @Autowired
    CompanyRepository companyRepository;
    @Autowired
    LocationRepository locationRepository;
    @Autowired
    YachtTypeRepository yachtTypeRepository;
    @Autowired
    private OffsetScrollPositionHandlerMethodArgumentResolver offsetResolver;
    @Autowired
    IFile fileService;

    @Override
    public List<YachtDTO> getAllYacht() {
        List<YachtDTO> listYacht = new ArrayList<>();
        try{
            List<Yacht> yachtList = yachtRepository.findAll();
            System.out.println(yachtList);
            for (Yacht yacht : yachtList) {
                YachtDTO yachtDTO = new YachtDTO();
                if(yacht.getExist() == 1) {
                    yachtDTO.setIdYacht(yacht.getIdYacht());
                    yachtDTO.setName(yacht.getName());
                    yachtDTO.setImage(yacht.getImage());
                    yachtDTO.setPrice(yacht.getPrice());
                    yachtDTO.setExist(yacht.getExist());

                    YachtTypeDTO yachtTypeDTO = new YachtTypeDTO();
                    yachtTypeDTO.setIdYachtType(yacht.getYachtType().getIdYachtType());
                    yachtTypeDTO.setStarRanking(yacht.getYachtType().getStarRanking());

                    yachtDTO.setYachtTypeDTO(yachtTypeDTO);

                    CompanyDTO companyDTO = new CompanyDTO();
                    companyDTO.setIdCompany(yacht.getCompany().getIdCompany());
                    companyDTO.setName(yacht.getCompany().getName());
                    companyDTO.setAddress(yacht.getCompany().getAddress());
                    companyDTO.setLogo(yacht.getCompany().getLogo());
                    companyDTO.setEmail(yacht.getCompany().getEmail());
                    companyDTO.setExist(yacht.getCompany().getExist());

                    yachtDTO.setCompanyDTO(companyDTO);

                    LocationDTO locationDTO = new LocationDTO();
                    locationDTO.setName(yacht.getLocation().getName());
                    locationDTO.setIdLocation(yacht.getLocation().getIdLocation());

                    yachtDTO.setLocationDTO(locationDTO);

                    listYacht.add(yachtDTO);
                }

            }
        }catch (Exception e){
            System.out.println("YachtDTO " + e.getMessage());
        }
        System.out.println(listYacht);
        return listYacht;
    }

    @Override
    public boolean insertYacht(String name, MultipartFile image, long price, String idCompany, String idYachtType, String idLocation) {
        try{
            boolean successUpFile =  fileService.save(image);
            if(successUpFile) {
                Yacht yacht = new Yacht();
                yacht.setName(name);
                yacht.setImage(image.getOriginalFilename());
                yacht.setPrice(price);
                yacht.setExist(1);

                Optional<Company> company = companyRepository.findById(idCompany);
                if (company.isPresent()) {
                    yacht.setCompany(company.get());
                } else {
                    log.error("loi company");
                    return false;
                }
                Optional<YachtType> yachtType = yachtTypeRepository.findById(idYachtType);
                if (yachtType.isPresent()) {
                    yacht.setYachtType(yachtType.get());
                } else {
                    log.error("loi yacht type");
                    return false;
                }
                Optional<Location> location = locationRepository.findById(idLocation);
                if (location.isPresent()) {
                    yacht.setLocation(location.get());
                } else {
                    log.error("loi location");
                    return false;
                }

                yachtRepository.save(yacht);

                return true;
            }
        }catch (Exception e){
            System.out.println("insertYacht " + e.getMessage());
        }
        log.error("loi default");
        return false;
    }

    @Override
    public boolean hiddenYacht(String id) {
        try{
            Optional<Yacht> yacht = yachtRepository.findById(id);
            if (yacht.isPresent()) {
                Yacht existingYacht = yacht.get();
                existingYacht.setExist(0);
                yachtRepository.save(existingYacht);
                return true;
            }
        }catch (Exception e){
            System.out.println(e.getMessage());
        }
        return false;
    }

    @Override
    public boolean updateYacht(String id, String name,MultipartFile image, long price, String idYachtType, String idLocation) {
        try{
            Optional<Yacht> yacht = yachtRepository.findById(id);
            if (yacht.isPresent()) {
                Yacht existingYacht = yacht.get();
                existingYacht.setName(name);
                existingYacht.setImage(image.getOriginalFilename());
                existingYacht.setPrice(price);

                YachtType yachtType = new YachtType();
                yachtType.setIdYachtType(idYachtType);
                existingYacht.setYachtType(yachtType);

                Location location = new Location();
                location.setIdLocation(idLocation);
                existingYacht.setLocation(location);

                yachtRepository.save(existingYacht);
                return true;
            }
        }catch (Exception e){
            System.out.println(e.getMessage());
        }
        return false;
    }

    @Override
    public List<YachtDTO> findYachtByCompanyId(String companyId) {
        List<YachtDTO> yachtDTOList = new ArrayList<>();
        try{
            List<Yacht> yachtList = yachtRepository.findAllByCompanyId(companyId);
            if(yachtList != null) {
                for(Yacht yacht : yachtList){
                    YachtDTO yachtDTO = new YachtDTO();
                    yachtDTO.setIdYacht(yacht.getIdYacht());
                    yachtDTO.setName(yacht.getName());
                    yachtDTO.setImage(yacht.getImage());
                    yachtDTO.setPrice(yacht.getPrice());
                    yachtDTO.setExist(yacht.getExist());

                    LocationDTO locationDTO = new LocationDTO();
                    locationDTO.setName(yacht.getLocation().getName());
                    locationDTO.setIdLocation(yacht.getLocation().getIdLocation());

                    yachtDTO.setLocationDTO(locationDTO);

                    YachtTypeDTO yachtTypeDTO = new YachtTypeDTO();
                    yachtTypeDTO.setIdYachtType(yacht.getYachtType().getIdYachtType());
                    yachtTypeDTO.setStarRanking(yacht.getYachtType().getStarRanking());

                    yachtDTO.setYachtTypeDTO(yachtTypeDTO);

                    yachtDTOList.add(yachtDTO);
                }
            }
        }catch (Exception e){
            System.out.println(e.getMessage());
        }
        return yachtDTOList;
    }


}
