package com.example.YachtBookingBackEnd.service.service;

import com.example.YachtBookingBackEnd.dto.*;
import com.example.YachtBookingBackEnd.entity.Company;
import com.example.YachtBookingBackEnd.entity.Location;
import com.example.YachtBookingBackEnd.entity.Yacht;
import com.example.YachtBookingBackEnd.entity.YachtType;
import com.example.YachtBookingBackEnd.repository.CompanyRepository;
import com.example.YachtBookingBackEnd.repository.LocationRepository;
import com.example.YachtBookingBackEnd.repository.YachtRepository;
import com.example.YachtBookingBackEnd.repository.YachtTypeRepository;
import com.example.YachtBookingBackEnd.service.implement.IFile;
import com.example.YachtBookingBackEnd.service.implement.IYacht;
import net.sf.jsqlparser.expression.DateTimeLiteralExpression;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.web.multipart.MultipartFile;

import java.time.LocalDate;
import java.util.ArrayList;
import java.util.List;
import java.util.Optional;

@Service
public class YachtService implements IYacht {
    @Autowired
    YachtRepository yachtRepository;
    @Autowired
    IFile iFile;
    @Autowired
    CompanyRepository companyRepository;
    @Autowired
    LocationRepository locationRepository;
    @Autowired
    YachtTypeRepository yachtTypeRepository;

    @Override
    public List<YachtDTO> getAllYacht() {
        List<YachtDTO> listYachtDTO = new ArrayList<>();
        try{
            List<Yacht> yachtList = yachtRepository.findAll();
            System.out.println(yachtList);
            for (Yacht yacht : yachtList) {
                YachtDTO yachtDTO = new YachtDTO();
                if(yacht.getExist() == 1) {
                    yachtDTO.setIdYacht(yacht.getIdYacht());
                    yachtDTO.setName(yacht.getName());
                    yachtDTO.setImage(yacht.getImage());
                    yachtDTO.setLaunch(yacht.getLaunch());
                    yachtDTO.setRule(yacht.getRule());
                    yachtDTO.setHullBody(yacht.getHullBody());
                    yachtDTO.setDescription(yacht.getDescription());
                    yachtDTO.setItinerary(yacht.getItinerary());

                    YachtTypeDTO yachtTypeDTO = new YachtTypeDTO();
                    yachtTypeDTO.setIdYachtType(yacht.getYachtType().getIdYachtType());
                    yachtTypeDTO.setStarRanking(yacht.getYachtType().getStarRanking());

                    yachtDTO.setYachtType(yachtTypeDTO);

                    CompanyDTO companyDTO = new CompanyDTO();
                    companyDTO.setIdCompany(yacht.getCompany().getIdCompany());
                    companyDTO.setName(yacht.getCompany().getName());
                    companyDTO.setAddress(yacht.getCompany().getAddress());
                    companyDTO.setLogo(yacht.getCompany().getLogo());
                    companyDTO.setEmail(yacht.getCompany().getEmail());

                    yachtDTO.setCompany(companyDTO);

                    LocationDTO locationDTO = new LocationDTO();
                    locationDTO.setName(yacht.getLocation().getName());
                    locationDTO.setIdLocation(yacht.getLocation().getIdLocation());

                    yachtDTO.setLocation(locationDTO);



                    listYachtDTO.add(yachtDTO);
                }

            }
        }catch (Exception e){
            System.out.println("Error YachtDTO " + e.getMessage());
        }
        return listYachtDTO;
    }

    @Override
    public boolean insertYacht(String name,
                               MultipartFile image,
                               LocalDate launch,
                               String hullBody,
                               String description,
                               String rule,
                               String itinerary,
                               String idYachtType,
                               String idLocation,
                               String idCompany) {
        try{
            Yacht yacht = new Yacht();
            yacht.setName(name);
            iFile.save(image);
            yacht.setImage(image.getOriginalFilename());
            yacht.setLaunch(launch);
            yacht.setDescription(description);
            yacht.setRule(rule);
            yacht.setHullBody(hullBody);
            yacht.setItinerary(itinerary);
            yacht.setExist(1);

            Optional<Company> company = companyRepository.findById(idCompany);
            if (company.isPresent()) {
                yacht.setCompany(company.get());
            } else {
                System.out.println("Error company");
                return false;
            }
            Optional<YachtType> yachtType = yachtTypeRepository.findById(idYachtType);
            if (yachtType.isPresent()) {
                yacht.setYachtType(yachtType.get());
            } else {
                System.out.println("Error yacht type");
                return false;
            }
            Optional<Location> location = locationRepository.findById(idLocation);
            if (location.isPresent()) {
                yacht.setLocation(location.get());
            } else {
                System.out.println("Error location");
                return false;
            }
            yachtRepository.save(yacht);
            return true;
        }catch (Exception e){
            System.out.println("Error insert yacht " + e.getMessage());
        }
        return false;
    }

    @Override
    public boolean deleteYacht(String id) {
        try{
            Optional<Yacht> yacht = yachtRepository.findById(id);
            if(yacht.isPresent()){
                yacht.get().setExist(0);
                yachtRepository.save(yacht.get());
            }
            return true;
        }catch (Exception e){
            System.out.println("Error hidden Yacht " + e.getMessage());
        }
        return false;
    }

    @Override
    public boolean updateYacht(String yachtId, String name, MultipartFile image, String hullBody, String description, String rule, String itinerary, String idYachtType, String idLocation) {
        try{
            Optional<Yacht> yacht = yachtRepository.findById(yachtId);
            if(yacht.isPresent()){
                if(name != null){
                    yacht.get().setName(name);
                }else{
                    yacht.get().setName(yacht.get().getName());
                }
                if(image != null){
                    iFile.save(image);
                    yacht.get().setImage(image.getOriginalFilename());
                }else{
                    yacht.get().setImage(yacht.get().getImage());
                }
                if(hullBody != null){
                    yacht.get().setHullBody(hullBody);
                }else{
                    yacht.get().setHullBody(yacht.get().getHullBody());
                }
                if(description != null){
                    yacht.get().setDescription(description);
                }else{
                    yacht.get().setDescription(yacht.get().getDescription());
                }
                if(rule != null){
                    yacht.get().setRule(rule);
                }else{
                    yacht.get().setRule(yacht.get().getRule());
                }
                if(itinerary != null){
                    yacht.get().setItinerary(itinerary);
                }else{
                    yacht.get().setItinerary(yacht.get().getItinerary());
                }
                if(idYachtType != null){
                    YachtType yachtType = new YachtType();
                    yachtType.setIdYachtType(idYachtType);
                    yacht.get().setYachtType(yachtType);
                }else{
                    yacht.get().setYachtType(yacht.get().getYachtType());
                }
                if(idLocation != null){
                    Location location = new Location();
                    location.setIdLocation(idLocation);
                    yacht.get().setLocation(location);
                }else{
                    yacht.get().setLocation(yacht.get().getLocation());
                }

                yachtRepository.save(yacht.get());
            }
            return true;
        }catch (Exception e){
            System.out.println("Error update yacht " + e.getMessage());
        }
        return false;
    }

    @Override
    public List<YachtDTO> findYachtByCompanyId(String companyId) {
        List<YachtDTO> yachtDTOList = new ArrayList<>();
        try{
            List<Yacht> yachtList = yachtRepository.findAllByCompanyId(companyId);
            if(yachtList != null) {
                for (Yacht yacht : yachtList) {
                    YachtDTO yachtDTO = new YachtDTO();
                    if(yacht.getExist() == 1) {
                        yachtDTO.setIdYacht(yacht.getIdYacht());
                        yachtDTO.setName(yacht.getName());
                        yachtDTO.setImage(yacht.getImage());
                        yachtDTO.setLaunch(yacht.getLaunch());
                        yachtDTO.setRule(yacht.getRule());
                        yachtDTO.setHullBody(yacht.getHullBody());
                        yachtDTO.setDescription(yacht.getDescription());
                        yachtDTO.setItinerary(yacht.getItinerary());

                        YachtTypeDTO yachtTypeDTO = new YachtTypeDTO();
                        yachtTypeDTO.setIdYachtType(yacht.getYachtType().getIdYachtType());
                        yachtTypeDTO.setStarRanking(yacht.getYachtType().getStarRanking());

                        yachtDTO.setYachtType(yachtTypeDTO);

                        CompanyDTO companyDTO = new CompanyDTO();
                        companyDTO.setIdCompany(yacht.getCompany().getIdCompany());
                        companyDTO.setName(yacht.getCompany().getName());
                        companyDTO.setAddress(yacht.getCompany().getAddress());
                        companyDTO.setLogo(yacht.getCompany().getLogo());
                        companyDTO.setEmail(yacht.getCompany().getEmail());

                        yachtDTO.setCompany(companyDTO);

                        LocationDTO locationDTO = new LocationDTO();
                        locationDTO.setName(yacht.getLocation().getName());
                        locationDTO.setIdLocation(yacht.getLocation().getIdLocation());

                        yachtDTO.setLocation(locationDTO);

                        yachtDTOList.add(yachtDTO);
                    }
                }
            }
        }catch (Exception e){
            System.out.println("error find yacht by company id"+e.getMessage());
        }
        return yachtDTOList;
    }
    @Override
    public YachtDTO findYachtById(String id) {
        YachtDTO yachtDTO = new YachtDTO();
        try {
            Optional<Yacht> yacht = yachtRepository.findById(id);
            if(yacht.isPresent() && yacht.get().getExist() == 1) {
                yachtDTO.setIdYacht(yacht.get().getIdYacht());
                yachtDTO.setName(yacht.get().getName());
                yachtDTO.setImage(yacht.get().getImage());
                yachtDTO.setLaunch(yacht.get().getLaunch());
                yachtDTO.setRule(yacht.get().getRule());
                yachtDTO.setHullBody(yacht.get().getHullBody());
                yachtDTO.setDescription(yacht.get().getDescription());
                yachtDTO.setItinerary(yacht.get().getItinerary());

                YachtTypeDTO yachtTypeDTO = new YachtTypeDTO();
                yachtTypeDTO.setIdYachtType(yacht.get().getYachtType().getIdYachtType());
                yachtTypeDTO.setStarRanking(yacht.get().getYachtType().getStarRanking());

                yachtDTO.setYachtType(yachtTypeDTO);

                CompanyDTO companyDTO = new CompanyDTO();
                companyDTO.setIdCompany(yacht.get().getCompany().getIdCompany());
                companyDTO.setName(yacht.get().getCompany().getName());
                companyDTO.setAddress(yacht.get().getCompany().getAddress());
                companyDTO.setLogo(yacht.get().getCompany().getLogo());
                companyDTO.setEmail(yacht.get().getCompany().getEmail());

                yachtDTO.setCompany(companyDTO);

                LocationDTO locationDTO = new LocationDTO();
                locationDTO.setName(yacht.get().getLocation().getName());
                locationDTO.setIdLocation(yacht.get().getLocation().getIdLocation());

                yachtDTO.setLocation(locationDTO);
            }
        }catch (Exception e){
            System.out.println(e.getMessage());
        }
        return yachtDTO;
    }


}
