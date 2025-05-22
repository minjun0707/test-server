package com.example.guestbook.repository;

import com.example.guestbook.model.GuestEntry;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface GuestEntryRepository extends JpaRepository<GuestEntry, Long> {
    // 생성 날짜 기준으로 내림차순 정렬
    List<GuestEntry> findAllByOrderByCreatedAtDesc();
} 