package com.lyuxph.analysis.controller;

import com.lyuxph.analysis.service.StockDataService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.util.Objects;

@RestController
@RequestMapping("/api/stockData")
@CrossOrigin(origins = "*")
public class StockDataController {

    @Autowired
    StockDataService stockDataService;

    @GetMapping
    public String getStockData(@RequestParam String ticker, @RequestParam String timeseries) {
        return Objects.requireNonNull(stockDataService.getStockHistoricalPrice(ticker, timeseries)).get("historical").toString();
    }
}
