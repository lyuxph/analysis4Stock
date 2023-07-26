package com.lyuxph.analysis.repository;

import com.lyuxph.analysis.model.Version;
import org.springframework.data.jpa.repository.JpaRepository;

public interface VersionRepository extends JpaRepository<Version, String> {

    Version findTopByOrderByVersionIdDesc();

}
