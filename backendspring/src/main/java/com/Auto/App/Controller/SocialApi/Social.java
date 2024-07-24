package com.Auto.App.Controller.SocialApi;

import java.util.List;
import java.util.UUID;

import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.Auto.App.Controller.SocialApi.SocialDto.CommentDto;
import com.Auto.App.Controller.SocialApi.SocialDto.PostDto;
import com.Auto.App.Controller.SocialApi.SocialDto.Post_like;
import com.Auto.App.Controller.SocialApi.SocialDto.ReplyTocmnt;
import com.Auto.App.Controller.SocialApi.SocialDto.UserDto;
import  com.Auto.App.Entity.Comment.Comment;
import com.Auto.App.Entity.Comment.CommentRepository;
import com.Auto.App.Entity.Post.Post;
import com.Auto.App.Entity.Post.PostRepository;
import  com.Auto.App.Entity.Replies.ReplieqRepository;
import com.Auto.App.Entity.Replies.Replies;
import com.Auto.App.Entity.User.User;
import com.Auto.App.Entity.User.UserRepository;
import com.Auto.App.Entity.likes.LIkes;
import com.Auto.App.Entity.likes.LIkesRepository;

import lombok.RequiredArgsConstructor;
@CrossOrigin(origins = "http://localhost:3000/")
@RestController
@RequestMapping("/api/v1/social")
@RequiredArgsConstructor
public class Social {

    private final  UserRepository userRepository;
    
    private final  PostRepository postRepository;
    private  final ReplieqRepository repliesRepository;
    private final  LIkesRepository likesRepository;

    private final   CommentRepository commentRepository;  
    @CrossOrigin(origins = "http://localhost:3000") 
    @PostMapping("/createpost")
    public ResponseEntity<String> createPost(@RequestBody PostDto data) {
        return insertPost(data);
    }
    private ResponseEntity<String> insertPost(PostDto data) {
        User  owner_post=userRepository.findByEmail(data.getOwner());
        if(owner_post==null) {
            return  ResponseEntity.badRequest().body("User not found");
        }else {
        String image_64_byte=data.getPicture();
        UUID post_id = UUID.randomUUID();
        Post post;
        if(image_64_byte!=null) {
             System.err.println("image_64_byte:"+image_64_byte); 
             post=new Post(
                post_id,
                data.getContent(),
                image_64_byte,
                data.getVisibility(),
                owner_post.getId()

             );
             postRepository.save(post);
        }else{
            System.err.println("image_64_byte:"+image_64_byte); 
            post=new Post(
                post_id,
                data.getContent(),
                image_64_byte,
                data.getVisibility(),
                owner_post.getId()
             );
                postRepository.save(post);
        }
        return ResponseEntity.ok("Post created");
        }    
    }
    //Get all posts that have visibility set to true.
    @GetMapping("/posts/{visibility}")
    public ResponseEntity<List<Post>> getPosts(@PathVariable boolean visibility) {
        return ResponseEntity.ok(postRepository.findByVisibility(visibility));
    }
    @GetMapping("post/{owner}")
    public UserDto getPost(@PathVariable String owner) {
        UUID owner_id = UUID.fromString(owner);
        User user=userRepository.finduser(owner_id);
        if(user==null) {
            return  null;
        }
        return new UserDto(user.getEmail(),user.getImagebase64());
    }
    @PostMapping("/comment_post")
    public ResponseEntity<String> commentPost(@RequestBody CommentDto comment) {
        return CommentToPOst(comment);
    }
    private ResponseEntity<String> CommentToPOst(CommentDto comment) {
        User owner_comment=userRepository.findByEmail(comment.getOwner_comment());
        if(owner_comment==null) {
            return  ResponseEntity.badRequest().body("User not found");
        }
        Post post=postRepository.findPost(UUID.fromString(comment.getPost_id()));
        if(post==null) {
            return  ResponseEntity.badRequest().body("Post not found");
        }
        String image_64_byte=comment.getPicture();
        UUID comment_id = UUID.randomUUID();
        Comment comment_ ;
        if (image_64_byte!=null){
            comment_ =new Comment(
                comment_id,
                comment.getContent(),
                post.getId(),
               
                owner_comment.getId(),
                image_64_byte
            );
            commentRepository.save(comment_);
        return ResponseEntity.ok("Commented");
        }else{
            comment_ =new Comment(
                comment_id,
                comment.getContent(),
                post.getId(),
               
                owner_comment.getId(),
                null
            ); 
            commentRepository.save(comment_);
            return ResponseEntity.ok("Commented for no image");
        }
    }
    @GetMapping("/nbrcomment/{post_id}")
    public ResponseEntity<Integer> getNbrComment(@PathVariable String post_id) {
        Post post=postRepository.findPost(UUID.fromString(post_id));
        if(post==null) {
            return  ResponseEntity.badRequest().body(null);
        }
        List<Comment> comments=commentRepository.findByPostId(post.getId());
        return ResponseEntity.ok(comments.size());   
    }
    // id_post ,id_user
    @PostMapping("/like_post")
    public ResponseEntity<String> likePost(@RequestBody Post_like post_like) {
        LIkes like_=likesRepository.findLikeByPostIdAndUserId(UUID.fromString(post_like.getPost_id()),userRepository.findByEmail(post_like.getOwner_like()).getId() );
        
        if(like_!=null) {
            return  ResponseEntity.ok("Already liked");
        }
        else {
            User owner_like=userRepository.findByEmail(post_like.getOwner_like());
            LIkes like=new LIkes(UUID.randomUUID(), UUID.fromString(post_like.getPost_id()), owner_like.getId());
            likesRepository.save(like);
            return ResponseEntity.ok("Liked");
        }
    }
    @GetMapping("/nbrlike/{post_id}")
    public ResponseEntity<Integer> getNbrLike(@PathVariable String post_id) {
        Post post=postRepository.findPost(UUID.fromString(post_id));
        if(post==null) {
            return  ResponseEntity.badRequest().body(null);
        }
        List<LIkes> likes=likesRepository.findByPostId(post.getId());
        return ResponseEntity.ok(likes.size());
    }
    @GetMapping("/comments/{post_id}")
    public ResponseEntity<List<Comment>> getComments(@PathVariable String post_id) {
        Post post=postRepository.findPost(UUID.fromString(post_id));
        if(post==null) {
            return  ResponseEntity.badRequest().body(null);
        }
        ResponseEntity<List<Comment> > comments= ResponseEntity.ok(commentRepository.findByPostId(post.getId())) ;
        return comments;
    }
    @PostMapping("/reply_to_comment")
    public ResponseEntity<Replies> replyToComment(@RequestBody ReplyTocmnt reply) {
        return Reply_to_Comment(reply);
    }
    private ResponseEntity<Replies> Reply_to_Comment(ReplyTocmnt reply) {
        if(
            repliesRepository.findReplie(reply.getOwner_reply())!=null
        ) {
            return  ResponseEntity.badRequest().body(null);
        }
        Post post=postRepository.findPost(reply.getPost_id());
        if(post==null) {
            return  ResponseEntity.badRequest().body(null);
        }
        Comment comment=commentRepository.findComment(reply.getComment_id());
        if(comment==null) {
            return  ResponseEntity.badRequest().body(null);
        }
        User owner_reply=userRepository.findByEmail(reply.getOwner_reply());
        if(owner_reply==null) {
            return  ResponseEntity.badRequest().body(null);
        }
        String image_64_byte=reply.getPicture();
        UUID reply_id = UUID.randomUUID();
        Replies reply_;
        if(image_64_byte!=null) {
            // save reply with image
            reply_ =new Replies(
                reply_id,
                post.getId(),
                comment.getId(),
                owner_reply.getId(),
                reply.getContent_reply(),
                image_64_byte
            );
            repliesRepository.save(reply_);
           
        }
        else{
            // save reply without image
            reply_ =new Replies(
                reply_id,
                post.getId(),
                comment.getId(),
                owner_reply.getId(),
                reply.getContent_reply(),
                null
            );
            repliesRepository.save(reply_);

        }
            
        return ResponseEntity.ok(reply_);
    }
}
