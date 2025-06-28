package com.lyuxph.analysis.repository;

import com.lyuxph.analysis.model.StockPrice;
import com.lyuxph.analysis.model.Version;
import org.springframework.data.jpa.repository.JpaRepository;

public interface StockPriceRepository extends JpaRepository<StockPrice, String> {

}
