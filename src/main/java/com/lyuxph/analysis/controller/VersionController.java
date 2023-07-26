package com.lyuxph.analysis.controller;

import com.lyuxph.analysis.repository.VersionRepository;
import jakarta.servlet.http.HttpServletResponse;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping("/api/version")
@CrossOrigin(origins = "*")
public class VersionController {

    private VersionRepository versionRepository;

    public VersionController(VersionRepository versionRepository) {
        this.versionRepository = versionRepository;
    }

    @GetMapping
    public String getVersion(HttpServletResponse response) {
        response.addHeader("Access-Control-Allow-Private-Network", "true");
        return versionRepository.findTopByOrderByVersionIdDesc().getVersionId();
    }
}
