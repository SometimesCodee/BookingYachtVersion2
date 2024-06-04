package com.example.firstDemoHihi.controller;
import com.example.firstDemoHihi.payload.response.DataResponse;
import com.example.firstDemoHihi.service.implement.*;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.core.io.Resource;
import org.springframework.http.HttpHeaders;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;

@CrossOrigin("*")
@RestController
@RequestMapping("/api/companies")
public class CompanyController {

    @Autowired
    IYacht iYacht;
    @Autowired
    IYachtDetail iYachtDetailService;
    @Autowired
    IFeedback iFeedback;
    @Autowired
    IFile iFile;

    @GetMapping("/yachts")
    public ResponseEntity<?> viewYacht() {
//        SecretKey secretKey = Keys.secretKeyFor(SignatureAlgorithm.HS256);
//        String enscrypted = Encoders.BASE64.encode(secretKey.getEncoded());
//        System.out.println(enscrypted);
        DataResponse dataResponse = new DataResponse();
        dataResponse.setData(iYacht.getAllYacht());
        return new ResponseEntity<>(dataResponse, HttpStatus.OK);
    }

    @PostMapping("/yachts")
    public ResponseEntity<?> insertYacht(@RequestParam String name,
                                         @RequestParam MultipartFile image,
                                         @RequestParam long price,
                                         @RequestParam String idCompany,
                                         @RequestParam String idYachtType,
                                         @RequestParam String idLocation  ) {
        DataResponse dataResponse = new DataResponse();
        dataResponse.setData(iYacht.insertYacht(name, image, price, idCompany, idYachtType, idLocation));
        return new ResponseEntity<>(dataResponse, HttpStatus.OK);
    }
    @GetMapping("/file/{filename:.+}")
    public ResponseEntity<?> getFile(@PathVariable String filename) {
        Resource resource = iFile.load(filename);
        return ResponseEntity.ok().header(HttpHeaders.CONTENT_DISPOSITION, "attachment; filename=\"" + resource.getFilename() + "\"").body(resource);
    }

    @GetMapping("/yachts/details/{id}")
    public ResponseEntity<?> getYachtDetailByYachtId(@PathVariable String id) {
        DataResponse dataResponse = new DataResponse();
        dataResponse.setData(iYachtDetailService.viewYachtDetail(id));
        return new ResponseEntity<>(dataResponse, HttpStatus.OK);
    }

    @GetMapping("/yachts/hide")
    public ResponseEntity<?> hiddenYacht(@RequestParam String id) {
        DataResponse dataResponse = new DataResponse();
        dataResponse.setData(iYacht.hiddenYacht(id));
        return new ResponseEntity<>(dataResponse, HttpStatus.OK);
    }

    @GetMapping("/yachts/{company}")
    public ResponseEntity<?> findAllYachtByCompany(@PathVariable String companyId) {
        DataResponse dataResponse = new DataResponse();
        dataResponse.setData(iYacht.findYachtByCompanyId(companyId));
        return new ResponseEntity<>(dataResponse, HttpStatus.OK);
    }

    @GetMapping("/yachts/{yachtId}")
    public ResponseEntity<?> findYachtDetailByYachtId(@PathVariable String yachtId) {
        DataResponse dataResponse = new DataResponse();
        dataResponse.setData(iYachtDetailService.findYachtDetailByYacht(yachtId));
        return new ResponseEntity<>(dataResponse, HttpStatus.OK);
    }
    @GetMapping("/yachts/feedback/{yachtDetailId}")
    public ResponseEntity<?> findFeedbackByYachtDetail(@PathVariable String yachtDetailId) {
        DataResponse dataResponse = new DataResponse();
        dataResponse.setData(iFeedback.findFeedbackByYachtDetailId(yachtDetailId));
        return new ResponseEntity<>(dataResponse, HttpStatus.OK);
    }
    @PostMapping("/yachts/updateYacht")
    public ResponseEntity<?> updateYacht(@RequestParam String id,
                                        @RequestParam String name,
                                        @RequestParam MultipartFile image,
                                        @RequestParam long price,
                                        @RequestParam String idYachtType,
                                        @RequestParam String idLocation) {
        DataResponse dataResponse = new DataResponse();
        dataResponse.setData(iYacht.updateYacht(id, name, image, price, idYachtType, idLocation));
        return new ResponseEntity<>(dataResponse, HttpStatus.OK);
    }
}
