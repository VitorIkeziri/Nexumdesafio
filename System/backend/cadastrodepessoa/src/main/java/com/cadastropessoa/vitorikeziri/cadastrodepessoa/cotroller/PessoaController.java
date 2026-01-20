package com.cadastropessoa.vitorikeziri.cadastrodepessoa.cotroller;

import com.cadastropessoa.vitorikeziri.cadastrodepessoa.business.PessoaService;
import com.cadastropessoa.vitorikeziri.cadastrodepessoa.dto.PessoaDTO;
import com.cadastropessoa.vitorikeziri.cadastrodepessoa.infraestructure.entitys.Pessoa;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@CrossOrigin(origins = "http://localhost:5173")
@RestController
@RequestMapping("/pessoa")
@RequiredArgsConstructor
public class PessoaController {

    private final PessoaService pessoaService;

    @PostMapping
    public ResponseEntity<Void> salvarPessoa(@RequestBody Pessoa pessoa) {
        pessoaService.salvarPessoa(pessoa);
        return ResponseEntity.ok().build();
    }

    @GetMapping("/cpf")
    public ResponseEntity<Pessoa> buscarPessoaPorCpf(@RequestParam String cpf) {
        return ResponseEntity.ok(pessoaService.buscarPessoaPorCpf(cpf));
    }

    @GetMapping("/email")
    public ResponseEntity<Pessoa> buscarPessoaPorEmail(@RequestParam String email) {
        return ResponseEntity.ok(pessoaService.buscarPessoaPorEmail(email));
    }

    @DeleteMapping
    public ResponseEntity<Void> deletarPessoaPorCpf(@RequestParam String cpf) {
        pessoaService.deletarPessoaPorCpf(cpf);
        return ResponseEntity.noContent().build();
    }

    @PutMapping("/{id}")
    public ResponseEntity<Void> atualizarPessoaPorId(
            @PathVariable Integer id,
            @RequestBody PessoaDTO pessoaDTO) {

        pessoaService.atualizarPessoaPorId(id, pessoaDTO);
        return ResponseEntity.noContent().build();
    }

    @GetMapping("/todos")
    public ResponseEntity<List<Pessoa>> listarTodas() {
        return ResponseEntity.ok(pessoaService.listarTodas());
    }
}