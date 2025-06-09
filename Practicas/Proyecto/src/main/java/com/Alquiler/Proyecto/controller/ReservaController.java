package com.Alquiler.Proyecto.controller;

import java.util.List;
import java.util.Optional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.Alquiler.Proyecto.Entity.Reserva;
import com.Alquiler.Proyecto.repository.ReservaRepository;

@RestController
@RequestMapping("/reservas")
public class ReservaController {

    @Autowired
    private ReservaRepository reservaRepository;

    @GetMapping
    public List<Reserva> obtenerTodas() {
        return reservaRepository.findAll();
    }

    @GetMapping("/{id}")
    public Reserva obtenerPorId(@PathVariable Long id) {
        return reservaRepository.findById(id).orElse(null);
    }

    @PostMapping
    public Reserva crear(@RequestBody Reserva reserva) {
        return reservaRepository.save(reserva);
    }

    @PutMapping("/{id}")
    public Reserva actualizar(@PathVariable Long id, @RequestBody Reserva reservaActualizada) {
        Optional<Reserva> reservaOpt = reservaRepository.findById(id);
        if (reservaOpt.isPresent()) {
            Reserva reserva = reservaOpt.get();
            reserva.setCliente(reservaActualizada.getCliente());
            reserva.setVehiculo(reservaActualizada.getVehiculo());
            reserva.setFechaReserva(reservaActualizada.getFechaReserva());
            reserva.setFechaInicio(reservaActualizada.getFechaInicio());
            reserva.setFechaFin(reservaActualizada.getFechaFin());
            reserva.setEstado(reservaActualizada.getEstado());
            return reservaRepository.save(reserva);
        }
        return null;
    }

    @DeleteMapping("/{id}")
    public void eliminar(@PathVariable Long id) {
        reservaRepository.deleteById(id);
    }
}
