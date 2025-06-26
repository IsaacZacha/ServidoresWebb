package com.Alquiler.Proyecto.repository;

import org.springframework.data.jpa.repository.JpaRepository;

import com.Alquiler.Proyecto.Entity.Inspeccion;

public interface InspeccionRepository extends JpaRepository<Inspeccion, Long> {
}
