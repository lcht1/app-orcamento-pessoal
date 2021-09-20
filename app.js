class Despesa {
    constructor(ano, mes, dia, descricao, valor) {
        this.ano = ano
        this.mes = mes
        this.dia = dia
        this.descricao = descricao
        this.valor = valor
    }

    validarDados() {
        for (let i in this) {
            if (this[i] == undefined || this[i] == '' || this[i] == null)
                return false
            else
                return true
        }
    }
}

// banco de dados(localStorage do Chrome)
class Bd {
    constructor() {

        if (localStorage.getItem('id') === null) // se 'id' for null
            localStorage.setItem('id', 0) // colocar 0 no campo de id
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

    if (despesa.validarDados())
        $('#sucessoGravacao').modal('show')
    else
        //erro
        $('#erroGravacao').modal('show')

}
