import { useState } from "react";
import Table from "react-bootstrap/Table";
import Form from "react-bootstrap/Form";
import "../../style/Creator/integrantesCreator.css";

export function FormularioIntegrantes() {
  const [idModificar, setIdModificar] = useState(null);

  const [rows, setRows] = useState([
    {
      id: 1,
      name: "Hector Hugo",
      AP: "Hill",
      AM: "Reyes",
      Email: "KingOfHill@gmail.com",
      Rol: "Integrante",
      Estado: "Activo",
    },
  ]);

  const [formValues, setFormValues] = useState({
    id: 0,
    name: "",
    AP: "",
    AM: "",
    Email: "",
    Rol: "",
    Estado: "",
  });

  const handleSubmit = (event) => {
    event.preventDefault();
    if (idModificar !== null) {
      const indexModificar = rows.findIndex((row) => row.id === idModificar);
      const nuevosDatos = [...rows];
      nuevosDatos[indexModificar] = formValues;
      setRows(nuevosDatos);
      setIdModificar(null);
    } else {
      setRows((prevState) => [...prevState, formValues]);
    }
    setFormValues({
      id: 0,
      name: "",
      AP: "",
      AM: "",
      Email: "",
      Rol: "",
      Estado: "",
    });
  };

  const eliminarDato = (id) => {
    const nuevosDatos = rows.filter((row) => row.id !== id);
    setRows(nuevosDatos);
  };

  return (
    <div class="Formulario contenido">
      <div class="form">
        <h1 class="form-titulo">Integrantes</h1>
        <hr className="Recuadro-hr" />
        <div class="formulario">
          <Table className="form-table" striped bordered hover responsive>
            <thead>
              <tr>
                <th>id</th>
                <th>Nombre</th>
                <th>AP</th>
                <th>AM</th>
                <th>Email</th>
                <th>Rol</th>
                <th>Estado</th>
                <th>Edit</th>
                <th>Delete</th>
              </tr>
            </thead>
            <tbody>
              {rows.map((row, index) => (
                <tr key={index}>
                  <td>{row.id}</td>
                  <td>{row.name}</td>
                  <td>{row.AP}</td>
                  <td>{row.AM}</td>
                  <td>{row.Email}</td>
                  <td>{row.Rol}</td>
                  <td>{row.Estado}</td>
                  <td>
                    <button
                      className="icon-pen"
                      onClick={() => setIdModificar(row.id)}
                    >
                      <i className="fa-regular fa-pen-to-square"></i>
                    </button>
                  </td>
                  <td>
                    <button
                      className="icon-trash"
                      onClick={() => eliminarDato(row.id)}
                    >
                      <i className="fa-regular fa-trash"></i>
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </Table>
          <form className="form-cont" onSubmit={handleSubmit}>
            <input
              type="number"
              name="id"
              placeholder="Id"
              value={idModificar !== null ? idModificar : formValues.id}
              disabled={idModificar !== null}
              onChange={(e) => {
                setFormValues((prevState) => ({
                  ...prevState,
                  id: parseInt(e.target.value),
                }));
              }}
            />
            <input
              type="text"
              name="name"
              placeholder="name"
              value={
                idModificar !== null
                  ? rows.find((row) => row.id === idModificar).name
                  : formValues.name
              }
              onChange={(e) => {
                setFormValues((prevState) => ({
                  ...prevState,
                  name: e.target.value,
                }));
              }}
            />
            <input
              type="text"
              name="AP"
              placeholder="Apellido paterno"
              value={
                idModificar !== null
                  ? rows.find((row) => row.id === idModificar).AP
                  : formValues.AP
              }
              onChange={(e) => {
                setFormValues((prevState) => ({
                  ...prevState,
                  AP: e.target.value,
                }));
              }}
            />
            <input
              type="text"
              name="AM"
              placeholder="Apellido Materno"
              value={
                idModificar !== null
                  ? rows.find((row) => row.id === idModificar).AM
                  : formValues.AM
              }
              onChange={(e) => {
                setFormValues((prevState) => ({
                  ...prevState,
                  AM: e.target.value,
                }));
              }}
            />
            <input
              type="text"
              name="Email"
              placeholder="Email"
              value={
                idModificar !== null
                  ? rows.find((row) => row.id === idModificar).Email
                  : formValues.Email
              }
              onChange={(e) => {
                setFormValues((prevState) => ({
                  ...prevState,
                  Email: e.target.value,
                }));
              }}
            />

            <Form.Select
              aria-label="Rol"
              onChange={(e) => {
                setFormValues((prevState) => ({
                  ...prevState,
                  Rol: e.target.value,
                }));
              }}
            >
              <option value="Lider">Lider</option>
              <option value="Administrador">Administrador</option>
            </Form.Select>

            <Form.Select aria-label="Estado">
              <option>Open this select menu</option>
              <option value="Activo">Activo</option>
              <option value="Pausado">Pausado</option>
            </Form.Select>

            <button type="submit">
              {idModificar !== null ? "Modificar" : "Agregar"}
            </button>
          </form>
        </div>
      </div>
    </div>
  );
}
