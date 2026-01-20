package com.cadastropessoa.vitorikeziri.cadastrodepessoa.business;

import com.cadastropessoa.vitorikeziri.cadastrodepessoa.dto.PessoaDTO;
import com.cadastropessoa.vitorikeziri.cadastrodepessoa.infraestructure.entitys.Pessoa;
import com.cadastropessoa.vitorikeziri.cadastrodepessoa.infraestructure.repository.PessoaRepository;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class PessoaService {

    private final PessoaRepository repository;

    public PessoaService(PessoaRepository repository) {
        this.repository = repository;
    }

    public void salvarPessoa(Pessoa pessoa) {
        repository.saveAndFlush(pessoa);
    }

    public Pessoa buscarPessoaPorCpf(String cpf) {
        return repository.findByCpf(cpf)
                .orElseThrow(() -> new RuntimeException("CPF não encontrado"));
    }

    private String normalizarEmail(String email) {
        return email == null ? null : email.trim().toLowerCase();
    }

    public Pessoa buscarPessoaPorEmail(String email) {
        return repository.findByEmail(normalizarEmail(email))
                .orElseThrow(() -> new RuntimeException("E-mail não encontrado"));
    }

    public List<Pessoa> listarTodas() {
        return repository.findAll();
    }

    public void deletarPessoaPorCpf(String cpf) {
        repository.deleteByCpf(cpf);
    }

    public void atualizarPessoaPorId(Integer id, PessoaDTO dto) {

        Pessoa pessoaEntity = repository.findById(id)
                .orElseThrow(() -> new RuntimeException("Pessoa não encontrada"));

        if (dto.getCpf() != null) {
            pessoaEntity.setCpf(dto.getCpf());
        }
        if (dto.getNome() != null) {
            pessoaEntity.setNome(dto.getNome());
        }
        if (dto.getEmail() != null) {
            pessoaEntity.setEmail(dto.getEmail());
        }
        if (dto.getTelefone() != null) {
            pessoaEntity.setTelefone(dto.getTelefone());
        }
        if (dto.getCep() != null) {
            pessoaEntity.setCep(dto.getCep());
        }
        if (dto.getEndereco() != null) {
            pessoaEntity.setEndereco(dto.getEndereco());
        }
        if (dto.getBairro() != null) {
            pessoaEntity.setBairro(dto.getBairro());
        }
        if (dto.getCidade() != null) {
            pessoaEntity.setCidade(dto.getCidade());
        }
        if (dto.getEstado() != null) {
            pessoaEntity.setEstado(dto.getEstado());
        }

        repository.save(pessoaEntity);
    }
}