const superagent = require('superagent');
const fs = require('fs');
var nombres = []

function imprimirMuseos(error, respuesta) {
  if (error) {
    throw new Error('algo se rompió', error);
  }

  const cantidad = respuesta.body.count;
  const museos = respuesta.body.results;

  console.log(`Se encontraron ${cantidad} museos.`);
  console.log(`El primer museo se llama ${museos[0].nombre}.`)
}

console.log('Antes de llamar a superagent')

superagent
  .get('https://www.cultura.gob.ar/api/v2.0/museos')
  .query({ format: 'json' })
  .end(
        procesarArchivo    // 

  )


console.log('Después de llamar a superagent')


function procesarArchivo(error, res) {

  if (error !== null) {
    console.error('Algo salió mal :(')
    console.error(error)
  }   

  const museos = res.body.results;
  const nombres = museos.map((element) => 
    element.nombre +"( " + element.direccion +" )" + ", por cualquier consulta comunicarse al : "+element.telefono
  );
  
 fs.writeFile('./museos.txt', nombres.join('\n'), procesarArchivo) 

}

// El segundo parámetro es necesario para que NodeJS sepa que queremos leerlo como String
// Si no lo pasamos devuelve un Buffer (una chorrera de bytes).
