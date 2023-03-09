package com.suyang.incense.db.entity.note;

import com.suyang.incense.db.entity.relation.MyAnalysisTopNote;
import com.suyang.incense.db.entity.relation.PerfumeTopNote;
import com.suyang.incense.db.entity.relation.TestTopNoteResult;
import java.util.ArrayList;
import java.util.List;
import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;
import javax.persistence.OneToMany;
import javax.persistence.Table;
import javax.validation.constraints.NotNull;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

@Entity
@Getter
@Setter
@NoArgsConstructor
@Table(name = "top_note")
public class TopNote {

  @Id
  @GeneratedValue(strategy = GenerationType.IDENTITY)
  @Column(name = "top_note_id")
  private Long id;

  @NotNull
  @Column(length = 30)
  private String name;

  @OneToMany(mappedBy = "topNote")
  private List<PerfumeTopNote> perfumeTopNoteList = new ArrayList<>();

  @OneToMany(mappedBy = "topNote")
  private List<TestTopNoteResult> testTopNoteResultList = new ArrayList<>();

  @OneToMany(mappedBy = "topNote")
  private List<MyAnalysisTopNote> myAnalysisTopNoteList = new ArrayList<>();
}
