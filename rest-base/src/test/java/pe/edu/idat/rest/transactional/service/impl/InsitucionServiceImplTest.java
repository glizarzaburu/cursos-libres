package pe.edu.idat.rest.transactional.service.impl;

import org.junit.Test;
import org.springframework.beans.factory.annotation.Autowired;

import com.google.gson.Gson;

import pe.edu.idat.rest.config.BaseTest;
import pe.edu.idat.rest.transactional.service.AlumnoService;
import pe.edu.idat.rest.view.dto.request.AlumnoRegistroRequestDTO;
import pe.edu.idat.rest.view.dto.response.AlumnoRegistroResponseDTO;

public class InsitucionServiceImplTest extends BaseTest {

	@Autowired
	private AlumnoService alumnoService;
	
	@Test
	public void registroInstitucionTest() {
		
		AlumnoRegistroRequestDTO request = new AlumnoRegistroRequestDTO();
		request.setNombres("BRAZTON");
		request.setApellidos("EL COME GIGANTES");
		request.setEdad(20);
		request.setTelefono("123456789");
		request.setDni("12345678");
		request.setCorreo("brazton@elcomegigantes.com");
		request.setDireccion("Los panetones #123 Jr Las hamburguesas");
		
		AlumnoRegistroResponseDTO response = alumnoService.registrarAlumno(request);
		System.out.println("response = " + new Gson().toJson(response));
		
	}
	
	
}
