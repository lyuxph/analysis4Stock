package com.lyuxph.analysis.version;

import org.springframework.data.jpa.repository.JpaRepository;

public interface VersionRepository extends JpaRepository<Version, String> {

    Version findTopByOrderByVersionIdDesc();

}
