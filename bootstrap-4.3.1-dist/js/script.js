
$('#cadastro').submit(function(e){
	// e.preventDefault()
	

	if(!valida_campos()) {
		return false;
	}

});

$('.close').click(function(e){
	
	$("input").each(function(i){
		$(this).val('');
		fecha(this);	
	});
});

$('#fechar').click(function(e){
	
	$("input").each(function(i){
		$(this).val('');
		fecha(this);	
	});
});




// $('#cadastro').button(function(e){
// 	// e.preventDefault()
// 	document.getElementById('email').value=("");
//     document.getElementById('password').value=("");
//     document.getElementById('confirm_password').value=("");
//     document.getElementById('name').value=("");	
//     document.getElementById('date').value=("");
//     document.getElementById('cpf').value=("");
//     document.getElementById('cep').value=("");
// 	document.getElementById('rua').value=("");
//     document.getElementById('bairro').value=("");
//     document.getElementById('cidade').value=("");
//     document.getElementById('estado').value=("");


// })


function limpa_formulário_cep() {
        //Limpa valores do formulário de cep.
        document.getElementById('rua').value=("");
        document.getElementById('bairro').value=("");
        document.getElementById('cidade').value=("");
        document.getElementById('estado').value=("");
}

function meu_callback(conteudo) {
    if (!("erro" in conteudo)) {
        //Atualiza os campos com os valores.
        document.getElementById('rua').value=(conteudo.logradouro);
        document.getElementById('bairro').value=(conteudo.bairro);
        document.getElementById('cidade').value=(conteudo.localidade);
        document.getElementById('estado').value=(conteudo.uf);
    } //end if.
    else {
        //CEP não Encontrado.
        // limpa_formulário_cep();
        // alert("CEP não encontrado.");
        return false;
    }
}



function pesquisacep(valor) {

    //Nova variável "cep" somente com dígitos.
    var cep = valor.replace(/\D/g, '');

    //Verifica se campo cep possui valor informado.
    if (cep != "") {

        //Expressão regular para validar o CEP.
        var validacep = /^[0-9]{8}$/;

        //Valida o formato do CEP.
        if(validacep.test(cep)) {

            document.getElementById('cep').value = cep.substring(0,5)
            +"-"
            +cep.substring(5);

            //Preenche os campos com "..." enquanto consulta webservice.
            document.getElementById('rua').value="...";
            document.getElementById('bairro').value="...";
            document.getElementById('cidade').value="...";
            document.getElementById('estado').value="..";

            //Cria um elemento javascript.
            var script = document.createElement('script');

            //Sincroniza com o callback.
            script.src = 'https://viacep.com.br/ws/'+ cep + '/json/?callback=meu_callback';

            //Insere script no documento e carrega o conteúdo.
            document.body.appendChild(script);

            return true

        } //end if.
        else {
            //cep é inválido.
            // limpa_formulário_cep();
            // alert("Formato de CEP inválido.");
            return false;
        }
    } //end if.
    else {
        //cep sem valor, limpa formulário.
        // limpa_formulário_cep();
        return false;
    }
};


function isValidCPF(cpf) {
	if(cpf.length == 0){
		return false;
	}


    if (typeof cpf !== "string") return false
    cpf = cpf.replace(/[\s.-]*/igm, '')
    if (
        !cpf ||
        cpf.length != 11 ||
        cpf == "00000000000" ||
        cpf == "11111111111" ||
        cpf == "22222222222" ||
        cpf == "33333333333" ||
        cpf == "44444444444" ||
        cpf == "55555555555" ||
        cpf == "66666666666" ||
        cpf == "77777777777" ||
        cpf == "88888888888" ||
        cpf == "99999999999" 
    ) {
        return false
    }
    var soma = 0
    var resto
    for (var i = 1; i <= 9; i++) 
        soma = soma + parseInt(cpf.substring(i-1, i)) * (11 - i)
    resto = (soma * 10) % 11
    if ((resto == 10) || (resto == 11))  resto = 0
    if (resto != parseInt(cpf.substring(9, 10)) ) return false
    soma = 0
    for (var i = 1; i <= 10; i++) 
        soma = soma + parseInt(cpf.substring(i-1, i)) * (12 - i)
    resto = (soma * 10) % 11
    if ((resto == 10) || (resto == 11))  resto = 0
    if (resto != parseInt(cpf.substring(10, 11) ) ) return false
    return true
}


function validateDate(date){
	if(date.length == 0){
		return false;
	}
	const re = /^(?:(?:31(\/|-|\.)(?:0?[13578]|1[02]))\1|(?:(?:29|30)(\/|-|\.)(?:0?[13-9]|1[0-2])\2))(?:(?:1[6-9]|[2-9]\d)?\d{2})$|^(?:29(\/|-|\.)0?2\3(?:(?:(?:1[6-9]|[2-9]\d)?(?:0[48]|[2468][048]|[13579][26])|(?:(?:16|[2468][048]|[3579][26])00))))$|^(?:0?[1-9]|1\d|2[0-8])(\/|-|\.)(?:(?:0?[1-9])|(?:1[0-2]))\4(?:(?:1[6-9]|[2-9]\d)?\d{2})$/
	return re.test(String(date).toLowerCase()); 
}


function valida_email(email){
	if(email.length == 0){
		return false;
	}
	const re = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    return re.test(String(email).toLowerCase()); 
}


function error(id) {
	$(id).css("border","1px solid red");
	$(id).parent().find('.error').css("display","block");
	
}

function acerto(id) {
	$(id).css("border","1px solid #00FF7F");
	$(id).parent().find('.error').css("display","none");
}

function fecha(id) {
	$(id).css("border","1px solid #ced4da");
	$(id).parent().find('.error').css("display","none");
}



$(document).ready(function(){
  $('#ask').mask('00/00/0000');
  $('#cep').mask('00000-000');
  $('#cpf').mask('000.000.000-00', {reverse: true});
})


$('input').change(function(e) {
	let id = $(this).attr("id");
	const validacao = {
		'email' : valida_email($(this).val()),
		'password' : ($(this).val().length >= 6),
		'confirm_password' : ($("#password").val() == $("#confirm_password").val()),
		'name' : ($(this).val().split(' ').length >= 2),
		'date' : (validateDate($(this).val())),
		'cpf' : (isValidCPF($(this).val())),
		'cep' : validaCEP(this),
		'rua' : (($(this).val().length) >= 1),
		'number': (($(this).val().length) >= 1),
		'bairro': (($(this).val().length) >= 1),
		'cidade': (($('#cidade').val().length) >= 1),
		'estado' : (($('#estado').val().length) == 2),
	}
	let fun = validacao[id];
	if(validacao[id]) {
		acerto('#'+id);
	}else {
		error("#"+id);
	}
	console.log($(this).attr("id"));
})


function validaCEP(cpf){

	if(pesquisacep($(cpf).val())) {
		if(!(($('#rua').val().length) >= 1)){
			error("#rua");	
		}else{
			acerto("#rua");	
		}
		if(!(($('#bairro').val().length) >= 1)){
			error("#bairro");	
		}else{
			acerto("#bairro");	
		}

		if(!(($('#cidade').val().length) >= 1)){
			error("#cidade");	
		}else{
			acerto("#cidade");	
		}
		console.log(($('#estado').val().length), $("#estado").val())

		if(($('#estado').val().length) == 2){
			acerto("#estado");	
		}else{
			error("#estado");	
			ok = 0;
		}

		return true;
	}else {
		return false;
	}
}

function valida_campos(){
	let ok = 1;

	if(!valida_email($('#email').val())){
		error('#email');
		ok = 0;
	}else{
		acerto("#email");	
	}

	if($("#password").val().length < 6) {
		error("#password");
		ok = 0;
	}else{
		acerto("#password");	
	}

	if($("#password").val() !== $("#confirm_password").val()) {
			error("#confirm_password");
			ok = 0;
	}else{
		acerto("#confirm_password");	
	}	

	if($('#name').val().split(' ').length < 2){
		error("#name");	
		ok = 0;
	}else{
		acerto("#name");	
	}

	if(!validateDate($('#date').val())){
		error("#date");	
		ok = 0;
	}else{
		acerto("#date");	
	}	

	if(!isValidCPF($('#cpf').val())){
		error("#cpf");	
		ok = 0;
	}else{
		acerto("#cpf");	
	}	

	if(!pesquisacep($('#cep').val())){
		error("#cep");
		ok = 0;	
	}else{
		acerto("#cep");	
	}

	if(!(($('#rua').val().length) >= 1)){
		error("#rua");	
		ok = 0;
	}else{
		acerto("#rua");	
	}

	if(!(($('#number').val().length) >= 1)){
		error("#number");	
		ok = 0;
	}else{
		acerto("#number");	
	}

	if(!(($('#bairro').val().length) >= 1)){
		error("#bairro");	
		ok = 0;
	}else{
		acerto("#bairro");	
	}

	if(!(($('#cidade').val().length) >= 1)){
		error("#cidade");	
		ok = 0;
	}else{
		acerto("#cidade");	
	}

	if(($('#estado').val().length) == 2){
		acerto("#estado");	
	}else{
		error("#estado");	
		ok = 0;
	}

	return ok;

}