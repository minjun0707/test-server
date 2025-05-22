package com.example.guestbook.controller;

import com.example.guestbook.model.GuestEntry;
import com.example.guestbook.service.GuestEntryService;
import jakarta.validation.Valid;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/entries")
@CrossOrigin(origins = "*")
public class GuestEntryController {

    private final GuestEntryService guestEntryService;

    @Autowired
    public GuestEntryController(GuestEntryService guestEntryService) {
        this.guestEntryService = guestEntryService;
    }

    @GetMapping
    public ResponseEntity<List<GuestEntry>> getAllEntries() {
        return ResponseEntity.ok(guestEntryService.getAllEntries());
    }

    @PostMapping
    public ResponseEntity<GuestEntry> createEntry(@Valid @RequestBody GuestEntry guestEntry) {
        GuestEntry savedEntry = guestEntryService.saveEntry(guestEntry);
        return new ResponseEntity<>(savedEntry, HttpStatus.CREATED);
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<Void> deleteEntry(@PathVariable Long id) {
        guestEntryService.deleteEntry(id);
        return ResponseEntity.noContent().build();
    }
} 