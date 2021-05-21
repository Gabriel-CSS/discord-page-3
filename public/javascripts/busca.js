var btnBuscar = document.getElementById("btn-buscar"),
    input = document.getElementsByClassName("input")[5],
    ul = document.getElementById('ul'),
    not_found = document.getElementsByClassName("not-found")[0],
    admin = localStorage.getItem("admin"),
    box_post = document.getElementsByClassName("box-post")[0],
    btn_post = document.getElementById('btn-post'),
    btn_sendpost = document.getElementById('btn-send-post'),
    error_span3 = document.getElementsByClassName("error-span")[2];

box_post.className = "box-post hide";

if (admin == "true")
    btn_post.className = "";
else
    btn_post.className = "hide";


function limparBusca() {
    ul.innerHTML = "";
    not_found.innerHTML = "";
    not_found.className = "not-found hide";
    error_span3.innerHTML = "";
}

function showTelaPublicar() {
    box_post.className = "box-post";
}

function hideTelaPublicar() {
    box_post.className = "box-post hide";
}

async function buscar() {
    limparBusca();

    if (input.value === "" || !input.value.trim()) {
        not_found.innerHTML = "É necessário informar algum valor para a busca!";
        return not_found.className = "not-found";
    }

    await axios.get('./series/busca/?nome=' + input.value)
        .then((res) => {
            if (res.status === 200) {
                var docs = res.data;

                if (docs.length <= 0) {
                    not_found.innerHTML = "Não foram encontrados resultados a partir desta busca!";
                    return not_found.className = "not-found";
                }

                for (var i = 0; i < docs.length && i < 10; i++) {
                    if (input.value != "") {
                        var busca_resultados = document.createElement('div'),
                            nome_serie = document.createElement('div'),
                            center_container = document.createElement('div'),
                            resultado_left = document.createElement('div'),
                            img = document.createElement('img'),
                            resultado_right = document.createElement('div'),
                            estreia = document.createElement('p'),
                            generos = document.createElement('p'),
                            rate = document.createElement('p'),
                            emissora = document.createElement('p'),
                            pais = document.createElement('p'),
                            site = document.createElement('p'),
                            summary = document.createElement('p');

                        busca_resultados.className = "busca-resultados";
                        nome_serie.className = "nome-serie";
                        center_container.className = "center-container";
                        resultado_left.className = "resultado-left";
                        resultado_right.className = "resultado-right";

                        if (docs[i].nome != null) {
                            nome_serie.innerHTML = docs[i].nome;
                        }

                        if (docs[i].imagem != null)
                            img.src = docs[i].imagem;

                        if (docs[i].site === null) {
                            site.innerHTML = 'Site: unknown';
                        } else {
                            site.innerHTML = 'Site: ' + docs[i].site;
                        }

                        if (docs[i].genero === null) {
                            generos.innerHTML = 'Gêneros: unknown';
                        } else {
                            generos.innerHTML = 'Gêneros: ' + docs[i].genero;
                        }

                        if (docs[i].estreia === null) {
                            estreia.innerHTML = 'Estreia: unknown';
                        } else {
                            estreia.innerHTML = 'Estreia: ' + docs[i].estreia;
                        }

                        if (docs[i].imdb === null) {
                            rate.innerHTML = 'IMDb rate: unknown';
                        } else {
                            rate.innerHTML = 'IMDb rate: ' + docs[i].imdb;
                        }

                        if (docs[i].emissora === null) {
                            emissora.innerHTML = 'Emissora: unknown';
                        } else {
                            emissora.innerHTML = 'Emissora: ' + docs[i].emissora;
                        }

                        if (docs[i].pais != null) {
                            pais.innerHTML = 'País: ' + docs[i].pais;
                        } else {
                            pais.innerHTML = 'País: unknown';
                        }

                        if (docs[i].sinopse === null) {
                            summary.innerHTML = 'Sinopse: unknown';
                        } else {
                            summary.innerHTML = 'Sinopse:\n' + docs[i].sinopse;
                        }

                        resultado_left.appendChild(img);

                        resultado_right.appendChild(estreia);
                        resultado_right.appendChild(site);
                        resultado_right.appendChild(generos);
                        resultado_right.appendChild(rate);
                        resultado_right.appendChild(emissora);
                        resultado_right.appendChild(pais);
                        resultado_right.appendChild(summary);


                        center_container.appendChild(resultado_left);
                        center_container.appendChild(resultado_right);

                        busca_resultados.appendChild(nome_serie);
                        busca_resultados.appendChild(center_container);

                        ul.appendChild(busca_resultados);
                    }
                }
            }
        })
        .catch((error) => {
            console.log(error.response.data);
            var error_msg = error.response.data.error;
            not_found.innerHTML = "Erro ao buscar - " + error_msg;
            return not_found.className = "not-found";
        })
}

btn_sendpost.addEventListener("click", async() => {
    var nome = document.getElementsByClassName("input-post")[0].value,
        estreia = document.getElementsByClassName("input-post")[1].value,
        site = document.getElementsByClassName("input-post")[2].value,
        genero = document.getElementsByClassName("input-post")[3].value,
        imdb = document.getElementsByClassName("input-post")[4].value,
        emissora = document.getElementsByClassName("input-post")[5].value,
        pais = document.getElementsByClassName("input-post")[6].value,
        sinopse = document.getElementsByClassName("input-post")[7].value,
        imagem = document.getElementsByClassName("input-post")[8].files[0];

    const formData = new FormData();
    formData.append('nome', nome);
    formData.append('estreia', estreia);
    formData.append('site', site);
    formData.append('genero', genero);
    formData.append('imdb', imdb);
    formData.append('emissora', emissora);
    formData.append('pais', pais);
    formData.append('sinopse', sinopse);
    formData.append('imagem', imagem);

    if (nome.length > 3) {
        await axios.post('./series/post/', formData)
            .then((res) => {
                if (res.status === 200) {
                    error_span3.innerHTML = "Conteudo publicado com sucesso.";
                    setTimeout(function() {
                        hideTelaPublicar();
                        limparBusca();
                        for (let i = 0; i < 8; i++) {
                            document.getElementsByClassName("input-post")[i].value = "";
                        }
                        window.location.assign("../#id-busca");
                    }, 4000);
                }
            })
            .catch((error) => {
                console.log(error.response.data);
                var error_msg = error.response.data.error;
                return error_span3.innerHTML = "Erro ao publicar - " + error_msg;
            })
    }
});

btnBuscar.addEventListener('click', async() => {
    buscar();
});

input.addEventListener('keyup', async(event) => {
    var key = event.which || event.keyCode;
    if (key == 13) {
        buscar();
    }
});