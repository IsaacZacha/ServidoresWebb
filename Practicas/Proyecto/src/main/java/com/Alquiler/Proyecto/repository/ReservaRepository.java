package com.Alquiler.Proyecto.repository;

import org.springframework.data.jpa.repository.JpaRepository;

import com.Alquiler.Proyecto.Entity.Reserva;

public interface ReservaRepository extends JpaRepository<Reserva, Long> {
}
