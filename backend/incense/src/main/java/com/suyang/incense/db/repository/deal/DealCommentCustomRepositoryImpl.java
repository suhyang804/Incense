package com.suyang.incense.db.repository.deal;

import com.querydsl.core.Tuple;
import com.querydsl.core.types.Projections;
import com.querydsl.jpa.impl.JPAQueryFactory;
import com.suyang.incense.api.response.deal.CommentReplyRes;
import com.suyang.incense.api.response.deal.DealCommentRes;
import com.suyang.incense.db.entity.deal.DealComment;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Repository;

import java.util.*;

import static com.querydsl.core.group.GroupBy.groupBy;
import static com.querydsl.core.group.GroupBy.list;
import static com.suyang.incense.db.entity.deal.QCommentReply.commentReply;
import static com.suyang.incense.db.entity.deal.QDealComment.dealComment;
import static com.suyang.incense.db.entity.member.QMember.member;

@Repository
@RequiredArgsConstructor
public class DealCommentCustomRepositoryImpl implements DealCommentCustomRepository{

    private final JPAQueryFactory jpaQueryFactory;

    public List<DealCommentRes> getComments(Long dealId) {

        List<DealCommentRes> resultMap = jpaQueryFactory
                .selectFrom(dealComment)
                .join(dealComment.member, member)
                .innerJoin(commentReply).on(commentReply.dealComment.eq(dealComment))
                .join(commentReply.member, member)
                .where(dealComment.deal.id.eq(dealId))
                .transform(groupBy(dealComment.id)
                        .list(
                                Projections.constructor(
                                        DealCommentRes.class,
                                        dealComment.id,
                                        dealComment.member.nickname,
                                        dealComment.content,
                                        dealComment.createdDate,
                                        dealComment.isSecret,
                                        list(Projections.constructor(CommentReplyRes.class,
                                                commentReply.id,
                                                commentReply.dealComment.id,
                                                commentReply.member.nickname,
                                                commentReply.content,
                                                commentReply.createdDate,
                                                commentReply.isSecret
                                        ))
                                )
                        )
                );

        return resultMap;
    }

    public int getCommentCount(Long dealId) {

        Long commentCount = jpaQueryFactory
                .select(dealComment.count())
                .from(dealComment)
                .where(dealComment.deal.id.eq(dealId)).fetchOne();

        Long replyCount = jpaQueryFactory
                .select(commentReply.count())
                .from(commentReply)
                .innerJoin(dealComment).on(commentReply.dealComment.eq(dealComment))
                .where(dealComment.id.eq(dealId))
                .fetchOne();

        int comments = Optional.ofNullable(commentCount).orElse(0L).intValue();
        int replys = Optional.ofNullable(replyCount).orElse(0L).intValue();

        return comments + replys;

    }


}
