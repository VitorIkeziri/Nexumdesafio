package com.cadastropessoa.vitorikeziri.cadastrodepessoa.infraestructure.entitys;

import com.cadastropessoa.vitorikeziri.cadastrodepessoa.dto.PessoaDTO;
import jakarta.persistence.*;
import lombok.*;
import org.springframework.beans.BeanUtils;

@Getter
@Setter
@AllArgsConstructor
@NoArgsConstructor
@Builder
@Table(name = "pessoa")
@Entity


public class Pessoa {

    @Id
    @GeneratedValue(strategy = GenerationType.AUTO)
    private Integer id;

    @Column(name = "cpf", unique = true)
    private String cpf;

    @Column(name = "email", unique = true)
    private String email;

    @Column(name = "telefone", unique = true)
    private String telefone;

    @Column(name = "nome")
    private String nome;

    @Column(name = "cep")
    private String cep;

    @Column(name = "endereco")
    private String endereco;

    @Column(name = "bairro")
    private String bairro;

    @Column(name = "cidade")
    private String cidade;

    @Column(name = "estado")
    private String estado;

    public Pessoa(PessoaDTO pessoa){
        BeanUtils.copyProperties(pessoa, this);
    }
}
