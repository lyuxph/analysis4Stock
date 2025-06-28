package com.lyuxph.analysis.service;

import com.lyuxph.analysis.model.StockPrice;
import com.lyuxph.analysis.repository.StockPriceRepository;
import jakarta.annotation.PostConstruct;
import jakarta.annotation.Resource;
import org.json.JSONArray;
import org.json.JSONObject;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.core.io.ClassPathResource;
import org.springframework.core.io.ResourceLoader;
import org.springframework.scheduling.annotation.Scheduled;
import org.springframework.stereotype.Service;

import javax.xml.transform.Source;
import java.io.BufferedReader;
import java.io.IOException;
import java.io.InputStream;
import java.io.InputStreamReader;
import java.net.URL;
import java.util.ArrayList;
import java.util.List;

@Service
public class StockDataService {

    @Value("classpath:${ticker.list}")
    private String tickerList;

    @Autowired
    private StockPriceRepository stockPriceRepository;

    public final JSONObject getStockHistoricalPrice(final String ticker, final String timeseries) {
        try {
            URL url = new URL("https://financialmodelingprep.com/api/v3/historical-price-full/"
                    + ticker + "?timeseries=" + timeseries + "&apikey=6506d57d854ccc780d93fa627e91faf4");

            BufferedReader bufferedReader = new BufferedReader(new InputStreamReader(url.openStream(), "UTF-8"));
            StringBuilder stringBuilder = new StringBuilder();
            for (String line; (line = bufferedReader.readLine()) != null;) {
                stringBuilder.append(line);
//                System.out.println(line);
            }

            JSONObject jsonObject = new JSONObject(stringBuilder.toString());

            return jsonObject;
        } catch (IOException e) {
            e.printStackTrace();
        }

        return null;
    }

//    @Scheduled(fixedRate = 50000)
    public final JSONObject getStockTodayPrice() throws IOException {
        InputStream file = new ClassPathResource(tickerList).getInputStream();
        BufferedReader bufferedReader = new BufferedReader(new InputStreamReader(file, "UTF-8"));
        StringBuilder stringBuilder = new StringBuilder();
        for (String line; (line = bufferedReader.readLine()) != null;) {
            stringBuilder.append(line);
//            System.out.println(line);
        }

        JSONObject tickers = new JSONObject(stringBuilder.toString());
        JSONArray tickersArray = tickers.getJSONArray("tickers");
        for (int i = 0; i < tickersArray.length(); i++) {
            String ticker = tickersArray.getString(i);
            for (int j = 0; j < 3; j++) {
                String date = getStockHistoricalPrice(ticker, "3").getJSONArray("historical").getJSONObject(j).getString("date");
                stockPriceRepository.save(new StockPrice(ticker, date));
            }
        }



        return null;
    }
}
