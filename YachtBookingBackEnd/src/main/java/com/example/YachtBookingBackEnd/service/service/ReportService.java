package com.example.YachtBookingBackEnd.service.service;

import com.example.YachtBookingBackEnd.dto.BookingOrderDTO;
import com.example.YachtBookingBackEnd.entity.BookingOrder;
import com.example.YachtBookingBackEnd.mapper.BookingOrderMapper;
import com.example.YachtBookingBackEnd.repository.BookingOrderRepository;
import com.example.YachtBookingBackEnd.service.implement.IReport;
import jakarta.servlet.ServletOutputStream;
import jakarta.servlet.http.HttpServletResponse;
import lombok.AccessLevel;
import lombok.RequiredArgsConstructor;
import lombok.experimental.FieldDefaults;
import lombok.extern.slf4j.Slf4j;
import org.apache.poi.hssf.usermodel.HSSFCell;
import org.apache.poi.hssf.usermodel.HSSFRow;
import org.apache.poi.hssf.usermodel.HSSFSheet;
import org.apache.poi.hssf.usermodel.HSSFWorkbook;
import org.apache.poi.ss.usermodel.CellStyle;
import org.apache.poi.ss.usermodel.CreationHelper;
import org.springframework.core.io.ByteArrayResource;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.io.ByteArrayOutputStream;
import java.io.IOException;
import java.time.LocalDate;
import java.util.List;
import java.util.stream.Collectors;

@Service
@RequiredArgsConstructor // Tạo constructor (final)
@FieldDefaults(level = AccessLevel.PRIVATE, makeFinal = true)
@Slf4j
public class ReportService implements IReport {
    BookingOrderRepository bookingOrderRepository;
    public static String[] Header = {
            "ID_Booking",
            "Amount(VNĐ)",
            "Booking Time",
            "Customer Requirement",
            "Status",
            "Customer Name",
            "Customer Email",
            "Customer Address",
            "Customer Phone Number",
            "Start Date",
            "End Date",
            "Reason"

    };
    @Override
    // Sử dụng @Transactional để giữ phiên Hibernate mở trong suốt quá trình xử lý
    @Transactional(readOnly = true)
    public ByteArrayResource reportBooking(HttpServletResponse response, String idCompany, String month, String year) throws IOException {
        List<BookingOrder> bookingOrders;
        if(month.isEmpty() && year.isEmpty()){
            String currentMonth = Integer.toString(LocalDate.now().getMonthValue());
            String currenYear = Integer.toString(LocalDate.now().getYear());
            bookingOrders = bookingOrderRepository.getAllBooking(idCompany, currentMonth, currenYear);

        } else if (month.isEmpty()) {
            String currentMonth = Integer.toString(LocalDate.now().getMonthValue());
            bookingOrders = bookingOrderRepository.getAllBooking(idCompany, currentMonth, year);
        } else if (year.isEmpty()) {
            String currenYear = Integer.toString(LocalDate.now().getYear());
            bookingOrders = bookingOrderRepository.getAllBooking(idCompany, month, currenYear);
        } else {
            bookingOrders = bookingOrderRepository.getAllBooking(idCompany, month, year);
        }

        List<BookingOrderDTO> bookingOrderDTOList = bookingOrders.stream()
                .map(BookingOrderMapper::toDTO)
                .collect(Collectors.toList());
        if (bookingOrders.isEmpty()) {
            log.warn("No booking orders found for idCompany: {}, month: {}, year: {}", idCompany, month, year);
        } else {
            log.info("Found {} booking orders for idCompany: {}, month: {}, year: {}", bookingOrders.size(), idCompany, month, year);
        }
        log.info("BookingOrderDTO List: {}", bookingOrderDTOList);
        HSSFWorkbook workbook = new HSSFWorkbook();

        CreationHelper createHelper = workbook.getCreationHelper();
        CellStyle dateStyle = workbook.createCellStyle();
        dateStyle.setDataFormat(createHelper.createDataFormat().getFormat("yyyy-mm-dd HH:mm:ss"));

        HSSFSheet sheet = workbook.createSheet("Booking Orders");
        HSSFRow row = sheet.createRow(0);
        for (int i = 0; i < Header.length; i++) {
            HSSFCell cell = row.createCell(i);
            cell.setCellValue(Header[i]);
        }
        int dataRow = 1;
        for (BookingOrderDTO bookingOrderDTO : bookingOrderDTOList) {
            row = sheet.createRow(dataRow);
            row.createCell(0).setCellValue(bookingOrderDTO.getIdBooking() != null ? bookingOrderDTO.getIdBooking() : "N/A");
            row.createCell(1).setCellValue(bookingOrderDTO.getAmount());
            HSSFCell bookingTimeCell = row.createCell(2);
            if (bookingOrderDTO.getBookingTime() != null) {
                bookingTimeCell.setCellValue(bookingOrderDTO.getBookingTime());
                bookingTimeCell.setCellStyle(dateStyle);
            } else {
                bookingTimeCell.setCellValue("N/A");
            }
            row.createCell(3).setCellValue(bookingOrderDTO.getRequirement() != null ? bookingOrderDTO.getRequirement() : "N/A");
            row.createCell(4).setCellValue(bookingOrderDTO.getStatus() != null ? bookingOrderDTO.getStatus() : "N/A");
            row.createCell(5).setCellValue(bookingOrderDTO.getCustomerDTO().getFullName() != null ? bookingOrderDTO.getCustomerDTO().getFullName() : "N/A");
            row.createCell(6).setCellValue(bookingOrderDTO.getCustomerDTO().getEmail() != null ? bookingOrderDTO.getCustomerDTO().getEmail() : "N/A");
            row.createCell(7).setCellValue(bookingOrderDTO.getCustomerDTO().getAddress() != null ? bookingOrderDTO.getCustomerDTO().getAddress() : "N/A");
            row.createCell(8).setCellValue(bookingOrderDTO.getCustomerDTO().getPhone() != null ? bookingOrderDTO.getCustomerDTO().getPhone() : "N/A");
            HSSFCell startDateCell = row.createCell(9);
            if (bookingOrderDTO.getSchedule().getStartDate() != null) {
                startDateCell.setCellValue(bookingOrderDTO.getSchedule().getStartDate());
                startDateCell.setCellStyle(dateStyle);
            } else {
                startDateCell.setCellValue("N/A");
            }

            HSSFCell endDateCell = row.createCell(10);
            if (bookingOrderDTO.getSchedule().getEndDate() != null) {
                endDateCell.setCellValue(bookingOrderDTO.getSchedule().getEndDate());
                endDateCell.setCellStyle(dateStyle);
            } else {
                endDateCell.setCellValue("N/A");
            }
            row.createCell(11).setCellValue(bookingOrderDTO.getReason() != null ? bookingOrderDTO.getReason() : "N/A");
            dataRow++;
        }
        ByteArrayOutputStream bos = new ByteArrayOutputStream();
        workbook.write(bos);
        workbook.close();

        return new ByteArrayResource(bos.toByteArray());
    }
}
