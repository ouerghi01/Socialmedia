package com.Auto.App.Controller.SocialApi;

import java.util.ArrayList;
import java.util.Collections;
import java.util.List;
import java.util.UUID;
import java.util.stream.Collectors;

import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import  com.Auto.App.Controller.SocialApi.SocialDto.UserInfo;
import com.Auto.App.Controller.SocialApi.SocialDto.UserRequest;
import com.Auto.App.Entity.Friends.Friends;
import com.Auto.App.Entity.Friends.FriendsRepository;
import  com.Auto.App.Entity.User.User;
import  com.Auto.App.Entity.User.UserRepository;

import  lombok.RequiredArgsConstructor;

@RestController
@RequestMapping("/api/v1/Friendship")
@CrossOrigin(origins = "http://localhost:3000/")
@RequiredArgsConstructor
public class UserInteraction {
    private final UserRepository userRepository;
    private final FriendsRepository friendsRepository;

    @GetMapping("/main/{userId}")
    public UserInfo GetMainUserInfo(@PathVariable String userId) {
        UUID user_id = UUID.fromString(userId);
        User user = userRepository.finduser(user_id);
        if (user == null) {
            return null;
        }
        return UserInfo.builder().email(user.getEmail()).id(user.getId()).image(user.getImagebase64()).build();
    }
    private boolean isFriend(User user1, User user2) {
        return isFriendshipAccepted(user1.getId(), user2.getId()) ||
               isFriendshipAccepted(user2.getId(), user1.getId());
    }
    
    private boolean isFriendshipAccepted(UUID senderId, UUID receiverId) {
        Friends friends = friendsRepository.sender_receiver(senderId, receiverId);
        return friends != null && friends.isAccepted();
    }
    
   @GetMapping("/getallusers/{userId}")
public List<UserInfo> getAllUsers(@PathVariable String userId) {
    User mainUser = userRepository.finduser(UUID.fromString(userId));
    if (mainUser == null) {
        return Collections.emptyList(); // Return an empty list if the user is not found
    }

    List<User> allUsers = userRepository.findAll();
    return allUsers.stream()
                   .filter(user -> !isFriend(mainUser, user) && !mainUser.getId().equals(user.getId()))
                   .map(user -> UserInfo.builder()
                                        .email(user.getEmail())
                                        .id(user.getId())
                                        .image(user.getImagebase64())
                                        .build())
                   .collect(Collectors.toList());
}

    // send request for friendship
    @PostMapping("/sendrequest")
    public ResponseEntity<String> sendRequest(@RequestBody UserRequest userRequest) {
        User user_sender = userRepository.finduser(UUID.fromString(userRequest.getSenderUserId())) ;
        User user_receiver = userRepository.finduser(UUID.fromString(userRequest.getReceiverUserId())) ;
        if(user_sender==null || user_receiver==null) {
            return ResponseEntity.ok("User not found");
        }
        Friends friendsold = friendsRepository.sender_receiver(user_sender.getId(), user_receiver.getId());
        if(friendsold!=null) {
            return ResponseEntity.ok("Request already sent");
        }
        Friends friends = new Friends(user_sender.getId(), user_receiver.getId(),UUID.randomUUID());
        friendsRepository.save(friends);
        return ResponseEntity.ok("Request sent successfully");
    } 
    // accept request for friendship
    @PostMapping("/acceptrequest/")
    public ResponseEntity<String> acceptRequest(@RequestBody UserRequest userRequest) {
        User user_sender = userRepository.finduser(UUID.fromString(userRequest.getSenderUserId())) ;
        User user_receiver = userRepository.finduser(UUID.fromString(userRequest.getReceiverUserId())) ;
        Friends friends = friendsRepository.sender_receiver(user_sender.getId(), user_receiver.getId());
        if(friends==null) {
            return ResponseEntity.ok("Request not found");
        }
        friends.setAccepted(true);
        friendsRepository.save(friends);
        return ResponseEntity.ok("Request accepted successfully");
    }

@GetMapping("/getallrequests/{userId}")
public List<UserInfo> getAllRequests(@PathVariable String userId) {
    User user=userRepository.finduser(UUID.fromString(userId));
    List<Friends> friends = friendsRepository.findAll();
    List<UserInfo> usersresultInfos = new ArrayList<>(); 
    for(Friends friend:friends) {
        if(friend.getReceiveruserid().equals(user.getId()) && !friend.isAccepted()) {
            User user_sender=userRepository.finduser(friend.getSenderuserid());          
            UserInfo userInfo = UserInfo.builder()
            .email(user_sender.getEmail())
            .id(user_sender.getId())
            .image(user_sender.getImagebase64())
            .build();
            usersresultInfos.add(userInfo);
        }
    }
    return usersresultInfos ;
}

@GetMapping("/getallfriends/{userId}")
public List<UserInfo> getAllFriends(@PathVariable String userId) {
    User user=userRepository.finduser(UUID.fromString(userId));
    List<Friends> friends = friendsRepository.findAll();
    List<UserInfo> usersresultInfos = new ArrayList<>(); 
    for(Friends friend:friends) {
        if((friend.getReceiveruserid().equals(user.getId()) || friend.getSenderuserid().equals(user.getId())) && friend.isAccepted()) {
            User user_friend;
            if(friend.getReceiveruserid().equals(user.getId())) {
                user_friend=userRepository.finduser(friend.getSenderuserid());
            } else {
                user_friend=userRepository.finduser(friend.getReceiveruserid());
            }
            UserInfo userInfo = UserInfo.builder()
            .email(user_friend.getEmail())
            .id(user_friend.getId())
            .image(user_friend.getImagebase64())
            .build();
            usersresultInfos.add(userInfo);
        }
    }
    return usersresultInfos ;
}
}
