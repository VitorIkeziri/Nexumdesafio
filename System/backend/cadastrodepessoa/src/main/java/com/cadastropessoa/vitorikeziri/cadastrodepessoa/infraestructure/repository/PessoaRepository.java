package com.cadastropessoa.vitorikeziri.cadastrodepessoa.infraestructure.repository;

import com.cadastropessoa.vitorikeziri.cadastrodepessoa.infraestructure.entitys.Pessoa;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.transaction.annotation.Transactional;

import java.util.Optional;

public interface PessoaRepository extends JpaRepository<Pessoa, Integer> {

    Optional<Pessoa> findByCpf(String cpf);

    Optional<Pessoa> findByEmail(String email);

    @Transactional
    void deleteByCpf(String cpf);
}
