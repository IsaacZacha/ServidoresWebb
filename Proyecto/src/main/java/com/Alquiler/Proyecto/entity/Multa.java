package com.Alquiler.Proyecto.Entity;

import java.time.LocalDate;

import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.JoinColumn;
import jakarta.persistence.ManyToOne;
import lombok.Data;

@Entity
@Data
public class Multa {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long idMulta;

    @ManyToOne
    @JoinColumn(name = "alquiler_id")
    private Alquiler Alquiler;

    private String motivo;
    private Double monto;
    private LocalDate fecha;
}
