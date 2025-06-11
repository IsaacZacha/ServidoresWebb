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

import com.Alquiler.Proyecto.Entity.Multa;
import com.Alquiler.Proyecto.repository.MultaRepository;

@RestController
@RequestMapping("/multas")
public class MultaController {

    @Autowired
    private MultaRepository multaRepository;

    @GetMapping
    public List<Multa> obtenerTodas() {
        return multaRepository.findAll();
    }

    @GetMapping("/{id}")
    public Multa obtenerPorId(@PathVariable Long id) {
        return multaRepository.findById(id).orElse(null);
    }

    @PostMapping
    public Multa crear(@RequestBody Multa multa) {
        return multaRepository.save(multa);
    }

    @PutMapping("/{id}")
    public Multa actualizar(@PathVariable Long id, @RequestBody Multa multaActualizada) {
        Optional<Multa> multaOpt = multaRepository.findById(id);
        if (multaOpt.isPresent()) {
            Multa multa = multaOpt.get();
            multa.setMotivo(multaActualizada.getMotivo());
            multa.setMonto(multaActualizada.getMonto());
            multa.setFecha(multaActualizada.getFecha());
            multa.setAlquiler(multaActualizada.getAlquiler());
            return multaRepository.save(multa);
        }
        return null;
    }

    @DeleteMapping("/{id}")
    public void eliminar(@PathVariable Long id) {
        multaRepository.deleteById(id);
    }
}
