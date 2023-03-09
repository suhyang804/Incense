package com.suyang.incense.db.entity.member;


import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

import javax.persistence.*;
import javax.validation.constraints.NotNull;
import java.util.ArrayList;
import java.util.List;

@Entity
@Getter
@Setter
@NoArgsConstructor
@Table(name = "rank")
public class Rank {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "rank_id")
    private Long id;


    @OneToMany(mappedBy = "rank")
    private List<Member> memberList = new ArrayList<>();

    @NotNull
    @Column(length=100)
    private String name;

    @NotNull
    private  int minScore;


    @NotNull
    private int maxScore;


    @Column(length=2500)
    private String image;


}
