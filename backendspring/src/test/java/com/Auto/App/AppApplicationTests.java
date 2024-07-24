package com.Auto.App;

import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.autoconfigure.web.servlet.AutoConfigureMockMvc;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.boot.test.mock.mockito.MockBean;
import org.springframework.test.context.TestPropertySource;
import org.springframework.test.web.servlet.MockMvc;
import org.springframework.test.web.servlet.request.MockMvcRequestBuilders;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.status;

import com.Auto.App.Services.AuthService;

@SpringBootTest(classes = AppApplication.class)
@TestPropertySource(locations = "classpath:test.properties")
@AutoConfigureMockMvc
class AppApplicationTests {

    @Autowired
    private MockMvc mockMvc;

    @MockBean
    private AuthService authService;
    @BeforeEach
    public void setUp() {
        System.out.println("setUp");
    }

    @Test
    public void testGetAllUsers() throws Exception {
        System.out.println("testGetAllUsers");
        mockMvc.perform(MockMvcRequestBuilders.get("/api/v1/auth/users"))
               .andExpect(status().isOk());
    }
    @Test 
    public void testGetUserById() throws Exception {
        System.out.println("testGetUserById");
    
    }
}
