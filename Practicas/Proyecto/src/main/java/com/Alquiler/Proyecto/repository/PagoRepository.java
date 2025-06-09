package com.Alquiler.Proyecto.repository;

import org.springframework.data.jpa.repository.JpaRepository;

import com.Alquiler.Proyecto.Entity.Pago;

public interface PagoRepository extends JpaRepository<Pago, Long> {
}
