package com.cadastropessoa.vitorikeziri.cadastrodepessoa.dto;

import com.cadastropessoa.vitorikeziri.cadastrodepessoa.infraestructure.entitys.Pessoa;
import lombok.Data;
import org.springframework.beans.BeanUtils;

@Data
public class PessoaDTO {

    private Integer id;
    private String nome;
    private String cpf;
    private String email;
    private String telefone;
    private String cep;
    private String endereco;
    private String bairro;
    private String cidade;
    private String estado;

    public PessoaDTO(Pessoa pessoa){
        BeanUtils.copyProperties(pessoa, this);
    }

    public PessoaDTO(){

    }

    public Integer getId() {
        return id;
    }

    public void setId(Integer id) {
        this.id = id;
    }

    public String getNome() {
        return nome;
    }

    public void setNome(String nome) {
        this.nome = nome;
    }

    public String getCpf() {
        return cpf;
    }

    public void setCpf(String cpf) {
        this.cpf = cpf;
    }

    public String getEmail() {
        return email;
    }

    public void setEmail(String email) {
        this.email = email;
    }

    public String getCep() {
        return cep;
    }

    public void setCep(String cep) {
        this.cep = cep;
    }

    public String getTelefone() {
        return telefone;
    }

    public void setTelefone(String telefone) {
        this.telefone = telefone;
    }

    public String getEndereco() {
        return endereco;
    }

    public void setEndereco(String endereco) {
        this.endereco = endereco;
    }

    public String getBairro() {
        return bairro;
    }

    public void setBairro(String bairro) {
        this.bairro = bairro;
    }

    public String getCidade() {
        return cidade;
    }

    public void setCidade(String cidade) {
        this.cidade = cidade;
    }

    public String getEstado() {
        return estado;
    }

    public void setEstado(String estado) {
        this.estado = estado;
    }
}
