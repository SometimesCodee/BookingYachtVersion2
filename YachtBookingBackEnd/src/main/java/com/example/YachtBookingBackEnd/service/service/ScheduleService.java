package com.example.YachtBookingBackEnd.service.service;

import com.example.YachtBookingBackEnd.dto.ScheduleDTO;
import com.example.YachtBookingBackEnd.entity.Schedule;
import com.example.YachtBookingBackEnd.entity.YachtSchedule;
import com.example.YachtBookingBackEnd.repository.ScheduleRepository;
import com.example.YachtBookingBackEnd.repository.YachtScheduleRepository;
import com.example.YachtBookingBackEnd.service.implement.ISchedule;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.ArrayList;
import java.util.Comparator;
import java.util.List;
import java.util.Optional;
import java.util.stream.Collectors;

@Service
public class ScheduleService implements ISchedule {
    @Autowired
    private ScheduleRepository scheduleRepository;
    @Autowired
    private YachtScheduleRepository yachtScheduleRepository;

    @Override
    public List<ScheduleDTO> getAllScheduleByYacht(String yachtId) {
        List<ScheduleDTO> scheduleDTOList = new ArrayList<>();
        try{
            List<YachtSchedule> yachtSchedules = yachtScheduleRepository.findSchedulesByYachtId(yachtId);
            if(!yachtSchedules.isEmpty()){
                for(YachtSchedule yachtSchedule: yachtSchedules){
                    ScheduleDTO scheduleDTO = new ScheduleDTO();
                    scheduleDTO.setIdSchedule(yachtSchedule.getSchedule().getIdSchedule());
                    scheduleDTO.setStartDate(yachtSchedule.getSchedule().getStartDate());
                    scheduleDTO.setEndDate(yachtSchedule.getSchedule().getEndDate());
                    scheduleDTOList.add(scheduleDTO);
                }
            }
        }catch (Exception e){
            System.out.println("error get all schedule "+e.getMessage());
        }


        // Sort by startDate using streams
        scheduleDTOList = scheduleDTOList.stream()
                .sorted(Comparator.comparing(ScheduleDTO::getStartDate))
                .collect(Collectors.toList());

        return scheduleDTOList;
    }

    @Override
    public List<ScheduleDTO> getAllSchedule() {
        List<ScheduleDTO> scheduleDTOList = new ArrayList<>();
        try{
            List<Schedule> scheduleList = scheduleRepository.findAll();
            if(!scheduleList.isEmpty()){
                for(Schedule schedule: scheduleList){
                    ScheduleDTO scheduleDTO = new ScheduleDTO();
                    scheduleDTO.setIdSchedule(schedule.getIdSchedule());
                    scheduleDTO.setStartDate(schedule.getStartDate());
                    scheduleDTO.setEndDate(schedule.getEndDate());
                    scheduleDTOList.add(scheduleDTO);
                }
            }
        }catch (Exception e){
            System.out.println("error get all schedule "+e.getMessage());
        }
        return scheduleDTOList;
    }

    @Override
    public ScheduleDTO getScheduleById(String idSchedule) {
        Optional<Schedule> schedule = scheduleRepository.findById(idSchedule);
        if(schedule.isPresent()){
            ScheduleDTO scheduleDTO = new ScheduleDTO();
            scheduleDTO.setIdSchedule(schedule.get().getIdSchedule());
            scheduleDTO.setStartDate(schedule.get().getStartDate());
            scheduleDTO.setEndDate(schedule.get().getEndDate());
            return scheduleDTO;
        }
        return null;
    }
}
