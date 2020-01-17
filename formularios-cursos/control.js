// Funcionalidades de formulario

//objetos 
function persona(descripcion, costo, fechaInicio, fechaFin, turno, lugar, idProfesor, vacantes) {
	this.descripcion = descripcion;
	this.costo = costo;
	this.fechaInicio = fechaInicio;
	this.fechaFin = fechaFin;
	this.turno = turno;
	this.lugar = lugar;
	this.idProfesor = idProfesor;
	this.vacantes = vacantes;
}

$(document).ready(function () {
	btn_listar();
	$(".formulario_edicion").css("display", "none");
});

function btn_registrar() {
	var descripcion = $("#descripción").val();
	var costo = $("#costo").val();
	var fechaInicio = $("#fechaInicio").val();
	var fechaFin = $("#fechaFin").val();
	var turno = $("#turno").val();
	var lugar = $("#lugar").val();
	var profesor = $("#profesor").val();
	var vacantes = $("#vacantes").val();
	//
	var request = new persona(descripcion, costo, fechaInicio, fechaFin, turno, lugar, profesor, vacantes);

	/* esto limpia los campos del formulario */
	$("#descripción").val("");
	$("#costo").val("");
	$("#fechaInicio").val("");
	$("#fechaFin").val("");
	$("#turno").val("");
	$("#lugar").val("");
	$("#profesor").val("");
	$("#vacantes").val("");

	$("#descripción").focus();

	$.ajax({
		url: 'http://localhost:8087/cclp/api/v1/cursos/',
		type: 'POST',
		dataType: 'json',
		data: JSON.stringify(request),
		contentType: 'application/json',
		success: data => {
			console.log('Success: ' + JSON.stringify(data))
			if (data.codigoRespuesta == '01')
				alert(data.mensajeRespuesta)
			else if (data.objErrorResource.fieldErrors = null)
				alert(data.mensajeRespuesta)
			else {
				let mensaje = ""
				data.objErrorResource.fieldErrors.forEach((item, index) => {
					mensaje += item.message + ' - '
				})
				alert(mensaje)
			}
		},
		error: e => {
			console.log('Error: ' + JSON.stringify(e))
		}
	})
}

function btn_listar() {

	let lista

	$.ajax({
		url: 'http://localhost:8087/cclp/api/v1/cursos/',
		type: 'GET',
		dataType: 'json',
		data: JSON.stringify(),
		contentType: 'application/json',
		success: data => {
			if (data.codigoRespuesta == '01') {
				//alert(data.mensajeRespuesta)
				lista = data.cursos
				//console.log(lista)
				var cadena = "<table  class= 'central tabla_formulario'> <tr><td> Descripcion </td> <td> Costo </td> <td> Fecha Inicio </td> <td> Fecha Fin </td> <td> Turno </td><td> Lugar </td> <td> Vacantes </td><td colspan='2'> </td></tr> ";
				for (var i = 0; i < lista.length; i++) {

					let turnoString
					if (lista[i].turno == 1)
						turnoString = "Mañana"
					else if (lista[i].turno == 2)
						turnoString = "Tarde"
					else turnoString = "Noche"

					cadena = cadena + "<tr><td>" + lista[i].descripcion + "</td><td>" + lista[i].costo + "</td><td>" + lista[i].fechaInicio + "</td><td>" + lista[i].fechaFin + "</td><td>" + turnoString + "</td><td>" + lista[i].lugar + "</td><td>" + lista[i].vacantes + "</td>" +
						"<td> <button class='btn_editar' onclick='btn_editar(" + lista[i].id + ");'> Edit </button> <button class='btn_eliminar' onclick='btn_eliminar()'> Elim </button></td></tr>";
				}
				cadena = cadena + "</table>"

				$("#listar").html(cadena);
			}
			else if (data.objErrorResource.fieldErrors = null)
				alert(data.mensajeRespuesta)
			else {
				let mensaje = ""
				data.objErrorResource.fieldErrors.forEach((item, index) => {
					mensaje += item.message + ' - '
				})
				alert(mensaje)
			}
		},
		error: e => {
			console.log('Error: ' + JSON.stringify(e))
		}
	})



}


function btn_eliminar() {
	lista.pop();
	btn_listar();


}

function btn_editar(id) {


	$(".lista_formulario").css("display", "none");
	$(".formulario_edicion").css("display", "block");
	$(".formulario").css("display", "none");

	let lista

	$.ajax({
		url: 'http://localhost:8087/cclp/api/v1/cursos/curso/' + id,
		type: 'GET',
		dataType: 'json',
		data: JSON.stringify(),
		contentType: 'application/json',
		success: data => {
			if (data.id != null) {
				//alert(data.mensajeRespuesta)
				lista = data
				console.log(lista)
				var cadena = "<table  class= 'central tabla_formulario'> <tr><td> Descripcion </td> <td> Costo </td> <td> Fecha Inicio </td> <td> Fecha Fin </td> <td> Turno </td><td> Lugar </td> <td> Vacantes </td><td colspan='2'> </td></tr> ";
			

					let turnoString
					if (lista[i].turno == 1)
						turnoString = "Mañana"
					else if (lista[i].turno == 2)
						turnoString = "Tarde"
					else turnoString = "Noche"

					cadena = cadena + "<tr><td>" + lista[i].descripcion + "</td><td>" + lista[i].costo + "</td><td>" + lista[i].fechaInicio + "</td><td>" + lista[i].fechaFin + "</td><td>" + turnoString + "</td><td>" + lista[i].lugar + "</td><td>" + lista[i].vacantes + "</td>" +
						"<td> <button class='btn_editar' onclick='btn_editar(" + lista[i].id + ");'> Edit </button> <button class='btn_eliminar' onclick='btn_eliminar()'> Elim </button></td></tr>";
				
				cadena = cadena + "</table>"

				$("#listar").html(cadena);
			}
			else {
				let mensaje = ""
				data.objErrorResource.fieldErrors.forEach((item, index) => {
					mensaje += item.message + ' - '
				})
				alert(mensaje)
			}
		},
		error: e => {
			console.log('Error: ' + JSON.stringify(e))
		}
	})

	/*
		$("#id").val(id);
		$("#descripción_ed").val(lista[id].descripcion);
		$("#costo_ed").val(lista[id].costo);
		$("#fechaI_ed").val(lista[id].fechaInicio);
		$("#fechaF_ed").val(lista[id].fechaFin);
		$("#turno_ed").val(lista[id].turno);
		$("#lugar_ed").val(lista[id].lugar);
		$("#profesor_ed").val(lista[id].profesor);
		$("#vacantes_ed").val(lista[id].vacantes);
	*/

}

function btn_guardar() {

	var id = $("#id").val();
	var descripción_ed = $("#descripción_ed").val();
	var costo_ed = $("#costo_ed").val();
	var fechaI_ed = $("#fechaI_ed").val();
	var fechaF_ed = $("#fechaF_ed").val();
	var turno_ed = $("#turno_ed").val();
	var lugar_ed = $("#lugar_ed").val();
	var profesor_ed = $("#profesor_ed").val();
	var vacantes_ed = $("#vacantes_ed").val();
	//

	lista[id].descripcion = descripción_ed;
	lista[id].costo = costo_ed;
	lista[id].fechaInicio = fechaI_ed;
	lista[id].fechaFin = fechaF_ed;
	lista[id].turno = turno_ed;
	lista[id].lugar = lugar_ed;
	lista[id].profesor = profesor_ed;
	lista[id].vacantes = vacantes_ed;
	//
	$(".formulario_edicion").css("display", "none");
	$(".formulario").css("display", "block");
	btn_listar();

}


