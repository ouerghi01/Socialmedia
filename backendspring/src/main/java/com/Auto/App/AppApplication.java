package com.Auto.App;


import org.springframework.boot.CommandLineRunner;
import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.boot.autoconfigure.domain.EntityScan;
import org.springframework.boot.autoconfigure.jdbc.DataSourceAutoConfiguration;
import org.springframework.context.annotation.ComponentScan;

import com.Auto.App.Entity.User.UserRepository;
import com.Auto.App.kafkaconfig.MessageProducer;

import lombok.RequiredArgsConstructor;





//import com.Auto.App.Entity.User.UserRepository;


@SpringBootApplication(exclude = {DataSourceAutoConfiguration.class})
//@EnableCassandraRepositories(basePackages = "com.Auto.App.Entity")
@ComponentScan(basePackages = {"com.Auto.App"})
@EntityScan(basePackages = {"com.Auto.App.Entity"})
@RequiredArgsConstructor
public class AppApplication implements CommandLineRunner {
		public static void main(String[] args) {
		SpringApplication.run(AppApplication.class, args);
	}
	private final UserRepository userRepository;
	private final MessageProducer messageProducer;
 
	@Override
	public void run(String... args) throws Exception {
		
		System.out.println(userRepository.findByEmail("amir@") != null ? "User found" : "User not found");
		messageProducer.sendMessage("my-topic", "Hello World");
		 

	}
}
