const inputTexto = document.querySelector(".input-texto");
const resultado = document.querySelector(".resultado");

const btnCriptografar = document.querySelector(".btn-criptografar");
const btnDescriptografar = document.querySelector(".btn-descriptografar");

const mensagensErro = document.querySelector(".mensagens-erro");

function criptografar(texto) {
    const caracteres = texto.value.split("");

    caracteres.forEach(function(item, i) {
        if(item == "a") {
            caracteres[i] = "ai";

        } else if(item == "e") {
            caracteres[i] = "enter";

        } else if(item == "i") {
            caracteres[i] = "imes";

        } else if(item == "o") {
            caracteres[i] = "ober";

        } else if(item == "u") {
            caracteres[i] = "ufat";
        }
    })
    return caracteres.join("");
}

function descriptografar(texto) {
    const codigo = [["a", "ai"], ["e", "enter"], ["i", "imes"], ["o", "ober"], ["u", "ufat"]];
    texto = texto.value;

    for(let i = 0; i < codigo.length; i++) {
        if(texto.includes(codigo[i][1])) {
            texto = texto.replaceAll(codigo[i][1], codigo[i][0]);
        }
    }
    return texto;
}

function escreveCodificado() {
    const btnCopiar = document.querySelector(".btn-copiar");
    btnCopiar.classList.remove("invisivel");
    
    resultado.textContent = criptografar(inputTexto);
}

function escreveDecodificado() {
    const btnCopiar = document.querySelector(".btn-copiar");
    btnCopiar.classList.remove("invisivel");

    resultado.textContent = descriptografar(inputTexto);
}

btnCriptografar.onclick = function() {
    let erros = validaTexto(inputTexto);

    if(erros.length > 0) {
        mostraErros(erros);
        resultado.textContent = "";
        return;
    }

    escreveCodificado();
    mensagensErro.innerHTML = "";
}

btnDescriptografar.onclick = function() {
    let erros = validaTexto(inputTexto);

    if(erros.length > 0) {
        mostraErros(erros);
        resultado.textContent = "";
        return;
    }
    
    escreveDecodificado();
    mensagensErro.innerHTML = "";
}

// copiar

const btnCopiar = document.querySelector(".btn-copiar");

btnCopiar.onclick = function() {
    resultado.select();
    document.execCommand("copy");
    inputTexto.value = "";
    inputTexto.focus();
    resultado.textContent = "";
    btnCopiar.classList.add("invisivel");
}

// validação

function validaTexto(texto) {
    let erros = [];

    if(texto.value == 0) erros.push(" Digite algo!");

    if(/[A-Z-À-Ú-à-ú]/.test(texto.value)) erros.push(" Apenas letras minúsculas e sem acento!");

    return erros;
}

function mostraErros(erros) {
    let ul = document.querySelector(".mensagens-erro");
    ul.innerHTML = "";

    erros.forEach(function(erro) {
        let li = document.createElement("li");
        li.textContent = erro;
        ul.appendChild(li);
    });
    
}