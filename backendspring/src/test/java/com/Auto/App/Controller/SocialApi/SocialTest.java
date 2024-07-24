package com.Auto.App.Controller.SocialApi;

import java.util.UUID;

import org.junit.jupiter.api.Test;
import org.junit.jupiter.api.extension.ExtendWith;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.autoconfigure.web.servlet.AutoConfigureMockMvc;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.test.context.junit.jupiter.SpringExtension;
import org.springframework.test.web.servlet.MockMvc;
import org.springframework.test.web.servlet.request.MockMvcRequestBuilders;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.status;
import org.springframework.http.MediaType;
import org.springframework.security.test.context.support.WithMockUser;
import org.springframework.security.test.web.servlet.request.SecurityMockMvcRequestPostProcessors;



@SpringBootTest
@AutoConfigureMockMvc
@ExtendWith(SpringExtension.class)
public class SocialTest {

    @Autowired
    private MockMvc mockMvc;

    @Test
    @WithMockUser(username = "mohamedaziz.ouerghi@etudiant-enit.utm.tn", password = "123")
    void testGetComments() throws Exception {
        UUID postId = UUID.fromString("94c72dd3-e2fe-437d-b17d-7af261dde6f1");
        
        mockMvc.perform(MockMvcRequestBuilders.get("/api/v1/social/comments/" + postId)
                .contentType(MediaType.APPLICATION_JSON)
                .with(SecurityMockMvcRequestPostProcessors.csrf()))
                .andExpect(status().isOk());
    }
}