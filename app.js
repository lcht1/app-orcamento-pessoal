class Despesa {
    constructor(ano, mes, dia, tipo, descricao, valor) {
        this.ano = ano
        this.mes = mes
        this.dia = dia
        this.tipo = tipo
        this.descricao = descricao
        this.valor = valor
    }

    validarDados() {
        for (let i in this) {
            if (this[i] == undefined || this[i] == '' || this[i] == null) {
                return false
            }
        }
        return true
    }
}
//Chrome localstorage
class Bd {
    constructor() {

        if (localStorage.getItem('id') === null)
            localStorage.setItem('id', 0)
    }


    getProximoId() {
        let proximoId = localStorage.getItem('id') //id é null
        return parseInt(proximoId) + 1
    }

    gravar(d) {
        let id = this.getProximoId()
        localStorage.setItem(id, JSON.stringify(d)) // novo registro dentro do localstorage 

        localStorage.setItem('id', id)
    }

    recuperarTodosRegistros() {

        let despesas = []

        let id = localStorage.getItem('id')

        for (let i = 1; i <= id; i++) {

            //recuperar a despesa
            let despesa = JSON.parse(localStorage.getItem(i))

            if (despesa == null) {
                continue // evita que adicione despesa já excluida do localstorage
            }
            despesas.push(despesa)



        }
        return despesas

    }

    pesquisar(despesa) {
        let despesasFiltradas = []

        despesasFiltradas = this.recuperarTodosRegistros()

        console.log(despesa)

        //ano
        if (despesa.ano != '') {
            console.log("filtro de ano");
            despesasFiltradas = despesasFiltradas.filter(d =>
                d.ano == despesa.ano
            )
        }

        //mes
        if (despesa.mes != '') {
            console.log("filtro de mes");
            despesasFiltradas = despesasFiltradas.filter(d =>
                d.mes == despesa.mes
            )
        }

        //dia
        if (despesa.dia != '') {
            console.log("filtro de dia");
            despesasFiltradas = despesasFiltradas.filter(d =>
                d.dia == despesa.dia
            )
        }
        //tipo

        if (despesa.tipo != '') {
            console.log("filtro de tipo");
            despesasFiltradas = despesasFiltradas.filter(d =>
                d.tipo == despesa.tipo
            )
        }

        //descricao

        if (despesa.descricao != '') {
            console.log("filtro de descricao");
            despesasFiltradas = despesasFiltradas.filter(d =>
                d.descricao.toUpperCase() == despesa.descricao.toUpperCase()
            )
        }

        //valor


        if (despesa.valor != '') {
            console.log("filtro de valor");
            despesasFiltradas = despesasFiltradas.filter(d =>
                d.valor == despesa.valor
            )
        }


        return despesasFiltradas



    }
}


let bd = new Bd()

function cadastrarDespesa() {
    let ano = document.getElementById('ano')
    let mes = document.getElementById('mes')
    let dia = document.getElementById('dia')
    let tipo = document.getElementById('tipo')
    let descricao = document.getElementById('descricao')
    let valor = document.getElementById('valor')


    let despesa = new Despesa(
        ano.value,
        mes.value,
        dia.value,
        tipo.value,
        descricao.value,
        valor.value
    )

    if (despesa.validarDados()) {
        bd.gravar(despesa)
        $('#modalRegistraDespesa').modal('show')

        document.getElementById('exampleModalLabel').innerHTML = 'Gravado com sucesso'
        document.getElementById('modal-span').innerHTML = 'Sua despesa foi registrada'

        document.getElementById('modal-content').className = 'modal-header text-success'

        document.getElementById('btn').className = 'btn btn-success'

        ano.value = ''
        mes.value = ''
        dia.value = ''
        tipo.value = ''
        descricao.value = ''
        valor.value = ''

    }
    else {
        $('#modalRegistraDespesa').modal('show')

        document.getElementById('exampleModalLabel').innerHTML = 'Erro de Gravação'
        document.getElementById('modal-span').innerHTML = 'Por favor, verifique todos os dados'

        document.getElementById('modal-content').className = 'modal-header text-danger'
        document.getElementById('btn').className = 'btn btn-danger'



    }

}

function carregarListaDespesas(despesas = [], filtro = false) {

    if(despesas.lenght == 0 || filtro == false) {

        despesas = bd.recuperarTodosRegistros()
    }

    var listaDespesas = document.getElementById('listaDespesas')

    console.log(despesas)

    // listar cada despesa
    despesas.forEach(function (despesa) {
        // criando linhas
        let linha = listaDespesas.insertRow()

        // criando colunas
        linha.insertCell(0).innerHTML = `${despesa.dia}/${despesa.mes}/${despesa.ano}`


        switch (despesa.tipo) {
            case '1': despesa.tipo = 'Alimentação'
                break
            case '2': despesa.tipo = 'Educação'
                break
            case '3': despesa.tipo = 'Lazer'
                break
            case '4': despesa.tipo = 'Saúde'
                break
            case '5': despesa.tipo = 'Transporte'
                break
        }
        linha.insertCell(1).innerHTML = despesa.tipo

        linha.insertCell(2).innerHTML = despesa.descricao
        linha.insertCell(3).innerHTML = `R$ ${despesa.valor}`

    })

}

function pesquisarDespesa() {
    let ano = document.getElementById('ano').value
    let mes = document.getElementById('mes').value
    let dia = document.getElementById('dia').value
    let tipo = document.getElementById('tipo').value
    let descricao = document.getElementById('descricao').value
    let valor = document.getElementById('valor').value

    let despesa = new Despesa(ano, mes, dia, tipo, descricao, valor)
    let despesas = bd.pesquisar(despesa)



    var listaDespesas = document.getElementById('listaDespesas')
    listaDespesas.innerHTML = ''

    carregarListaDespesas(despesas,  true)
    
}