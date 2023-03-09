package com.suyang.incense.db.entity.relation;

import com.suyang.incense.db.entity.note.MiddleNote;
import com.suyang.incense.db.entity.note.TopNote;
import com.suyang.incense.db.entity.perfume.Perfume;
import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.FetchType;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;
import javax.persistence.JoinColumn;
import javax.persistence.ManyToOne;
import javax.persistence.Table;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

@Entity
@Getter
@Setter
@NoArgsConstructor
@Table(name = "perfume_middle_note")
public class PerfumeMiddleNote {

  @Id
  @GeneratedValue(strategy = GenerationType.IDENTITY)
  @Column(name = "perfume_middle_note_id")
  private Long id;

  @ManyToOne(fetch = FetchType.LAZY)
  @JoinColumn(name = "perfume_id")
  private Perfume perfume;

  @ManyToOne(fetch = FetchType.LAZY)
  @JoinColumn(name = "middle_note_id")
  private MiddleNote middleNote;

}
