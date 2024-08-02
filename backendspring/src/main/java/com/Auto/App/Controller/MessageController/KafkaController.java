package com.Auto.App.Controller.MessageController;

import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.Auto.App.dtos.MessageDto;
import com.Auto.App.kafkaconfig.MessageProducer;

import lombok.RequiredArgsConstructor;


@RestController
@CrossOrigin(origins = "http://localhost:3000/")
@RequestMapping("/api/v1/message")
@RequiredArgsConstructor
public class KafkaController {
    private final MessageProducer messageproducer;

    @PostMapping("/send")
    public void  sendMessage(@RequestBody MessageDto entity) {
        messageproducer.sendMessage(entity.getTopic(), entity.getMessage());
        System.out.println("Message sent to Kafka topic: " + entity.getTopic());
        
    }
    
    
}
