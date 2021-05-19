var _token = localStorage.getItem("token"),
    box_login = document.getElementsByClassName("box-login")[0],
    box_registro = document.getElementsByClassName("box-registro")[0],
    box_busca = document.getElementsByClassName("box-busca")[0],
    div_entrar = document.getElementById("div-entrar"),
    error_span_ = document.getElementsByClassName("error-span")[0];

if (_token) {
    logar();
} else {
    deslogar();
    box_login.className = "box-login hide";
    box_registro.className = "box-registro hide";
}

function logar() {
    box_login.className = "box-login hide";
    box_registro.className = "box-registro hide";
    box_busca.className = "box-busca";
    div_entrar.innerHTML = "Deslogar";
    div_entrar.className = "logado";
    document.getElementsByClassName("input")[1].value = "";
}

function deslogar() {
    localStorage.removeItem("token");
    box_login.className = "box-login";
    box_busca.className = "box-busca hide";
    div_entrar.innerHTML = "Entrar";
    div_entrar.className = "deslogado";
    error_span_.innerHTML = "";
}

function onClickEntrar() {
    if (div_entrar.className === "logado") {
        deslogar();
    } else {
        box_login.className = "box-login show-box-login";
        box_registro.className = "box-registro hide";
    }
}

function hideBoxLogin() {
    box_login.className = "box-login hide";
}

function validarLogin(entrada, senha) {
    var email_h5 = document.getElementsByTagName("h5")[0],
        senha_h5 = document.getElementsByTagName("h5")[1];

    error_span_.innerHTML = "";
    email_h5.innerHTML = "E-MAIL OU NÚMERO DE TELEFONE";
    senha_h5.innerHTML = "SENHA";
    email_h5.className = "";
    senha_h5.className = "";

    if ((entrada === "" || !entrada.trim()) && (senha === "" || !senha.trim())) {
        senha_h5.className = "error";
        senha_h5.innerHTML = "SENHA - Este campo é obrigatório";
        email_h5.className = "error";
        email_h5.innerHTML = "E-MAIL OU NÚMERO DE TELEFONE - Este campo é obrigatório";
        return false;
    }
    if (senha === "" || !senha.trim()) {
        senha_h5.className = "error";
        senha_h5.innerHTML = "SENHA - Este campo é obrigatório";
        return false;
    }
    if (entrada === "" || !entrada.trim()) {
        email_h5.className = "error";
        email_h5.innerHTML = "E-MAIL OU NÚMERO DE TELEFONE - Este campo é obrigatório";
        return false;
    }
    return true;
}

document.getElementById("btn-login")
    .addEventListener("click", async() => {

        var entrada = document.getElementsByClassName("input")[0].value,
            senha = document.getElementsByClassName("input")[1].value;

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
                        error_span_.innerHTML = "Logado com sucesso. Aguarde a tela de busca...";
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
                    console.log(error_msg);
                    return error_span_.innerHTML = "Erro ao logar - " + error_msg;
                })
        }
    });