var box_registro = document.getElementsByClassName("box-registro")[0],
    box_login = document.getElementsByClassName("box-login")[0],
    box_busca = document.getElementsByClassName("box-busca")[0],
    div_entrar = document.getElementById("div-entrar"),
    error_span = document.getElementById("error-span");

function registrar() {
    box_registro.className = "box-registro hide";
    box_busca.className = "box-busca";
    div_entrar.innerHTML = "Deslogar";
    div_entrar.className = "logado";
    document.getElementsByClassName("input")[4].value = "";
}

function showBoxRegistro() {
    box_registro.className = "box-registro show-box-registro";
    box_login.className = "box-login hide";
}

function hideBoxRegistro() {
    box_registro.className = "box-registro hide";
}

function validarRegistro(nome, email, senha) {
    var nome_h5 = document.getElementsByTagName("h5")[2],
        email_h5 = document.getElementsByTagName("h5")[3],
        senha_h5 = document.getElementsByTagName("h5")[4];

    error_span.innerHTML = "";
    nome_h5.innerHTML = "NOME";
    email_h5.innerHTML = "E-MAIL";
    senha_h5.innerHTML = "SENHA";
    nome_h5.className = "";
    email_h5.className = "";
    senha_h5.className = "";

    if ((email === "" || !email.trim()) && (senha === "" || !senha.trim()) && (nome === "" || !nome.trim())) {
        senha_h5.className = "error";
        senha_h5.innerHTML = "SENHA - Este campo é obrigatório";
        email_h5.className = "error";
        email_h5.innerHTML = "E-MAIL - Este campo é obrigatório";
        nome_h5.className = "error";
        nome_h5.innerHTML = "NOME - Este campo é obrigatório";
        return false;
    }
    if (senha === "" || !senha.trim()) {
        senha_h5.className = "error";
        senha_h5.innerHTML = "SENHA - Este campo é obrigatório";
        return false;
    }
    if (email === "" || !email.trim()) {
        email_h5.className = "error";
        email_h5.innerHTML = "E-MAIL OU NÚMERO DE TELEFONE - Este campo é obrigatório";
        return false;
    }
    if (nome === "" || !nome.trim()) {
        nome_h5.className = "error";
        nome_h5.innerHTML = "NOME - Este campo é obrigatório";
        return false;
    }
    return true;
}

document.getElementById("btn-login") //btn-registro
    .addEventListener("click", async() => {

        var email = document.getElementsByClassName("input")[0].value,
            senha = document.getElementsByClassName("input")[1].value;
        var email_h5 = document.getElementsByTagName("h5")[0];

        if (validarLogin(entrada, senha)) {
            var params = {
                email: entrada,
                password: senha
            }

            axios.post('./login/', params)
                .then((res) => {
                    if (res.status === 200) {
                        var res2 = res.data;
                        _token = res2.token;
                        error_span.innerHTML = "Logado com sucesso. Aguarde a tela de busca...";
                        localStorage.setItem("token", _token);
                        setTimeout(function() {
                            logar();
                            limparBusca();
                            document.getElementsByClassName("input")[2].value = "";
                            window.location.assign("../#id-busca");
                        }, 4000);
                    }
                })
                .catch((error) => {
                    console.log(error.response.data);
                    var error_msg = error.response.data.error;
                    email_h5.className = "error";
                    return email_h5.innerHTML = "E-MAIL - " + error_msg;
                })
        }
    });