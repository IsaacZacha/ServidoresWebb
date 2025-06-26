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

import com.Alquiler.Proyecto.Entity.Inspeccion;
import com.Alquiler.Proyecto.repository.InspeccionRepository;

@RestController
@RequestMapping("/inspecciones")
public class InspeccionController {

    @Autowired
    private InspeccionRepository inspeccionRepository;

    @GetMapping
    public List<Inspeccion> obtenerTodas() {
        return inspeccionRepository.findAll();
    }

    @GetMapping("/{id}")
    public Inspeccion obtenerPorId(@PathVariable Long id) {
        return inspeccionRepository.findById(id).orElse(null);
    }

    @PostMapping
    public Inspeccion crear(@RequestBody Inspeccion inspeccion) {
        return inspeccionRepository.save(inspeccion);
    }

    @PutMapping("/{id}")
    public Inspeccion actualizar(@PathVariable Long id, @RequestBody Inspeccion inspeccionActualizada) {
        Optional<Inspeccion> insOpt = inspeccionRepository.findById(id);
        if (insOpt.isPresent()) {
            Inspeccion ins = insOpt.get();
            ins.setFecha(inspeccionActualizada.getFecha());
            ins.setObservaciones(inspeccionActualizada.getObservaciones());
            ins.setEstadoVehiculo(inspeccionActualizada.getEstadoVehiculo());
            ins.setAlquiler(inspeccionActualizada.getAlquiler());
            return inspeccionRepository.save(ins);
        }
        return null;
    }

    @DeleteMapping("/{id}")
    public void eliminar(@PathVariable Long id) {
        inspeccionRepository.deleteById(id);
    }
}
