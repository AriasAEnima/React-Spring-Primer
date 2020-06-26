package edu.escuelaing.arsw.reactspringprimer;


import java.util.List;
import java.util.concurrent.CopyOnWriteArrayList;
import org.json.JSONArray;
import org.json.JSONObject;
import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.ResponseBody;
import org.springframework.web.bind.annotation.RestController;

@SpringBootApplication
@RestController
public class WebSiteController {
    public static List<String> circulos=new CopyOnWriteArrayList<>();

    
    public static void main(String[] args) {    
        SpringApplication.run(WebSiteController.class, args);
    }

    @GetMapping("/status")
    public String status() {
        return "{\"status\":\"Greetings from Spring Boot. "
                + java.time.LocalDate.now() + ", "
                + java.time.LocalTime.now()
                + ". " + "The server is Runnig!\"}";
    }
    
    @GetMapping("/circulos")
     public  List<String> circulos() {      
        return circulos;
    }     

    
    @PostMapping("/addcircles")    
    @ResponseBody
    public  void positions(@RequestParam(value = "lista") String data) {        
       JSONObject myjson = new JSONObject(data);
       JSONArray the_json_array = myjson.getJSONArray("circulos");
       for (int i=0 ; i< the_json_array.length();i++){
           if(!circulos.contains(the_json_array.get(i).toString())){
               circulos.add(the_json_array.get(i).toString());
           }
       }
    }
    
    @PostMapping("/reiniciar")   
    @ResponseBody
    public void reinicar() {        
        circulos.clear();
    }
}
