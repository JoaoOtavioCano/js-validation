//criando os objetos dos elementos de texto do form

var nome = document.querySelector("#inputName");
var nomeHelp = document.querySelector("#inputNameHelp");
var ano = document.querySelector("#inputYear");
var anoHelp = document.querySelector("#inputYearHelp");
var email = document.querySelector("#inputEmail");
var emailHelp = document.querySelector("#inputEmailHelp");
var password = document.querySelector("#inputPassword");
var passwordHelp = document.querySelector("#inputPasswordHelp");
var passStrengthMeter = document.querySelector("#passStrengthMeter");


/*declarando o evento listener para o campos de texto do form. 
Uma vez o foco do campo inputName mude, será chamada a função validarNome*/
nome.addEventListener('focusout', validarNome);

/*declaração tradicional de função validarNome(e)
'e' é o objeto do tipo evento que contém, alpem de outras propriedades, o objeto que iniciou o evento,
neste caso o objeto 'nome'
*/

function validarNome(e){ 
    //declaração da expressão regular para definir o formato de um nome válido
    const regexNome = /^[A-Z][a-z]+[a-z]+$/;
    
    console.log(e); //impressão em console do objeto evento e
    console.log(e.target.value); //impressão em console do valor do objeto 'nome' que originou o evento   

    if(e.target.value.trim().match(regexNome)==null || e.target.value.trim().length <= 6){
        //muda o conteúdo e o estilo do objeto nomeHelp que referencia o elemento html com id=inputNameHelp
        nomeHelp.textContent = "Formato de nome inválido"; 
        nomeHelp.style.color="red";
    }
    else{
        nomeHelp.textContent = "";
    }       
}

/*declarando o evento listener para o campos de texto do form. 
Uma vez o foco seja mudado, será chamada a função validarNome*/

//declaração de função de forma anônima usando uma expressão de função de seta =>

ano.addEventListener('focusout', () => {
    //declaração da expressão regular para definir o formato de um ano válido
    const regexAno = /^[0-9]{4}$/;
    //tirar (trim) espaços em branco antes e depois da string
    const anoTrimado = ano.value.trim();
    console.log(ano.value);

    if(anoTrimado.match(regexAno)==null){
        //muda o conteúdo e o estilo do objeto nomeHelp que referencia o elemento html com id=inputYearHelp
        anoHelp.textContent = "Formato de ano inválido";
        anoHelp.style.color="red";
    }
    else{
        //objeto Date
        var date = new Date();
        //obtem o ano atual
        console.log(date.getFullYear()); 
        
        if( parseInt(anoTrimado) > parseInt(date.getFullYear()) ){
             //muda o conteúdo e o estilo do objeto nomeHelp que referencia o elemento html com id=inputYearHelp
            anoHelp.textContent = `Ano inválido. O ano não pode ser maior que ${date.getFullYear()}.`;
            anoHelp.style.color="red";
        }
        else if( parseInt(anoTrimado) < parseInt(date.getFullYear())-124 ){
             //muda o conteúdo e o estilo do objeto nomeHelp que referencia o elemento html com id=inputYearHelp
            anoHelp.textContent = `Ano inválido. O ano não pode ser menor que ${date.getFullYear()-124}.`;
            anoHelp.style.color="red";
        }
        else{
            anoHelp.textContent="";
        }        
        
    }
});



email.addEventListener('focusout', () => {
    const regexEmail = /^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*\.(?:br|com|net|org)$/;

    const emailValue = email.value.trim();
    console.log(emailValue);

    if(emailValue.match(regexEmail)==null){
        emailHelp.textContent = "Formato de email inválido";
        emailHelp.style.color="red";
    }else{
        emailHelp.textContent = "";
    }   
});


password.addEventListener('focusout', () => {
    const regexPassword = /^(?=.*[a-zA-Z])(?=.*[0-9])(?=.*[@#$%&!+])[0-9a-zA-Z@$%&!+]{6,20}$/;
    const passwordValue = password.value.trim();



    if(passwordValue.match(regexPassword)==null || passwordValue.includes(ano.value.trim()) || passwordValue.includes(nome.value.trim())){
        passwordHelp.textContent = "Formato de senha inválido";
        passwordHelp.style.color="red";
        passStrengthMeter.value = "0";
    }else{
        passwordHelp.textContent = "";

        const regexWeakPass = /^(?=.*[@#$%&!+])(?=.*[0-9]).{6,7}$/;
        const regexMediumPass = /^(?=.*[A-Z])(?=.*[0-9])(?=.*[@#$%&!+])[0-9a-zA-Z@$%&!+]{8,}$/;

        
        if (has2OrMoreCapitalLetters(passwordValue) && has2OrMoreNum(passwordValue) && has2OrMoreSpecial(passwordValue) && passwordValue.length >= 12)  {
            passStrengthMeter.value = "30";
        }else if (passwordValue.match(regexMediumPass)!=null) {
            passStrengthMeter.value = "20";
        }else if (passwordValue.match(regexWeakPass)!=null){
            passStrengthMeter.value = "10";
        }else {
            passStrengthMeter.value = "0";

        }
        
    }

});

function has2OrMoreCapitalLetters(string) {
    let count = 0;

    string.split("").forEach(character => {
        
        if (character === character.toUpperCase()) {
            count++;
        }
    });
    if (count >= 2){
        return true;
    }else {

        return false;
    }


}

function has2OrMoreNum(string) {
    let count = 0;

    string.split("").forEach(character => {
        
        if ( /\d/.test(character)) {
            count++;
        }
    });
    if (count >= 2){
        return true;
    }else {

        return false;
    }


}
function has2OrMoreSpecial(string) {
    let count = 0;
    const specialChars = "@#$%&!+";


    string.split("").forEach(character => {
        
        if ( specialChars.includes(character)) {
            count++;
        }
    });
    if (count >= 2){
        return true;
    }else {

        return false;
    }


}