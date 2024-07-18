package com.example.YachtBookingBackEnd.service.service;

import com.example.YachtBookingBackEnd.dto.*;
import com.example.YachtBookingBackEnd.entity.*;
import com.example.YachtBookingBackEnd.repository.*;
import com.example.YachtBookingBackEnd.service.implement.IFile;
import com.example.YachtBookingBackEnd.service.implement.IYacht;
import net.sf.jsqlparser.expression.DateTimeLiteralExpression;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.web.multipart.MultipartFile;

import java.time.LocalDate;
import java.util.*;

@Service
public class YachtService implements IYacht {
    @Autowired
    YachtRepository yachtRepository;
    @Autowired
    IFile iFile;
    @Autowired
    CompanyRepository companyRepository;

    @Autowired
    RoomTypeRepository roomTypeRepository;
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
                    yachtDTO.setExist(yacht.getExist());

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
                    companyDTO.setExist(yacht.getCompany().getExist());

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
                    yacht.get().setName(name);
                    iFile.save(image);
                    yacht.get().setImage(image.getOriginalFilename());
                    yacht.get().setHullBody(hullBody);
                    yacht.get().setDescription(description);
                    yacht.get().setRule(rule);
                    yacht.get().setItinerary(itinerary);
                    YachtType yachtType = new YachtType();
                    yachtType.setIdYachtType(idYachtType);
                    yacht.get().setYachtType(yachtType);
                    Location location = new Location();
                    location.setIdLocation(idLocation);
                    yacht.get().setLocation(location);
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
                        yachtDTO.setExist(yacht.getExist());
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
                yachtDTO.setExist(yacht.get().getExist());
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


    @Override
    public PriceDTO getPriceRoom(String yachtId) {
        PriceDTO priceDTO = new PriceDTO();
        try{
//            List<RoomType> roomTypeList = roomTypeRepository.findAllByYachtId(yachtId);
            RoomType roomType1 = roomTypeRepository.findHighestPricedRoomTypeByYachtId(yachtId);
            long highestPrice = roomType1.getPrice();
            RoomType roomType2  =roomTypeRepository.findLowestPricedRoomTypeByYachtId(yachtId);
            long lowestPrice = roomType2.getPrice();

            priceDTO.setHighestPrice(highestPrice);
            priceDTO.setLowestPrice(lowestPrice);

        }catch (Exception e){
            System.out.println(e.getMessage());
        }
        return priceDTO;
    }


}
