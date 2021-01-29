let cpf = document.querySelector('#document');
cpf.addEventListener('keyup', formatCPF);
function formatCPF(){
    cpf.value = cpf.value.replace(/\D/g,'');
    cpf.value = cpf.value.replace(/(\d{3})(\d)/,'$1.$2');
    cpf.value = cpf.value.replace(/(\d{3})(\d)/,'$1.$2');
    cpf.value = cpf.value.replace(/(\d{3})(\d{1,2})/,'$1-$2');
    cpf.value = cpf.value.replace(/(-\d{2})\d+?$/,'$1');
    if(cpf.value.length == 14){
        getCPF =  cpf.value;
        dots = getCPF.replace(/\./g,'');
        dash = dots.replace(/\-/g,'');
        document.querySelector('#clearCPF').value = dash;
    }
}

let loginBtn = document.querySelector('#loginBtn');
loginBtn.onclick = () => {
    loginBtn.style.backgroundColor = 'rgb(129, 129, 129)'
    validarDocumento()
}

function validarDocumento(){
    if(cpf.value.length == 14){
        clearCPF = document.querySelector('#clearCPF').value;
        ajax1 = new XMLHttpRequest
        ajax1.open('GET',`../cliente/source/compras.php?document=${clearCPF}`)
        ajax1.onloadend = () => {
            resposta = JSON.parse(ajax1.response)
            validarCliente(resposta)
            loginBtn.style.backgroundColor = 'black'
        }
        ajax1.send()
    }else{
        loginBtn.style.backgroundColor = 'black'
        alert('Informe seu CPF completo.')
    }
}

function validarCliente(data){
    if(typeof data[0] != 'undefined'){
        document.querySelector('.logo').style.display = 'block';
        document.querySelector('.logo').style.opacity = '1';
        sessionStorage.setItem('session',data[0].document)
        limparSessao(300000)
        window.location = 'https://deatly.com/cliente/'
    }else{
        alert('Não existem compras registradas no documento informado.');
    }
}

function limparSessao(tempo){
    setTimeout(() => {
        sessionStorage.clear()
        alert('Sessão limpa com sucesso')
    }, tempo);
}