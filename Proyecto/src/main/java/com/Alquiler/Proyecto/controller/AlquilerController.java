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

import com.Alquiler.Proyecto.Entity.Alquiler;
import com.Alquiler.Proyecto.repository.AlquilerRepository;

@RestController
@RequestMapping("/alquileres")
public class AlquilerController {

    @Autowired
    private AlquilerRepository alquilerRepository;

    @GetMapping
    public List<Alquiler> obtenerTodos() {
        return alquilerRepository.findAll();
    }

    @GetMapping("/{id}")
    public Alquiler obtenerPorId(@PathVariable Long id) {
        return alquilerRepository.findById(id).orElse(null);
    }

    @PostMapping
    public Alquiler crear(@RequestBody Alquiler alquiler) {
        return alquilerRepository.save(alquiler);
    }

    @PutMapping("/{id}")
    public Alquiler actualizar(@PathVariable Long id, @RequestBody Alquiler alquilerActualizado) {
        Optional<Alquiler> alquilerOpt = alquilerRepository.findById(id);
        if (alquilerOpt.isPresent()) {
            Alquiler alquiler = alquilerOpt.get();
            alquiler.setReserva(alquilerActualizado.getReserva());
            alquiler.setFechaEntrega(alquilerActualizado.getFechaEntrega());
            alquiler.setFechaDevolucion(alquilerActualizado.getFechaDevolucion());
            alquiler.setKilometrajeInicial(alquilerActualizado.getKilometrajeInicial());
            alquiler.setKilometrajeFinal(alquilerActualizado.getKilometrajeFinal());
            alquiler.setTotal(alquilerActualizado.getTotal());
            return alquilerRepository.save(alquiler);
        }
        return null;
    }

    @DeleteMapping("/{id}")
    public void eliminar(@PathVariable Long id) {
        alquilerRepository.deleteById(id);
    }
}
