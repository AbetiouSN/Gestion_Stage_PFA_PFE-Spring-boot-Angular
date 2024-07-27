package com.springsecurity.springsecurity.Entity;

import jakarta.persistence.*;

import java.util.Date;

@Table
@Entity
public class Doucument {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;
    private Date date;
    private String message;

//    @OneToOne
//    @JoinColumn(name = "message_id", referencedColumnName = "id");
//    private Message message;
}
