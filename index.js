const superagent = require('superagent');
const fs = require('fs');

console.log('Antes de llamar a superagent')


const getMuseos=()=>{
superagent
  .get('https://www.cultura.gob.ar/api/v2.0/museos')
  .query({ format: 'json' })
  .end(
        procesarArchivo    
  )
}

const getOrga=()=>{
  superagent
  .get('https://www.cultura.gob.ar/api/v2.0/organismos')
  .query({ format: 'json' })
  .end( procesarArchivoOrg )
  }

console.log('Después de llamar a superagent')

function procesarArchivo(error, res) {
  if (error !== null) {
    console.error('Algo salió mal :(')
    console.error(error)
  }   
  const museos = res.body.results
  const nombres = museos.map((element) => 
    element.nombre +"( " + element.direccion +" )" + ", por cualquier consulta comunicarse al : "+element.telefono
  );
       fs.writeFile('./MUSEOS.txt', nombres.join('\n'), (e)=>{}) 
}


function procesarArchivoOrg(error, res) {
  if (error !== null) {
    console.error('Algo salió mal :(')
    console.error(error)
  }   
  const org = res.body.results;
  const nombres = org.map((element) => 
    element.nombre +"( " + element.direccion +" )" + ", por cualquier consulta comunicarse al : "+element.telefono
  );
 fs.appendFile('./MUSEOS.txt', nombres.join('\n'), (e)=>{}) 
}


getMuseos()
getOrga()