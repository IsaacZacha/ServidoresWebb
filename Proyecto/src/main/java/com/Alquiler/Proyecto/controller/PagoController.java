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

import com.Alquiler.Proyecto.Entity.Pago;
import com.Alquiler.Proyecto.repository.PagoRepository;

@RestController
@RequestMapping("/pagos")
public class PagoController {

    @Autowired
    private PagoRepository pagoRepository;

    @GetMapping
    public List<Pago> obtenerTodos() {
        return pagoRepository.findAll();
    }

    @GetMapping("/{id}")
    public Pago obtenerPorId(@PathVariable Long id) {
        return pagoRepository.findById(id).orElse(null);
    }

    @PostMapping
    public Pago crear(@RequestBody Pago pago) {
        return pagoRepository.save(pago);
    }

    @PutMapping("/{id}")
    public Pago actualizar(@PathVariable Long id, @RequestBody Pago pagoActualizado) {
        Optional<Pago> pagoOpt = pagoRepository.findById(id);
        if (pagoOpt.isPresent()) {
            Pago pago = pagoOpt.get();
            pago.setFecha(pagoActualizado.getFecha());
            pago.setMonto(pagoActualizado.getMonto());
            pago.setMetodo(pagoActualizado.getMetodo());
            pago.setAlquiler(pagoActualizado.getAlquiler());
            return pagoRepository.save(pago);
        }
        return null;
    }

    @DeleteMapping("/{id}")
    public void eliminar(@PathVariable Long id) {
        pagoRepository.deleteById(id);
    }
}
