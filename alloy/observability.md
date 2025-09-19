# Observatility

***Este documento va a ser pasado a ingles pero por ahora es un boceto***

**Summary:**  
- Explicar la importancia de un buen esquena de observabilidad. 
-  Definir una hoja de ruta sobre puntos a tener 
en cuenta en el momento de diseñar una aplicacion desde el punto de vista de la  observabilidad.
- Enumerar conceptos, roles, componentes que deben contemplarse.
- Evaluar alternativas a la hora de definir la suite que mejor se ajusta al projecto


### Por que es importante tener un esquema de observabilidad en todo proyecto? 

El equipo responsable del projecto debe ser el primero en identificar cualquier funcionamiento anormal por parte del sistema 
en su entorno de produccion. Cualquier demora en disponer de esta informacion se traducira en una reduccion de la calidad percivida por parte los usuarios. 
Disponer de metricas precisas y bien definidas permitiran identificar problemas antes que sucedan y poder tomar medidas 
que anticipen cualquier mal funcionamiento. 


### Diferencia entre **Log/evento**  y **Metrica**  
Dentro del contexto de lo que definimos como observabilidad es importante entender la diferencia entre estos 2 conceptos.<br>
Por un lado, **log/evento** es algo que sucede en el sistema, ya sea en la propia aplicacion o en alguno de los servicios que la soportan, o ya mas a bajo nivel en el entorno en el que se ejecuta. Estos eventos no tienen una recurrencia fija y dependen pura y exclusivamente de que determinada situacion ocurra. Ya sea anomala o no. <br>
En el caso de una **metrica** es algo que tiene una recurrencia y esta dada por la frecuencia de muestreo de esa metrica. Generalmente las metricas tienen como resultado valores numericos que permiten evaluar cambios en funcion del tiempo. 

### Roles y componentes  

Dentro de cualquier esquema que se plantee es importante tener en cuenta que va a haber distintos roles que se implementaran y que ya sean instrumentados por uno mismo(*servicios instalados on-prem, o integrados dentro de la misma aplicacion*) o delegados en un tercero(*proveedor de servicios cloud, por ej*), esos roles se acturan de alguna u otra manera. 

<style>
th, td{
    border:solid 1px black;
    text-align:center;
}
</style>
<table>
    <tr>
        <th colspan="8" aling="center"> Logging</th>
    </tr>
    <tr>
        <th>Generacion</th>
        <th>Recoleccion</th>
        <th>Parceo</th>
        <th>Transporte</th>
        <th>Aggregacion</th>
        <th>Almacenamiento</th>
        <th>Visualizacion</th>
        <th>Monitoreo/Alertas</th>
    </tr>
    <tr>
        <td>Applicacion</td>
        <td colspan="3">Promtail(deprecated by  Alloy)</td>
        <td colspan="2">Loki</td>
        <td>Grafana</td>
        <td>Grafana AlertManager</td>
    </tr>
    <tr><td>Database</td>
    <td colspan="3" >Fluentbit</td>
    <td colspan="2"> InfluxDb</td>
    <td colspan="2"></td>
    </tr>
    <tr><td>Queue System</td>
      <td colspan="3">Fluentd</td>
      <td colspan="2"> Elasticsearch</td>
      <td colspan="2"></td>
      </tr>
    <tr><td>Container</td><td colspan="7"></td></tr>
    <tr><td>Docker</td><td colspan="7"></td></tr>
    <tr><td>K8s</td><td colspan="7"></td></tr>
    </tr>
</table>

