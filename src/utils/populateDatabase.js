require('dotenv').config();
const mongoose = require('mongoose');
const Department = require('../models/department.model');

const departments = [
    {
        "name": "ARTIGAS",
        "cities": [
            {
                "name": "Artigas"
            },
            {
                "name": "Bella Unión"
            },
            {
                "name": "Tomás Gomensoro"
            },
            {
                "name": "Baltasar Brum"
            },
            {
                "name": "Arrocera San Pedro"
            },
            {
                "name": "Cainsa Campo 3"
            },
            {
                "name": "Bernabé Rivera"
            },
            {
                "name": "Calpica Itacumbú"
            },
            {
                "name": "Colonia Rivera"
            },
            {
                "name": "Franquia"
            },
            {
                "name": "Sequeira"
            },
            {
                "name": "Cainsa 2 Itacumbú"
            },
            {
                "name": "Coronado"
            },
            {
                "name": "Cuareim"
            },
            {
                "name": "Cuaró"
            },
            {
                "name": "Guayubira"
            },
            {
                "name": "Javier de Viana"
            },
            {
                "name": "La Bolsa"
            },
            {
                "name": "Las Piedras"
            },
            {
                "name": "Paguero"
            },
            {
                "name": "Pintadito"
            },
            {
                "name": "Port. de Hierro y Campodónico"
            },
            {
                "name": "Tamandua"
            },
            {
                "name": "Mones Quintela"
            },
            {
                "name": "Rural"
            },
            {
                "name": "Arrocera Riusa"
            },
            {
                "name": "Cainsa Campo 1"
            },
            {
                "name": "Cainsa"
            },
            {
                "name": "Paso Campamento"
            },
            {
                "name": "Catalán Grande"
            },
            {
                "name": "Catalán Volcán"
            },
            {
                "name": "Chiflero"
            },
            {
                "name": "Colonia Estrella"
            },
            {
                "name": "Colonia Palma"
            },
            {
                "name": "Colonia Viñar"
            },
            {
                "name": "Diego Lamas"
            },
            {
                "name": "Estiva"
            },
            {
                "name": "Fagúndez"
            },
            {
                "name": "Granja Perroni"
            },
            {
                "name": "Lenguazo"
            },
            {
                "name": "Palma Sola"
            },
            {
                "name": "Paredón"
            },
            {
                "name": "Paso de la Cruz"
            },
            {
                "name": "Paso del León"
            },
            {
                "name": "Paso de Ramos"
            },
            {
                "name": "Paso Farías"
            },
            {
                "name": "Paso Potrero"
            },
            {
                "name": "Patitas"
            },
            {
                "name": "Piedra Pintada"
            },
            {
                "name": "Pintado Grande"
            },
            {
                "name": "Puntas de Tres Cruces"
            },
            {
                "name": "Ricardinho"
            },
            {
                "name": "Rincón de Pacheco"
            },
            {
                "name": "Rincón de Pintado"
            },
            {
                "name": "Sarandí de Cuaró"
            },
            {
                "name": "Sarandí de Yacuy"
            },
            {
                "name": "Taruman"
            },
            {
                "name": "Topador"
            },
            {
                "name": "Cerro Ejido"
            },
            {
                "name": "Zanja Aruera"
            },
            {
                "name": "Cerro Signorelli"
            },
            {
                "name": "Cerro San Eugenio"
            },
            {
                "name": "Calnú"
            }
        ]
    },
    {
        "name": "CANELONES",
        "cities": [
            {
                "name": "Las Piedras"
            },
            {
                "name": "Canelones"
            },
            {
                "name": "La Paz"
            },
            {
                "name": "Pando"
            },
            {
                "name": "Santa Lucía"
            },
            {
                "name": "Piedras de Afilar"
            },
            {
                "name": "Cumbres de Carrasco"
            },
            {
                "name": "Haras del Lago"
            },
            {
                "name": "Quinta Los Horneros"
            },
            {
                "name": "Las Higueritas"
            },
            {
                "name": "Sofía Santos"
            },
            {
                "name": "Progreso"
            },
            {
                "name": "San Ramón"
            },
            {
                "name": "Barros Blancos"
            },
            {
                "name": "Fracc. Cno. Maldonado"
            },
            {
                "name": "Colonia Nicolich"
            },
            {
                "name": "Joaquín Suárez"
            },
            {
                "name": "Paso Carrasco"
            },
            {
                "name": "Santa Rosa"
            },
            {
                "name": "Sauce"
            },
            {
                "name": "Tala"
            },
            {
                "name": "Villa Crespo y San Andrés"
            },
            {
                "name": "Fracc. Cno.del Andaluz y R.84"
            },
            {
                "name": "Atlántida"
            },
            {
                "name": "Estación Atlántida"
            },
            {
                "name": "Cerrillos"
            },
            {
                "name": "Empalme Olmos"
            },
            {
                "name": "Migues"
            },
            {
                "name": "Parque del Plata"
            },
            {
                "name": "San Bautista"
            },
            {
                "name": "San Jacinto"
            },
            {
                "name": "Dr. Francisco Soca"
            },
            {
                "name": "Toledo"
            },
            {
                "name": "Montes"
            },
            {
                "name": "San José de Carrasco"
            },
            {
                "name": "Fracc. sobre R.74"
            },
            {
                "name": "Aguas Corrientes"
            },
            {
                "name": "Barra de Carrasco"
            },
            {
                "name": "Juanicó"
            },
            {
                "name": "La Floresta"
            },
            {
                "name": "Estación La Floresta"
            },
            {
                "name": "Las Toscas"
            },
            {
                "name": "Parque Carrasco"
            },
            {
                "name": "Salinas"
            },
            {
                "name": "San Antonio"
            },
            {
                "name": "Aerop. Internacional de Carrasco"
            },
            {
                "name": "Solymar"
            },
            {
                "name": "Villa Aeroparque"
            },
            {
                "name": "Camino a la Cadena"
            },
            {
                "name": "Castellanos"
            },
            {
                "name": "Colonia Berro"
            },
            {
                "name": "Barrio Cópola"
            },
            {
                "name": "Costa Azul"
            },
            {
                "name": "Costa y Guillamón"
            },
            {
                "name": "El Pinar"
            },
            {
                "name": "Estación Migues"
            },
            {
                "name": "Pinamar - Pinepark"
            },
            {
                "name": "Lagomar"
            },
            {
                "name": "Olmos"
            },
            {
                "name": "Parada Cabrera"
            },
            {
                "name": "San Luis"
            },
            {
                "name": "Shangrilá"
            },
            {
                "name": "Totoral del Sauce"
            },
            {
                "name": "Villa Felicidad"
            },
            {
                "name": "Villa Paz S.A."
            },
            {
                "name": "Villa San José"
            },
            {
                "name": "Estación Tapia"
            },
            {
                "name": "Villa San Felipe"
            },
            {
                "name": "Villa Hadita"
            },
            {
                "name": "Paso de Pache"
            },
            {
                "name": "Rural"
            },
            {
                "name": "City Golf"
            },
            {
                "name": "Viejo Molino San Bernardo"
            },
            {
                "name": "Estanque de Pando"
            },
            {
                "name": "Jardines de Pando"
            },
            {
                "name": "Paso Espinosa"
            },
            {
                "name": "Araminda"
            },
            {
                "name": "Argentino"
            },
            {
                "name": "Barra de la Pedrera"
            },
            {
                "name": "Barrancas Coloradas"
            },
            {
                "name": "Bello Horizonte"
            },
            {
                "name": "Biarritz"
            },
            {
                "name": "Bolívar"
            },
            {
                "name": "Campo Militar"
            },
            {
                "name": "Capilla de Cella"
            },
            {
                "name": "Cañada de Cardozo"
            },
            {
                "name": "Cerrillos al Sur"
            },
            {
                "name": "Costa de Pando"
            },
            {
                "name": "Costa de Tala"
            },
            {
                "name": "Cruz de los Caminos"
            },
            {
                "name": "Cuchilla Alta"
            },
            {
                "name": "Cuchilla Verde"
            },
            {
                "name": "Cueva del Tigre"
            },
            {
                "name": "Echevarría"
            },
            {
                "name": "El Bosque"
            },
            {
                "name": "Empalme Sauce"
            },
            {
                "name": "Estación Margat"
            },
            {
                "name": "Estación Pedrera"
            },
            {
                "name": "Fortín de Santa Rosa"
            },
            {
                "name": "Fracc. Progreso"
            },
            {
                "name": "Instituto Adventista"
            },
            {
                "name": "Jaureguiberry"
            },
            {
                "name": "La Capilla"
            },
            {
                "name": "La Lucha"
            },
            {
                "name": "La Montañesa"
            },
            {
                "name": "La Palmita"
            },
            {
                "name": "La Paloma"
            },
            {
                "name": "La Querencia"
            },
            {
                "name": "Lomas de Solymar"
            },
            {
                "name": "Las Barreras"
            },
            {
                "name": "Los Cerrillos"
            },
            {
                "name": "Los Titanes"
            },
            {
                "name": "Marindia"
            },
            {
                "name": "Neptunia"
            },
            {
                "name": "Parador Tajes"
            },
            {
                "name": "Paso de la Cadena"
            },
            {
                "name": "Paso de la Paloma"
            },
            {
                "name": "Paso de las Toscas"
            },
            {
                "name": "Paso del Bote"
            },
            {
                "name": "Paso Palomeque"
            },
            {
                "name": "Paso Villar"
            },
            {
                "name": "Piedra del Toro"
            },
            {
                "name": "Estación Piedras de Afilar"
            },
            {
                "name": "El Galeón"
            },
            {
                "name": "Puntas de Pantanoso"
            },
            {
                "name": "San Pedro"
            },
            {
                "name": "Santa Ana"
            },
            {
                "name": "Santa Lucía del Este"
            },
            {
                "name": "Santos Lugares"
            },
            {
                "name": "Sauce de Solís"
            },
            {
                "name": "Seis Hermanos"
            },
            {
                "name": "Villa Arejo"
            },
            {
                "name": "Villa Argentina"
            },
            {
                "name": "Villa Encantada"
            },
            {
                "name": "Villa Gabi"
            },
            {
                "name": "Villa Nueva"
            },
            {
                "name": "Villa Porvenir"
            },
            {
                "name": "La Tuna"
            },
            {
                "name": "Guazú - Virá"
            },
            {
                "name": "Colinas de Solymar"
            },
            {
                "name": "Barrio Remanso"
            },
            {
                "name": "Villa El Tato"
            },
            {
                "name": "Villa San Cono"
            },
            {
                "name": "Villa Juana"
            },
            {
                "name": "Colinas de Carrasco"
            },
            {
                "name": "Lomas de Carrasco"
            },
            {
                "name": "Carmel"
            },
            {
                "name": "La Asunción"
            },
            {
                "name": "Quintas del Bosque"
            },
            {
                "name": "Altos de la Tahona"
            },
            {
                "name": "Asentamiento R.6 Km 24.500"
            }
        ]
    },
    {
        "name": "CERRO LARGO",
        "cities": [
            {
                "name": "Melo"
            },
            {
                "name": "Fraile Muerto"
            },
            {
                "name": "Río Branco"
            },
            {
                "name": "Tupambaé"
            },
            {
                "name": "Isidoro Noblía"
            },
            {
                "name": "Aceguá"
            },
            {
                "name": "Bañado de Medina"
            },
            {
                "name": "Centurión"
            },
            {
                "name": "Cerro de las Cuentas"
            },
            {
                "name": "Hipódromo"
            },
            {
                "name": "Paso Pereira"
            },
            {
                "name": "Plácido Rosas"
            },
            {
                "name": "Toledo"
            },
            {
                "name": "Tres Islas"
            },
            {
                "name": "Poblado Uruguay"
            },
            {
                "name": "Rural"
            },
            {
                "name": "Aguirre"
            },
            {
                "name": "Amarillo"
            },
            {
                "name": "Arbolito"
            },
            {
                "name": "Arévalo"
            },
            {
                "name": "Bañado de Saturnino"
            },
            {
                "name": "Buena Vista"
            },
            {
                "name": "Calera de Recalde"
            },
            {
                "name": "Campamento"
            },
            {
                "name": "Cañada Grande"
            },
            {
                "name": "Caserío Las Cañas"
            },
            {
                "name": "Cañitas"
            },
            {
                "name": "Coimbra"
            },
            {
                "name": "Cruz de Piedra"
            },
            {
                "name": "Cuchilla Cambota"
            },
            {
                "name": "Cuchilla de Melo"
            },
            {
                "name": "Cuchilla del Carmen"
            },
            {
                "name": "Cuchilla Peralta"
            },
            {
                "name": "Duraznero"
            },
            {
                "name": "Escuela de Agronomía"
            },
            {
                "name": "Esperanza"
            },
            {
                "name": "Ganen"
            },
            {
                "name": "Garao"
            },
            {
                "name": "Getulio Vargas"
            },
            {
                "name": "Guazunambí"
            },
            {
                "name": "La Coronilla"
            },
            {
                "name": "La Gloria"
            },
            {
                "name": "La Micaela"
            },
            {
                "name": "La Pedrera"
            },
            {
                "name": "Lago Merín"
            },
            {
                "name": "Laguna del Junco"
            },
            {
                "name": "Las Limas"
            },
            {
                "name": "Mangrullo"
            },
            {
                "name": "María Isabel"
            },
            {
                "name": "Mederos"
            },
            {
                "name": "Montecito"
            },
            {
                "name": "Nando"
            },
            {
                "name": "Paso de Almada"
            },
            {
                "name": "Paso de las Tropas"
            },
            {
                "name": "Paso del Centurión"
            },
            {
                "name": "Paso de Melo"
            },
            {
                "name": "Picada de Salomé"
            },
            {
                "name": "Piedra Alta"
            },
            {
                "name": "Piñeiro"
            },
            {
                "name": "Puente del Chuy"
            },
            {
                "name": "Puntas de Tacuarí"
            },
            {
                "name": "Quebracho"
            },
            {
                "name": "Raab Arrocera"
            },
            {
                "name": "Ramón Trigo"
            },
            {
                "name": "Rincón de Paiva"
            },
            {
                "name": "Rincón de Contreras"
            },
            {
                "name": "Rincón de los Coroneles"
            },
            {
                "name": "Rincón de los Montana"
            },
            {
                "name": "Rincón de los Olivera"
            },
            {
                "name": "Rincón de Py"
            },
            {
                "name": "Rodríguez"
            },
            {
                "name": "San Diego"
            },
            {
                "name": "San Servando"
            },
            {
                "name": "Sanchez"
            },
            {
                "name": "Sarandí de Aceguá"
            },
            {
                "name": "Sosa"
            },
            {
                "name": "Soto Goro"
            },
            {
                "name": "Tres Boliches"
            },
            {
                "name": "Barrio López Benítez"
            },
            {
                "name": "Puntas de Minas"
            },
            {
                "name": "Arrozal Casarone"
            },
            {
                "name": "Pajaro Azul"
            },
            {
                "name": "Barrio La Vinchuca"
            },
            {
                "name": "Arachania"
            },
            {
                "name": "Ñangapire"
            }
        ]
    },
    {
        "name": "COLONIA",
        "cities": [
            {
                "name": "Colonia del Sacramento"
            },
            {
                "name": "Carmelo"
            },
            {
                "name": "Juan Lacaze"
            },
            {
                "name": "Nueva Helvecia"
            },
            {
                "name": "Rosario"
            },
            {
                "name": "Nueva Palmira"
            },
            {
                "name": "Paso Antolín"
            },
            {
                "name": "Ombúes de Lavalle"
            },
            {
                "name": "Tarariras"
            },
            {
                "name": "Colonia Valdense"
            },
            {
                "name": "Florencio Sánchez"
            },
            {
                "name": "Conchillas"
            },
            {
                "name": "Caserío El Cerro"
            },
            {
                "name": "El General"
            },
            {
                "name": "La Paz"
            },
            {
                "name": "Riachuelo"
            },
            {
                "name": "Juan Carlos Caseros"
            },
            {
                "name": "Ismael Cortinas"
            },
            {
                "name": "Agraciada"
            },
            {
                "name": "Boca del Rosario"
            },
            {
                "name": "Buena Hora"
            },
            {
                "name": "Colonia Estrella"
            },
            {
                "name": "Cufré"
            },
            {
                "name": "El Caño"
            },
            {
                "name": "El Semillero"
            },
            {
                "name": "Estación Estanzuela"
            },
            {
                "name": "Juan González R 21Km 243 a 246"
            },
            {
                "name": "Cerros de San Juan"
            },
            {
                "name": "Martín Chico"
            },
            {
                "name": "Miguelete"
            },
            {
                "name": "Pastoreo"
            },
            {
                "name": "Piedra de los Indios"
            },
            {
                "name": "San Juan"
            },
            {
                "name": "Rural"
            },
            {
                "name": "Anchorena"
            },
            {
                "name": "Campana"
            },
            {
                "name": "Artilleros"
            },
            {
                "name": "Barker"
            },
            {
                "name": "Barrancas Coloradas"
            },
            {
                "name": "El Ensueño"
            },
            {
                "name": "Barrio Hipódromo"
            },
            {
                "name": "Belgrano Norte"
            },
            {
                "name": "Belgrano Sur"
            },
            {
                "name": "Blanca Arena"
            },
            {
                "name": "Brisas del Plata"
            },
            {
                "name": "Canteras del Riachuelo"
            },
            {
                "name": "Cerro de las Armas"
            },
            {
                "name": "Cerros Negros"
            },
            {
                "name": "Colonia Arrue"
            },
            {
                "name": "Colonia Cosmopolita"
            },
            {
                "name": "Colonia Sarandí"
            },
            {
                "name": "Paraje Minuano"
            },
            {
                "name": "Costa de Colla al Este"
            },
            {
                "name": "Costa de Colla al Norte"
            },
            {
                "name": "Costa de Navarro"
            },
            {
                "name": "El Bañado"
            },
            {
                "name": "El Cuadro"
            },
            {
                "name": "Juan González"
            },
            {
                "name": "La Laguna"
            },
            {
                "name": "Lagunita"
            },
            {
                "name": "Lomas de Carmelo"
            },
            {
                "name": "Las Flores"
            },
            {
                "name": "Los Pinos"
            },
            {
                "name": "Miguelete de Conchillas"
            },
            {
                "name": "Minas de Talco de Narancio"
            },
            {
                "name": "Molles de Miguelete"
            },
            {
                "name": "Chico Torino"
            },
            {
                "name": "La Horqueta"
            },
            {
                "name": "Paso Hospital"
            },
            {
                "name": "Paso Quicho"
            },
            {
                "name": "Playa Azul"
            },
            {
                "name": "Playa Britópolis"
            },
            {
                "name": "Playa Parant"
            },
            {
                "name": "Playa Fomento"
            },
            {
                "name": "Polanco"
            },
            {
                "name": "Puerto Inglés"
            },
            {
                "name": "Puerto Rosario"
            },
            {
                "name": "Punta de Arenales"
            },
            {
                "name": "Puntas de Juan González"
            },
            {
                "name": "Puntas del Rosario (Zunin)"
            },
            {
                "name": "Radial Hernández"
            },
            {
                "name": "Radial Rosario"
            },
            {
                "name": "Resguardo Cufré"
            },
            {
                "name": "Rosario y Colla"
            },
            {
                "name": "Ruta 21 km 202"
            },
            {
                "name": "San Luis"
            },
            {
                "name": "San Luis Sánchez"
            },
            {
                "name": "San Pedro"
            },
            {
                "name": "San Roque"
            },
            {
                "name": "Santa Ana"
            },
            {
                "name": "Santa Regina"
            },
            {
                "name": "Santa Rosa"
            },
            {
                "name": "Sarandí Campana"
            },
            {
                "name": "Terminal - Artilleros"
            },
            {
                "name": "Tres Esquinas"
            },
            {
                "name": "Víboras"
            },
            {
                "name": "Víboras Oeste"
            },
            {
                "name": "Zagarzazú"
            },
            {
                "name": "Arrivillaga"
            },
            {
                "name": "Palo Solo"
            },
            {
                "name": "El Faro"
            },
            {
                "name": "Laguna de los Patos"
            },
            {
                "name": "Juan Jackson"
            },
            {
                "name": "Pueblo Gil"
            },
            {
                "name": "Cerro Carmelo"
            },
            {
                "name": "El Quintón"
            }
        ]
    },
    {
        "name": "DURAZNO",
        "cities": [
            {
                "name": "Durazno"
            },
            {
                "name": "Sarandí del Yí"
            },
            {
                "name": "Carmen"
            },
            {
                "name": "Blanquillo"
            },
            {
                "name": "La Paloma"
            },
            {
                "name": "Carlos Reyles"
            },
            {
                "name": "Centenario"
            },
            {
                "name": "Santa Bernardina"
            },
            {
                "name": "Cerro Chato"
            },
            {
                "name": "Baygorria"
            },
            {
                "name": "Rural"
            },
            {
                "name": "Abella"
            },
            {
                "name": "Aguas Buenas"
            },
            {
                "name": "Chileno"
            },
            {
                "name": "Pueblo de Álvarez"
            },
            {
                "name": "Barrancas Coloradas"
            },
            {
                "name": "Batoví"
            },
            {
                "name": "Bellaco"
            },
            {
                "name": "Blanquillo al Oeste"
            },
            {
                "name": "Capilla Farruco"
            },
            {
                "name": "Carpintería"
            },
            {
                "name": "Ceibal"
            },
            {
                "name": "Cerrezuelo"
            },
            {
                "name": "Cerro Convento"
            },
            {
                "name": "Costa de Cuadra"
            },
            {
                "name": "Cuchilla de Ramírez"
            },
            {
                "name": "De Dios"
            },
            {
                "name": "El Pescado"
            },
            {
                "name": "Estación Chileno"
            },
            {
                "name": "Estación Parish"
            },
            {
                "name": "Feliciano"
            },
            {
                "name": "Fonseca"
            },
            {
                "name": "La Alegría"
            },
            {
                "name": "La Mazamorra"
            },
            {
                "name": "Los Agregados"
            },
            {
                "name": "Los Agüero"
            },
            {
                "name": "Las Cañas"
            },
            {
                "name": "Los Rojas"
            },
            {
                "name": "Malbajar"
            },
            {
                "name": "María Cejas"
            },
            {
                "name": "Mouriño"
            },
            {
                "name": "Ombúes de Oribe"
            },
            {
                "name": "Parada Sur Km 265"
            },
            {
                "name": "Paso del Medio Las Palmas"
            },
            {
                "name": "Puglia"
            },
            {
                "name": "Punta de las Flores"
            },
            {
                "name": "Puntas de Herrera"
            },
            {
                "name": "Reynolds"
            },
            {
                "name": "Rojas"
            },
            {
                "name": "Rolón"
            },
            {
                "name": "Rossell y Rius"
            },
            {
                "name": "Ruta 5 Km 172"
            },
            {
                "name": "Salinas"
            },
            {
                "name": "Salinas Chico"
            },
            {
                "name": "San Jorge"
            },
            {
                "name": "San José de las Cañas"
            },
            {
                "name": "Sandú Chico"
            },
            {
                "name": "Sarandí del Río Negro"
            },
            {
                "name": "Las Palmas"
            }
        ]
    },
    {
        "name": "FLORES",
        "cities": [
            {
                "name": "Trinidad"
            },
            {
                "name": "Ismael Cortinas"
            },
            {
                "name": "Rural"
            },
            {
                "name": "Andresito"
            },
            {
                "name": "Arenal Chico"
            },
            {
                "name": "Colonia Alemana"
            },
            {
                "name": "El Totoral"
            },
            {
                "name": "Juan José Castro"
            },
            {
                "name": "Pueblito Piedra"
            },
            {
                "name": "Pueblo Pintos"
            },
            {
                "name": "Puntas de Chamanga"
            },
            {
                "name": "Puntas de Corral de Piedra"
            },
            {
                "name": "Puntas de Marincho"
            },
            {
                "name": "Puntas de Sarandí"
            },
            {
                "name": "Puntas del Sauce"
            },
            {
                "name": "San Gregorio"
            },
            {
                "name": "Santa Adelaida"
            },
            {
                "name": "Santa Elena"
            },
            {
                "name": "Talas de Maciel"
            },
            {
                "name": "La Casilla"
            },
            {
                "name": "Cerro Colorado"
            }
        ]
    },
    {
        "name": "FLORIDA",
        "cities": [
            {
                "name": "Florida"
            },
            {
                "name": "Sarandí Grande"
            },
            {
                "name": "Casupá"
            },
            {
                "name": "Cardal"
            },
            {
                "name": "Fray Marcos"
            },
            {
                "name": "Veinticinco de Agosto"
            },
            {
                "name": "Veinticinco de Mayo"
            },
            {
                "name": "Alejandro Gallinal"
            },
            {
                "name": "Capilla del Sauce"
            },
            {
                "name": "La Cruz"
            },
            {
                "name": "Nico Pérez"
            },
            {
                "name": "Cerro Chato"
            },
            {
                "name": "Chamizo"
            },
            {
                "name": "Goñi"
            },
            {
                "name": "Mendoza"
            },
            {
                "name": "Mendoza Chico"
            },
            {
                "name": "Reboledo"
            },
            {
                "name": "Valentines"
            },
            {
                "name": "Rural"
            },
            {
                "name": "Arrayán"
            },
            {
                "name": "Berrondo"
            },
            {
                "name": "Chamizo Chico"
            },
            {
                "name": "Chingolas"
            },
            {
                "name": "Colonia Sánchez"
            },
            {
                "name": "Costa de Chamizo Grande"
            },
            {
                "name": "Estación Palermo"
            },
            {
                "name": "Estación Urioste"
            },
            {
                "name": "Pueblo Ferrer"
            },
            {
                "name": "Frigorífico Modelo"
            },
            {
                "name": "Independencia"
            },
            {
                "name": "Juncal"
            },
            {
                "name": "Las Chilcas"
            },
            {
                "name": "Mansavillagra"
            },
            {
                "name": "Molles del Pescado"
            },
            {
                "name": "Montecoral"
            },
            {
                "name": "Paso de los Novillos"
            },
            {
                "name": "Pintado"
            },
            {
                "name": "Polanco del Yí"
            },
            {
                "name": "Pueblito de las Rosas"
            },
            {
                "name": "Pueblo de los Morochos"
            },
            {
                "name": "Puntas de Maciel"
            },
            {
                "name": "Puntas de Mansavillagra"
            },
            {
                "name": "Puntas de Sarandí"
            },
            {
                "name": "San Pedro del Timote"
            },
            {
                "name": "Talita"
            },
            {
                "name": "Villa Hípica"
            },
            {
                "name": "Villa Vieja"
            },
            {
                "name": "Illescas"
            },
            {
                "name": "Caserío La Fundación"
            },
            {
                "name": "La Macana"
            },
            {
                "name": "Estación Capilla del Sauce"
            },
            {
                "name": "San Gabriel"
            }
        ]
    },
    {
        "name": "LAVALLEJA",
        "cities": [
            {
                "name": "Minas"
            },
            {
                "name": "José Batlle y Ordóñez"
            },
            {
                "name": "José Pedro Varela"
            },
            {
                "name": "Mariscala"
            },
            {
                "name": "Solís de Mataojo"
            },
            {
                "name": "Pirarajá"
            },
            {
                "name": "Zapicán"
            },
            {
                "name": "Colón"
            },
            {
                "name": "Costas del Soldado"
            },
            {
                "name": "Poblado Aramendía"
            },
            {
                "name": "Ruta 40 Km 27,5"
            },
            {
                "name": "Rural"
            },
            {
                "name": "Aguas Blancas"
            },
            {
                "name": "Alonso"
            },
            {
                "name": "Andreoni"
            },
            {
                "name": "Blanes Viale"
            },
            {
                "name": "Carnales"
            },
            {
                "name": "Cerro Pelado"
            },
            {
                "name": "Costas del Lenguazo"
            },
            {
                "name": "19 de Junio"
            },
            {
                "name": "El Soldado"
            },
            {
                "name": "Estación Ortiz"
            },
            {
                "name": "Estación Solís"
            },
            {
                "name": "Gaetán"
            },
            {
                "name": "Godoy"
            },
            {
                "name": "Higueritas"
            },
            {
                "name": "La Plata"
            },
            {
                "name": "Ladrillos"
            },
            {
                "name": "Las Achiras"
            },
            {
                "name": "Marco de los Reyes"
            },
            {
                "name": "Marmarajá"
            },
            {
                "name": "Molles de Gutiérrez"
            },
            {
                "name": "Poblado Larrosa"
            },
            {
                "name": "Polanco Norte"
            },
            {
                "name": "Polanco Sur"
            },
            {
                "name": "Puntas de Barriga Negra"
            },
            {
                "name": "Puntas de Santa Lucía"
            },
            {
                "name": "Retamosa"
            },
            {
                "name": "Rincón de Mariscala"
            },
            {
                "name": "Rincón de Cebollatí"
            },
            {
                "name": "Ruta 40 Km 25"
            },
            {
                "name": "Salus"
            },
            {
                "name": "Sarandí de Gutiérrez"
            },
            {
                "name": "Tapes Chico"
            },
            {
                "name": "Tapes Grande"
            },
            {
                "name": "Velázquez"
            },
            {
                "name": "Villa del Rosario"
            },
            {
                "name": "Villa Serrana"
            },
            {
                "name": "Barrio La Coronilla - Ancap"
            },
            {
                "name": "San Francisco de las Sierras"
            },
            {
                "name": "Illescas"
            }
        ]
    },
    {
        "name": "MALDONADO",
        "cities": [
            {
                "name": "Maldonado"
            },
            {
                "name": "San Carlos"
            },
            {
                "name": "Aiguá"
            },
            {
                "name": "Pan de Azúcar"
            },
            {
                "name": "Piriápolis"
            },
            {
                "name": "Punta del Este"
            },
            {
                "name": "Cerro Pelado"
            },
            {
                "name": "Garzón"
            },
            {
                "name": "Gerona"
            },
            {
                "name": "La Sierra"
            },
            {
                "name": "Las Flores - Estación"
            },
            {
                "name": "Los Talas"
            },
            {
                "name": "Nueva Carrara"
            },
            {
                "name": "Solís"
            },
            {
                "name": "Pueblo Solís"
            },
            {
                "name": "Pinares - Las Delicias"
            },
            {
                "name": "Chihuahua"
            },
            {
                "name": "Villa Delia"
            },
            {
                "name": "San Rafael - El Placer"
            },
            {
                "name": "Rural"
            },
            {
                "name": "Islas"
            },
            {
                "name": "Abra de Castellanos"
            },
            {
                "name": "Abra de Perdomo"
            },
            {
                "name": "Barra del Sauce"
            },
            {
                "name": "Barrio Hipódromo"
            },
            {
                "name": "Barrio Los Aromos"
            },
            {
                "name": "Bella Vista"
            },
            {
                "name": "Buenos Aires"
            },
            {
                "name": "Calera Ramos"
            },
            {
                "name": "Canteras de Marelli"
            },
            {
                "name": "Carapé"
            },
            {
                "name": "Cerros Azules"
            },
            {
                "name": "Coronilla"
            },
            {
                "name": "Edén Rock"
            },
            {
                "name": "El Chorro"
            },
            {
                "name": "El Edén"
            },
            {
                "name": "El Tesoro"
            },
            {
                "name": "Estación José Ignacio"
            },
            {
                "name": "Faro José Ignacio"
            },
            {
                "name": "Gregorio Aznárez"
            },
            {
                "name": "Guardia Vieja"
            },
            {
                "name": "La Barra"
            },
            {
                "name": "La Falda"
            },
            {
                "name": "La Capuera"
            },
            {
                "name": "Las Flores"
            },
            {
                "name": "Los Ceibos"
            },
            {
                "name": "Manantiales"
            },
            {
                "name": "Ocean Park"
            },
            {
                "name": "Partido Norte"
            },
            {
                "name": "Partido Oeste"
            },
            {
                "name": "Paso de los Talas"
            },
            {
                "name": "Picada Tolosa"
            },
            {
                "name": "Playa Grande"
            },
            {
                "name": "Playa Hermosa"
            },
            {
                "name": "Playa Verde"
            },
            {
                "name": "Punta Ballena"
            },
            {
                "name": "Punta Colorada"
            },
            {
                "name": "Punta Negra"
            },
            {
                "name": "Puntas de San Ignacio"
            },
            {
                "name": "Rincón de los Núñez"
            },
            {
                "name": "Ruta 37 y 9"
            },
            {
                "name": "Ruta 73 Km 101 a 102"
            },
            {
                "name": "Ruta 9 Km 86"
            },
            {
                "name": "Salamanca"
            },
            {
                "name": "San Juan del Este"
            },
            {
                "name": "Santa Mónica"
            },
            {
                "name": "Sauce de Aiguá"
            },
            {
                "name": "Sauce de Portezuelo"
            },
            {
                "name": "San Vicente"
            },
            {
                "name": "Balneario Buenos Aires"
            },
            {
                "name": "De Lobos"
            },
            {
                "name": "Las Cumbres"
            },
            {
                "name": "Los Corchos"
            },
            {
                "name": "Parque Medina"
            },
            {
                "name": "Arenas de José Ignacio"
            },
            {
                "name": "La Sonrisa"
            },
            {
                "name": "El Quijote"
            },
            {
                "name": "Laguna Blanca"
            }
        ]
    },
    {
        "name": "MONTEVIDEO",
        "cities": [
            {
                "name": "Montevideo"
            },
            {
                "name": "Abayubá"
            },
            {
                "name": "Santiago Vázquez"
            },
            {
                "name": "Pajas Blancas"
            },
            {
                "name": "Rural"
            }
        ]
    },
    {
        "name": "PAYSANDU",
        "cities": [
            {
                "name": "Paysandú"
            },
            {
                "name": "Guichón"
            },
            {
                "name": "Nuevo Paysandú"
            },
            {
                "name": "Quebracho"
            },
            {
                "name": "Tambores"
            },
            {
                "name": "Lorenzo Geyres"
            },
            {
                "name": "Merinos"
            },
            {
                "name": "Porvenir"
            },
            {
                "name": "Algorta"
            },
            {
                "name": "Arbolito"
            },
            {
                "name": "Beisso"
            },
            {
                "name": "Casablanca"
            },
            {
                "name": "Cerro Chato"
            },
            {
                "name": "Constancia"
            },
            {
                "name": "Morató"
            },
            {
                "name": "Piedras Coloradas"
            },
            {
                "name": "Piñera"
            },
            {
                "name": "Puntas de Buricayupí"
            },
            {
                "name": "San Félix"
            },
            {
                "name": "Villa María (Tiatucura)"
            },
            {
                "name": "Piedra Sola"
            },
            {
                "name": "Rural"
            },
            {
                "name": "Alonso"
            },
            {
                "name": "Araújo"
            },
            {
                "name": "Bella Vista"
            },
            {
                "name": "Cañada del Pueblo"
            },
            {
                "name": "Chapicuy"
            },
            {
                "name": "Daymán"
            },
            {
                "name": "El Chaco"
            },
            {
                "name": "El Eucaliptus"
            },
            {
                "name": "El Horno"
            },
            {
                "name": "Esperanza"
            },
            {
                "name": "Pueblo Federación"
            },
            {
                "name": "Guayabos"
            },
            {
                "name": "La Tentación"
            },
            {
                "name": "Las Flores"
            },
            {
                "name": "Orgoroso"
            },
            {
                "name": "Palmar del Quebracho"
            },
            {
                "name": "Pandule"
            },
            {
                "name": "Paso de los Carros"
            },
            {
                "name": "Queguay Chico"
            },
            {
                "name": "Ruta 90 Km 36"
            },
            {
                "name": "Sacachispas"
            },
            {
                "name": "Sauce de Abajo"
            },
            {
                "name": "Cuchilla de Buricayupí"
            },
            {
                "name": "Sauce del Queguay"
            },
            {
                "name": "Soto"
            },
            {
                "name": "Tomás Paz"
            },
            {
                "name": "Valdez"
            },
            {
                "name": "Zeballos"
            },
            {
                "name": "Chacras de Paysandú"
            },
            {
                "name": "Rivas"
            },
            {
                "name": "Gallinal"
            },
            {
                "name": "Puntas de Arroyo Negro"
            },
            {
                "name": "Estación Porvenir"
            },
            {
                "name": "Cuchilla de Fuego"
            },
            {
                "name": "Pueblo Alonzo"
            },
            {
                "name": "Queguayar"
            },
            {
                "name": "Termas de Guaviyú"
            },
            {
                "name": "Termas de Almirón"
            }
        ]
    },
    {
        "name": "RIO NEGRO",
        "cities": [
            {
                "name": "Fray Bentos"
            },
            {
                "name": "Young"
            },
            {
                "name": "Nuevo Berlín"
            },
            {
                "name": "San Javier"
            },
            {
                "name": "Barrio Anglo"
            },
            {
                "name": "Grecco"
            },
            {
                "name": "Merinos"
            },
            {
                "name": "Algorta"
            },
            {
                "name": "El Ombú"
            },
            {
                "name": "Los Ranchos"
            },
            {
                "name": "Paso de los Mellizos"
            },
            {
                "name": "Sarandí de Navarro"
            },
            {
                "name": "Sauce"
            },
            {
                "name": "Villa General Borges"
            },
            {
                "name": "Villa María"
            },
            {
                "name": "Las Cañas"
            },
            {
                "name": "Rural"
            },
            {
                "name": "Islas"
            },
            {
                "name": "Abrigo"
            },
            {
                "name": "Bellaco"
            },
            {
                "name": "Islas de Arguello"
            },
            {
                "name": "La Arena"
            },
            {
                "name": "la Florida"
            },
            {
                "name": "La Ilera"
            },
            {
                "name": "La Unión"
            },
            {
                "name": "Liebigs"
            },
            {
                "name": "Los Arrayanes"
            },
            {
                "name": "Mataojo"
            },
            {
                "name": "Menafra"
            },
            {
                "name": "Palmar Grande"
            },
            {
                "name": "Paso Arroyo Don Esteban"
            },
            {
                "name": "Paso de los Cobres"
            },
            {
                "name": "Paso de Soca"
            },
            {
                "name": "Rolón"
            },
            {
                "name": "Sánchez Chico"
            },
            {
                "name": "Sánchez"
            },
            {
                "name": "Santa Elisa"
            },
            {
                "name": "Santa Rosa"
            },
            {
                "name": "Sarandí Chico"
            },
            {
                "name": "Tres Bocas"
            },
            {
                "name": "Uleste"
            },
            {
                "name": "Tres Quintas"
            }
        ]
    },
    {
        "name": "RIVERA",
        "cities": [
            {
                "name": "Rivera"
            },
            {
                "name": "Minas de Corrales"
            },
            {
                "name": "Tranqueras"
            },
            {
                "name": "Vichadero"
            },
            {
                "name": "Santa Teresa"
            },
            {
                "name": "Abrojal"
            },
            {
                "name": "Arroyo Blanco"
            },
            {
                "name": "Paso Ataques"
            },
            {
                "name": "Cerro Pelado"
            },
            {
                "name": "Cerro Caqueiro"
            },
            {
                "name": "Chilca de Caraguatá"
            },
            {
                "name": "Cortume"
            },
            {
                "name": "Curticeiras"
            },
            {
                "name": "Cuñapirú"
            },
            {
                "name": "Paso Hospital"
            },
            {
                "name": "Lapuente"
            },
            {
                "name": "Las Flores"
            },
            {
                "name": "Moirones"
            },
            {
                "name": "Puntas de Corrales"
            },
            {
                "name": "San Gregorio"
            },
            {
                "name": "La Pedrera"
            },
            {
                "name": "Mandubí"
            },
            {
                "name": "Lagunón"
            },
            {
                "name": "Rural"
            },
            {
                "name": "Alborada"
            },
            {
                "name": "Amarillo"
            },
            {
                "name": "Batoví"
            },
            {
                "name": "Berruti"
            },
            {
                "name": "Blanquillos"
            },
            {
                "name": "Capón Alto"
            },
            {
                "name": "Carpintería"
            },
            {
                "name": "Carpintería de Yaguarí"
            },
            {
                "name": "Cerrillada"
            },
            {
                "name": "Cerro Alegre"
            },
            {
                "name": "Cerros de la Calera"
            },
            {
                "name": "Cerros Blancos de Cuñapirú"
            },
            {
                "name": "Coronilla"
            },
            {
                "name": "Coronilla de Corrales"
            },
            {
                "name": "Cruz de San Pedro"
            },
            {
                "name": "Cuchilla de Tres Cerros"
            },
            {
                "name": "Cuchilla Mangueras"
            },
            {
                "name": "Guaviyú"
            },
            {
                "name": "La Chilca"
            },
            {
                "name": "Lagos del Norte"
            },
            {
                "name": "Laureles"
            },
            {
                "name": "Manuel Díaz"
            },
            {
                "name": "Masoller"
            },
            {
                "name": "Minas de Cuñapirú"
            },
            {
                "name": "Minas de Zapucay"
            },
            {
                "name": "Parada Medina"
            },
            {
                "name": "Paso de Amarillo"
            },
            {
                "name": "Paso de los Ataques"
            },
            {
                "name": "Paso de Serpa"
            },
            {
                "name": "Paso de Tapado"
            },
            {
                "name": "Paso del Parque"
            },
            {
                "name": "Piedras Blancas"
            },
            {
                "name": "Platón"
            },
            {
                "name": "Puntas de Abrojal"
            },
            {
                "name": "Rincón de Rodríguez"
            },
            {
                "name": "Rincón de Roland"
            },
            {
                "name": "Rincón los Tres Cerros"
            },
            {
                "name": "Rubio Chico"
            },
            {
                "name": "Sarandí de Río Negro"
            },
            {
                "name": "Sauzal"
            },
            {
                "name": "Villa Indart"
            },
            {
                "name": "Yaguarí"
            },
            {
                "name": "Zanja Honda 01"
            },
            {
                "name": "Zanja Honda 02"
            }
        ]
    },
    {
        "name": "ROCHA",
        "cities": [
            {
                "name": "Rocha"
            },
            {
                "name": "Castillos"
            },
            {
                "name": "Lascano"
            },
            {
                "name": "Chuy"
            },
            {
                "name": "Cebollatí"
            },
            {
                "name": "Velázquez"
            },
            {
                "name": "18 de Julio"
            },
            {
                "name": "La Paloma"
            },
            {
                "name": "San Luis al Medio"
            },
            {
                "name": "La Aguada y Costa Azul"
            },
            {
                "name": "Diecinueve de Abril"
            },
            {
                "name": "La Coronilla"
            },
            {
                "name": "Paso Barrancas"
            },
            {
                "name": "Barrio Pereira"
            },
            {
                "name": "Rural"
            },
            {
                "name": "Isla"
            },
            {
                "name": "Aguas Dulces"
            },
            {
                "name": "Arrozal Victoria"
            },
            {
                "name": "Barra del Chuy"
            },
            {
                "name": "Barrio Torres"
            },
            {
                "name": "Buena Vista"
            },
            {
                "name": "Cabo Polonio"
            },
            {
                "name": "Capacho"
            },
            {
                "name": "Cerro de los Rocha"
            },
            {
                "name": "Costas del Ceibo"
            },
            {
                "name": "Cuchilla de Garzón"
            },
            {
                "name": "Cuchilla de India Muerta"
            },
            {
                "name": "El Canelón"
            },
            {
                "name": "El Caracol"
            },
            {
                "name": "El Ceibo"
            },
            {
                "name": "El Chimango"
            },
            {
                "name": "Estero Pelotas Arrocera"
            },
            {
                "name": "Estiva de Chafalote"
            },
            {
                "name": "Barra de Valizas"
            },
            {
                "name": "La Esmeralda"
            },
            {
                "name": "La Pedrera"
            },
            {
                "name": "Lagunita"
            },
            {
                "name": "La Garzas"
            },
            {
                "name": "Los Tacuruses Arrocera"
            },
            {
                "name": "Mena"
            },
            {
                "name": "Palmar"
            },
            {
                "name": "Parallé"
            },
            {
                "name": "Parque Nac. de Santa Teresa"
            },
            {
                "name": "Paso del Bañado"
            },
            {
                "name": "Picada Techera Arrocera"
            },
            {
                "name": "Poblado Correa"
            },
            {
                "name": "Puerto de los Botes"
            },
            {
                "name": "Quebracho"
            },
            {
                "name": "Rincón de Nieto"
            },
            {
                "name": "Rincón de los Olivera"
            },
            {
                "name": "Puimayen"
            },
            {
                "name": "Tres Islas"
            },
            {
                "name": "Arachania"
            },
            {
                "name": "Pta. Rubia y Sta. Isabel de la\nPedrera"
            },
            {
                "name": "Atlántica"
            },
            {
                "name": "Punta del Diablo"
            },
            {
                "name": "Palmares de la Coronilla"
            },
            {
                "name": "La Ribiera"
            },
            {
                "name": "Puente Valizas"
            },
            {
                "name": "Oceanía del Polonio"
            },
            {
                "name": "Pueblo Nuevo"
            },
            {
                "name": "Tajamares de la Pedrera"
            },
            {
                "name": "San Antonio"
            }
        ]
    },
    {
        "name": "SALTO",
        "cities": [
            {
                "name": "Salto"
            },
            {
                "name": "Belén"
            },
            {
                "name": "Constitución"
            },
            {
                "name": "Fernández"
            },
            {
                "name": "San Antonio"
            },
            {
                "name": "Chacras de Belén"
            },
            {
                "name": "Itapebí"
            },
            {
                "name": "Albisu"
            },
            {
                "name": "Biassini"
            },
            {
                "name": "Campo de Todos"
            },
            {
                "name": "Cayetano"
            },
            {
                "name": "Cuchilla de Guaviyú"
            },
            {
                "name": "Hipódromo"
            },
            {
                "name": "Termas del Daymán"
            },
            {
                "name": "Palomas"
            },
            {
                "name": "Paso del Parque del Daymán"
            },
            {
                "name": "Quintana"
            },
            {
                "name": "Sarandí del Arapey"
            },
            {
                "name": "Saucedo"
            },
            {
                "name": "Rural"
            },
            {
                "name": "Alcain"
            },
            {
                "name": "Alvez"
            },
            {
                "name": "Sopas"
            },
            {
                "name": "Arenitas Blancas"
            },
            {
                "name": "Baltasar Brum"
            },
            {
                "name": "Bordenave"
            },
            {
                "name": "Cancela"
            },
            {
                "name": "Cancela o Varesse"
            },
            {
                "name": "Carumbé"
            },
            {
                "name": "Casco"
            },
            {
                "name": "Celeste"
            },
            {
                "name": "Cerrillada"
            },
            {
                "name": "Cerrillada de Saucedo"
            },
            {
                "name": "Cerro Chato"
            },
            {
                "name": "Cerros de Vera"
            },
            {
                "name": "El Espinillar"
            },
            {
                "name": "Farías"
            },
            {
                "name": "Ferreira"
            },
            {
                "name": "Garibaldi"
            },
            {
                "name": "La Bolsa"
            },
            {
                "name": "La Bolsa 02"
            },
            {
                "name": "La Bolsa 03"
            },
            {
                "name": "Termas del Arapey"
            },
            {
                "name": "Las Flores"
            },
            {
                "name": "Laureles"
            },
            {
                "name": "Lluveras"
            },
            {
                "name": "Mario Rubio"
            },
            {
                "name": "Mataojito"
            },
            {
                "name": "Migliaro"
            },
            {
                "name": "Olivera"
            },
            {
                "name": "Parada Herrería"
            },
            {
                "name": "Paso de las Cañas"
            },
            {
                "name": "Paso del Tropero"
            },
            {
                "name": "Paso del Tapado"
            },
            {
                "name": "Paso Nuevo del Arapey"
            },
            {
                "name": "Pepe Núñez"
            },
            {
                "name": "Paso de las Piedras de Arerunguá"
            },
            {
                "name": "Puntas de Cañas"
            },
            {
                "name": "Puntas de Valentín"
            },
            {
                "name": "Ramos"
            },
            {
                "name": "Sarandí"
            },
            {
                "name": "Sauce Chico"
            },
            {
                "name": "Soto"
            },
            {
                "name": "Toro Negro"
            },
            {
                "name": "Rincón de Valentín"
            },
            {
                "name": "Colonia 18 de Julio"
            },
            {
                "name": "Santa Ana"
            },
            {
                "name": "Arapey"
            },
            {
                "name": "Parque José Luis"
            },
            {
                "name": "Colonia Itapebí"
            },
            {
                "name": "Guaviyú de Arapey"
            },
            {
                "name": "Russo"
            },
            {
                "name": "Paso Cementerio"
            },
            {
                "name": "Osimani y Llerena"
            }
        ]
    },
    {
        "name": "SAN JOSE",
        "cities": [
            {
                "name": "San José de Mayo"
            },
            {
                "name": "Libertad"
            },
            {
                "name": "Delta del Tigre y Villas"
            },
            {
                "name": "Rodríguez"
            },
            {
                "name": "Ituzaingó"
            },
            {
                "name": "Santa Mónica"
            },
            {
                "name": "Ismael Cortinas"
            },
            {
                "name": "Puntas de Valdez"
            },
            {
                "name": "González"
            },
            {
                "name": "Mal Abrigo"
            },
            {
                "name": "Playa Pascual"
            },
            {
                "name": "18 de Julio (Pueblo Nuevo)"
            },
            {
                "name": "Rafael Peraza"
            },
            {
                "name": "Raigón"
            },
            {
                "name": "Tala de Pereira"
            },
            {
                "name": "Safici (Parque Postel)"
            },
            {
                "name": "Rural"
            },
            {
                "name": "Arroyo Llano"
            },
            {
                "name": "Bella Vista"
            },
            {
                "name": "Juan Soler"
            },
            {
                "name": "Bocas del Cufré"
            },
            {
                "name": "Capurro"
            },
            {
                "name": "Villa María"
            },
            {
                "name": "Colonia América"
            },
            {
                "name": "Cuchilla del Vichadero"
            },
            {
                "name": "Ecilda Paullier"
            },
            {
                "name": "Escudero"
            },
            {
                "name": "Fajina"
            },
            {
                "name": "Kiyú - Ordeig"
            },
            {
                "name": "La Boyada"
            },
            {
                "name": "La Boyada Ruta1 Km 91,2"
            },
            {
                "name": "La Candelaria"
            },
            {
                "name": "La Cuchilla"
            },
            {
                "name": "Ordeig"
            },
            {
                "name": "Pavón"
            },
            {
                "name": "Cañada Grande"
            },
            {
                "name": "Puntas de Gregorio"
            },
            {
                "name": "Puntas de Laurel"
            },
            {
                "name": "Rapetti"
            },
            {
                "name": "Rincón de Nazaret"
            },
            {
                "name": "Rincón de Buschental"
            },
            {
                "name": "Rincón del Pino"
            },
            {
                "name": "San Gregorio"
            },
            {
                "name": "Scavino"
            },
            {
                "name": "Tropas Viejas"
            },
            {
                "name": "Valdez Chico"
            },
            {
                "name": "Monte Grande"
            },
            {
                "name": "Aguas Corrientes"
            },
            {
                "name": "Cerámicas del Sur"
            },
            {
                "name": "Radial"
            },
            {
                "name": "Cololó - Tinosa"
            },
            {
                "name": "Mangrullo"
            },
            {
                "name": "Carreta Quemada"
            },
            {
                "name": "Costas de Pereira"
            },
            {
                "name": "Colonia Delta"
            }
        ]
    },
    {
        "name": "SORIANO",
        "cities": [
            {
                "name": "Mercedes"
            },
            {
                "name": "Dolores"
            },
            {
                "name": "Cardona"
            },
            {
                "name": "José Enrique Rodó"
            },
            {
                "name": "Palmitas"
            },
            {
                "name": "Villa Soriano"
            },
            {
                "name": "Palmar"
            },
            {
                "name": "Egaña"
            },
            {
                "name": "Santa Catalina"
            },
            {
                "name": "Ismael Cortinas"
            },
            {
                "name": "Agraciada"
            },
            {
                "name": "Cañada Paraguaya"
            },
            {
                "name": "Castillos"
            },
            {
                "name": "Risso"
            },
            {
                "name": "Sacachispas"
            },
            {
                "name": "Cañada Nieto"
            },
            {
                "name": "Rural"
            },
            {
                "name": "Islas"
            },
            {
                "name": "Arroyo Grande"
            },
            {
                "name": "Bequeló Ruta 14 Km 4"
            },
            {
                "name": "Bequeló Ruta 14 Km 7"
            },
            {
                "name": "Bizcocho"
            },
            {
                "name": "Calvo"
            },
            {
                "name": "Colonia Díaz"
            },
            {
                "name": "Cuchilla del Perdido"
            },
            {
                "name": "El Tala"
            },
            {
                "name": "Jackson"
            },
            {
                "name": "La Concordia"
            },
            {
                "name": "La Loma"
            },
            {
                "name": "Olivera"
            },
            {
                "name": "Pamer"
            },
            {
                "name": "Rincón de Cololó"
            },
            {
                "name": "San Dios"
            },
            {
                "name": "San Martín"
            },
            {
                "name": "Sarandí Chico"
            },
            {
                "name": "Zanja Honda"
            },
            {
                "name": "Palo Solo"
            },
            {
                "name": "Chacras de Dolores"
            },
            {
                "name": "Colonia Concordia"
            },
            {
                "name": "Perseverano"
            },
            {
                "name": "Lares"
            }
        ]
    },
    {
        "name": "TACUAREMBO",
        "cities": [
            {
                "name": "Tacuarembó"
            },
            {
                "name": "Paso de los Toros"
            },
            {
                "name": "San Gregorio de Polanco"
            },
            {
                "name": "Tambores"
            },
            {
                "name": "Achar"
            },
            {
                "name": "Ansina"
            },
            {
                "name": "Curtina"
            },
            {
                "name": "Paso del Cerro"
            },
            {
                "name": "Rincón de Martinote"
            },
            {
                "name": "Clara"
            },
            {
                "name": "Clavijo"
            },
            {
                "name": "Cuchilla de Caraguatá"
            },
            {
                "name": "Cuchilla del Ombú"
            },
            {
                "name": "La Hilera"
            },
            {
                "name": "Las Toscas"
            },
            {
                "name": "Paso Bonilla"
            },
            {
                "name": "Pueblo de Arriba"
            },
            {
                "name": "Pueblo del Barro"
            },
            {
                "name": "Rincón de la Aldea"
            },
            {
                "name": "Rincón del Bonete"
            },
            {
                "name": "Balneario Iporá"
            },
            {
                "name": "Zapará"
            },
            {
                "name": "Los Rodríguez"
            },
            {
                "name": "Piedra Sola"
            },
            {
                "name": "Rural"
            },
            {
                "name": "Aldea San Joaquín"
            },
            {
                "name": "Ataques"
            },
            {
                "name": "Bañado de Rocha"
            },
            {
                "name": "Cardozo"
            },
            {
                "name": "Cardozo Chico"
            },
            {
                "name": "Cerro de la Ventana"
            },
            {
                "name": "Chamberlain"
            },
            {
                "name": "Colman"
            },
            {
                "name": "Cuchilla de la Palma"
            },
            {
                "name": "Cuchilla de Peralta"
            },
            {
                "name": "Heriberto"
            },
            {
                "name": "La Aldea"
            },
            {
                "name": "La Bolsa 01"
            },
            {
                "name": "La Bolsa 02"
            },
            {
                "name": "La Humedad"
            },
            {
                "name": "La Pedrera"
            },
            {
                "name": "La Rosada"
            },
            {
                "name": "Lambaré"
            },
            {
                "name": "Larrayos"
            },
            {
                "name": "Las Arenas"
            },
            {
                "name": "La Chircas"
            },
            {
                "name": "Los Feos"
            },
            {
                "name": "Los Ferreira"
            },
            {
                "name": "Los García"
            },
            {
                "name": "Los Gómez"
            },
            {
                "name": "Los Magariños"
            },
            {
                "name": "Los Novillos"
            },
            {
                "name": "Laureles"
            },
            {
                "name": "Los Ortiz"
            },
            {
                "name": "Los Rosanos"
            },
            {
                "name": "Los Rosas"
            },
            {
                "name": "Los Semper"
            },
            {
                "name": "Los Vázquez"
            },
            {
                "name": "Laura"
            },
            {
                "name": "Matutina"
            },
            {
                "name": "Minuano"
            },
            {
                "name": "Montevideo Chico"
            },
            {
                "name": "Paso de Ceferino"
            },
            {
                "name": "Paso de las Carretas"
            },
            {
                "name": "Paso del Medio"
            },
            {
                "name": "Picada de Cuello"
            },
            {
                "name": "Quiebra Yugos"
            },
            {
                "name": "Cerro de Pastoreo"
            },
            {
                "name": "Rincón de la Laguna"
            },
            {
                "name": "Rincón de Giloca"
            },
            {
                "name": "Rincón de Freitas"
            },
            {
                "name": "Rivera Chico"
            },
            {
                "name": "Santa Rita"
            },
            {
                "name": "Santander"
            },
            {
                "name": "Sauce de Batoví"
            },
            {
                "name": "Sauce de Tranqueras"
            },
            {
                "name": "Sauce Solo 02"
            },
            {
                "name": "Treinta y Tres ó Cañas"
            },
            {
                "name": "Tres Guitarras"
            },
            {
                "name": "Turupí"
            },
            {
                "name": "Valle Edén"
            },
            {
                "name": "Zapucay"
            },
            {
                "name": "Capón de la Yerba"
            },
            {
                "name": "Puntas de Cinco Sauces"
            },
            {
                "name": "Rincón de Pereira"
            },
            {
                "name": "Punta de Carretera"
            },
            {
                "name": "Cruz de los Caminos"
            }
        ]
    },
    {
        "name": "TREINTA Y TRES",
        "cities": [
            {
                "name": "Treinta y Tres"
            },
            {
                "name": "Santa Clara de Olimar"
            },
            {
                "name": "Vergara"
            },
            {
                "name": "Arrozal Treinta y Tres"
            },
            {
                "name": "Gral. Enrique Martínez"
            },
            {
                "name": "Villa Sara"
            },
            {
                "name": "Cerro Chato"
            },
            {
                "name": "Estación Rincón"
            },
            {
                "name": "Isla Patrulla (María Isabel)"
            },
            {
                "name": "Picada Techera"
            },
            {
                "name": "Valentines"
            },
            {
                "name": "Rural"
            },
            {
                "name": "Acosta"
            },
            {
                "name": "Poblado Alonzo"
            },
            {
                "name": "Arrozal Florencio Barreto"
            },
            {
                "name": "Arrocera Rincón"
            },
            {
                "name": "Arrozal Santa María"
            },
            {
                "name": "Bañado de los Olivera"
            },
            {
                "name": "Cañada Chica"
            },
            {
                "name": "Cañada de los Cuervos"
            },
            {
                "name": "Cerros de Amaro"
            },
            {
                "name": "Cipa Olimar"
            },
            {
                "name": "Cipa Secador"
            },
            {
                "name": "Costa del Arroyo Malo"
            },
            {
                "name": "Cuchilla de Dionisio"
            },
            {
                "name": "Embarque Arrozal Treinta y Tres"
            },
            {
                "name": "Julio María Sanz"
            },
            {
                "name": "La Calavera"
            },
            {
                "name": "La Lata"
            },
            {
                "name": "Lechiguana de Corrales"
            },
            {
                "name": "Arrocera Los Ceibos"
            },
            {
                "name": "María Albina"
            },
            {
                "name": "Mendizábal (El Oro)"
            },
            {
                "name": "Paso de Píriz"
            },
            {
                "name": "Pastor"
            },
            {
                "name": "Poblado Medina"
            },
            {
                "name": "Puntas del Parao"
            },
            {
                "name": "Rincón de Gadea"
            },
            {
                "name": "Rincón de los Francos"
            },
            {
                "name": "San Juan"
            },
            {
                "name": "Sierra del Yerbal"
            },
            {
                "name": "Siete Casas"
            },
            {
                "name": "Tres Bocas"
            },
            {
                "name": "Verde Alto"
            },
            {
                "name": "Villa Passano"
            },
            {
                "name": "Ejido de Treinta y Tres"
            },
            {
                "name": "El Bellaco"
            },
            {
                "name": "Arrocera Los Teros"
            },
            {
                "name": "Arrocera Bonomo"
            },
            {
                "name": "Arrocera El Tigre"
            },
            {
                "name": "Arrocera La Catumbera"
            },
            {
                "name": "Arrocera La Querencia"
            },
            {
                "name": "Arrocera Las Palmas"
            },
            {
                "name": "Arrocera Mini"
            },
            {
                "name": "Arrocera Procipa"
            },
            {
                "name": "Arrocera San Fernando"
            },
            {
                "name": "Arrocera Santa Fe"
            },
            {
                "name": "Arrocera Zapata"
            }
        ]
    }
];

async function seedDepartments() {
    const MONGODB_CONNECTION_STRING = process.env.MONGODB_CONNECTION_STRING;
    const MONGODB_DATABASE_NAME = process.env.MONGODB_DATABASE_NAME;
    try {
        await mongoose.connect(
            `${MONGODB_CONNECTION_STRING}/${MONGODB_DATABASE_NAME}`,
            {
                serverSelectionTimeoutMS: 5000,
            }
        );
        console

        console.log('Conectado a la base de datos.');

        for (const department of departments) {
            await Department.findOneAndUpdate(
                { name: department.name },
                { name: department.name, cities: department.cities },
                { upsert: true, new: true }
            );
        }

        console.log('Departamentos y ciudades insertados correctamente.');
        mongoose.disconnect();
    } catch (error) {
        console.error('Error al insertar departamentos y ciudades:', error);
        mongoose.disconnect();
    }
}

seedDepartments();