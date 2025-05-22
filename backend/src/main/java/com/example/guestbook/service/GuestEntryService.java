package com.example.guestbook.service;

import com.example.guestbook.model.GuestEntry;
import com.example.guestbook.repository.GuestEntryRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.time.LocalDateTime;
import java.util.List;

@Service
public class GuestEntryService {

    private final GuestEntryRepository guestEntryRepository;

    @Autowired
    public GuestEntryService(GuestEntryRepository guestEntryRepository) {
        this.guestEntryRepository = guestEntryRepository;
    }

    public List<GuestEntry> getAllEntries() {
        return guestEntryRepository.findAllByOrderByCreatedAtDesc();
    }

    public GuestEntry saveEntry(GuestEntry guestEntry) {
        guestEntry.setCreatedAt(LocalDateTime.now());
        return guestEntryRepository.save(guestEntry);
    }

    public void deleteEntry(Long id) {
        guestEntryRepository.deleteById(id);
    }
} 