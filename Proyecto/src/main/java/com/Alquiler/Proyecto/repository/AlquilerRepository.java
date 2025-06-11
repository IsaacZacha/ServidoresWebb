package com.Alquiler.Proyecto.repository;

import org.springframework.data.jpa.repository.JpaRepository;

import com.Alquiler.Proyecto.Entity.Alquiler;

public interface AlquilerRepository extends JpaRepository<Alquiler, Long> {
}
